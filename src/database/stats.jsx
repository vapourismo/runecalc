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

function insertOrAdd(obj, key, value) {
	if (key in obj)
		obj[key] += value;
	else
		obj[key] = value;
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

function fillDefaultStats(stats) {
	for (let name in convertibleRatings)
		if (!(name in stats))
			stats[name] = convertibleRatings[name](0)
}

function applyStatBonuses(stats, bonuses) {
	for (let name in bonuses) {
		if (name in stats)
			stats[name] += bonuses[name];
		else if (name in convertibleRatings)
			stats[name] = convertibleRatings[name](0) + bonuses[name];
		else
			stats[name] = bonuses[name];
	}
}

function applyStatMultipliers(stats, multipliers) {
	for (let name in multipliers)
		if (name in stats)
			stats[name] *= multipliers[name];
		else if (name in convertibleRatings)
			stats[name] = convertibleRatings[name](0) * multipliers[name];
}

function merge(target, source) {
	for (let key in source)
		insertOrAdd(target, key, source[key]);
}

function insertOrMultiply(target, name, value) {
	if (name in target)
		target[name] *= 1 + (value / 100);
	else
		target[name] = 1 + (value / 100);
}

function mergeMultipliers(target, source) {
	for (let key in source)
		insertOrMultiply(target, key, source[key]);
}

function analyzeItem(runes) {
	const setPowers = {};
	const ratings = {};

	runes.forEach(runeID => {
		if (runeID in Runes) {
			const rune = Runes[runeID];

			insertOrAdd(setPowers, rune.setName, rune.power || 0);
			insertOrAdd(ratings, rune.statName, rune.statValue);
		}
	});

	const bonuses = {};
	const multipliers = {};

	for (let setName in setPowers) {
		if (!(setName in Runes.sets))
			continue;

		let powers = Runes.sets[setName].powers.filter((power, idx) => power != null && idx < setPowers[setName]);

		powers.forEach(power => {
			if (power.type === "bonus")
				insertOrAdd(bonuses, power.name, power.value);
			else if (power.type === "multiplier")
				insertOrMultiply(multipliers, power.name, power.value);
		});
	}

	return {ratings, bonuses, multipliers};
}

function roundTwoDigits(value) {
	if (typeof(value) == "number")
		return Math.round(value * 100) / 100;
	else
		return value;
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
	translateRatingsToStats,
	fillDefaultStats,

	applyStatBonuses,
	applyStatMultipliers,

	merge,
	mergeMultipliers,

	analyzeItem,

	formatStat
};
