/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import Runes from "./runes.jsx";

function genRatingConv(base, softcap, coeff, drsev) {
	const baseRating = base / coeff;
	const softcapRating = softcap / coeff;

	return function (rating) {
		if (baseRating + rating > softcapRating) {
			const diff = (baseRating + rating) - softcapRating;
			return softcap + (diff * coeff * Math.cos((Math.PI / 2) * (diff / (diff + drsev))));
		} else {
			return (baseRating + rating) * coeff;
		}
	};
}

function genCappedRatingConv(base, softcap, coeff) {
	return function (rating) {
		return Math.min(base + rating * coeff, softcap);
	};
}

const convertibleRatings = {
	"Armor":                 genRatingConv(0,   0,   8    / 1000, 7250),
	"Critical Hit Chance":   genRatingConv(5,   30,  2.5  / 1000, 7000),
	"Critical Hit Severity": genRatingConv(150, 300, 10   / 1000, 5500),
	"Critical Mitigation":   genRatingConv(0,   150, 15   / 1000, 2750),
	"Deflect Chance":        genRatingConv(5,   30,  1.5  / 1000, 7000),
	"Focus Recovery Rate":   genRatingConv(0.5, 1.5, 0.2  / 1000, 2000),
	"Glance Chance":         genRatingConv(0,   60,  2.75 / 1000, 4000), // TODO: Is Glance Chance Rating correct?
	"Intensity":             genRatingConv(0,   30,  2.8  / 1000, 5000),
	"Life Steal":            genRatingConv(0,   10,  2.1  / 1000, 6200),
	"Multi-Hit Chance":      genRatingConv(5,   60,  6    / 1000, 5000),
	"Strikethrough":         genRatingConv(0,   30,  3    / 1000, 5000),
	"Vigor":                 genRatingConv(0,   30,  2.8  / 1000, 5000),
	"Armor Pierce":          genCappedRatingConv(0,  100, 3.25 / 1000),
	"CC Resilience":         genCappedRatingConv(0,  25,  4    / 1000),
	"Glance Mitigation":     genCappedRatingConv(30, 75,  5.5  / 1000),
	"Multi-Hit Severity":    genCappedRatingConv(30, 100, 4    / 1000),
	"Reflect Chance":        genCappedRatingConv(0,  100, 5    / 1000),
	"Focus Pool":            pool => pool + 1000,
	"Health":                health => health + 10000,
	"Assault Rating":        ap => (ap + 900) / 4,
	"Support Rating":        sp => (sp + 900) / 4
};

function processRating(name, rating, bonuses) {
	let value;

	switch (name) {
		case "Armor":
			bonuses.forEach(multiplier => rating *= 1 + (multiplier / 100));
			return convertibleRatings["Armor"](rating);

		case "Focus Pool":
		case "Health":
		case "Support Rating":
		case "Assault Rating":
			value = convertibleRatings[name](rating);
			bonuses.forEach(multiplier => value *= 1 + (multiplier / 100));

			return value;

		default:
			value = convertibleRatings[name](rating);
			bonuses.forEach(addition => value += addition);

			return value;
	}
}

function processRatings(ratings, bonuses) {
	const stats = {};

	for (let name in convertibleRatings)
		stats[name] = processRating(
			name,
			name in ratings ? ratings[name] : 0,
			bonuses[name] || []
		);

	return stats;
}

function fillDefaultRatings(ratings) {
	for (let name in convertibleRatings)
		if (!(name in ratings))
			ratings[name] = 0;
}

function insertIntoSection(obj, section, value) {
	if (section in obj)
		obj[section].push(value);
	else
		obj[section] = [value];

}

function insertOrAdd(obj, key, value) {
	if (key in obj)
		obj[key] += value;
	else
		obj[key] = value;
}

function gatherRuneDetails(runes, ratings, bonuses) {
	const setPowers = {};

	runes.forEach(runeID => {
		if (runeID in Runes) {
			const rune = Runes[runeID];

			insertOrAdd(setPowers, rune.setName, rune.power || 0);
			insertOrAdd(ratings, rune.statName, rune.statValue);
		}
	});

	for (let setName in setPowers) {
		if (!(setName in Runes.sets))
			continue;

		let powers = Runes.sets[setName].powers.filter((power, idx) => power != null && idx < setPowers[setName]);
		powers.forEach(power => insertIntoSection(bonuses, power.name, power.value));
	}
}

function translateRatingsToStats(ratings) {
	const ratingsCopy = {};

	for (let name in ratings)
		if (name in convertibleRatings)
			ratingsCopy[name] = convertibleRatings[name](ratings[name]);
		else
			ratingsCopy[name] = ratings[name];

	return ratingsCopy;
}

function roundTwoDigits(value) {
	if (typeof(value) == "number")
		return Math.round(value * 100) / 100;
	else
		return value;
}

function mergeRatings(target, source) {
	for (let key in source)
		insertOrAdd(target, key, source[key]);
}

function mergeBonuses(target, source) {
	for (let key in source)
		insertIntoSection(target, key, source[key]);
}

function formatStat(name, value) {
	value = roundTwoDigits(value);

	switch (name) {
		case "Focus Pool":
		case "Health":
		case "Suit Power":
		case "Support Rating":
		case "Assault Rating":
			return value;

		default:
			if (value !== "")
				return value + "%";
			else
				return value;
	}
}

export default {
	gatherRuneDetails,
	processRatings,
	fillDefaultRatings,

	mergeRatings,
	mergeBonuses,

	formatStat
};
