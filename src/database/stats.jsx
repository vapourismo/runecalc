/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import Runes from "./runes.jsx";

const focusRecFactor      = 0.2  / 1000;
const multiHitFactor      = 6    / 1000;
const multiHitSevFactor   = 4    / 1000;
const critHitFactor       = 2.5  / 1000;
const critHitSevFactor    = 10   / 1000;
const intensityFactor     = 2.8  / 1000;
const critMitFactor       = 15   / 1000;
const strikethroughFactor = 3    / 1000;
const lifestealFactor     = 2.1  / 1000;
const vigorFactor         = 2.8  / 1000;
const glanceFactor        = 2.75 / 1000;
const deflectFactor       = 1.5  / 1000;

function transformStat(name, value) {
	switch (name) {
		case "Glance Rating":
			return {
				name: "Glance Chance",
				value: value * glanceFactor
			};

		case "Crit-Mitigation Rating":
			return {
				name: "Crit-Mitigation",
				value: value * critMitFactor
			};

		case "Deflect Rating":
			return {
				name: "Deflect Chance",
				value: value * deflectFactor
			};

		case "Strikethrough Rating":
			return {
				name: "Strikethrough",
				value: value * strikethroughFactor
			};

		case "Lifesteal Rating":
			return {
				name: "Lifesteal",
				value: value * lifestealFactor
			};

		case "Vigor Rating":
			return {
				name: "Vigor",
				value: value * vigorFactor
			};

		case "Focus Recovery Rating":
			return {
				name: "Focus Recovery Rate",
				value: value * focusRecFactor
			};

		case "Multi-Hit Rating":
			return {
				name: "Multi-Hit Chance",
				value: value * multiHitFactor
			};

		case "Multi-Hit Severity Rating":
			return {
				name: "Multi-Hit Severity",
				value: value * multiHitSevFactor
			};

		case "Crit-Hit Rating":
			return {
				name: "Crit-Hit Chance",
				value: value * critHitFactor
			};

		case "Crit-Hit Severity Rating":
			return {
				name: "Crit-Hit Severity",
				value: value * critHitSevFactor
			};

		case "Intensity Rating":
			return {
				name: "Intensity",
				value: value * intensityFactor
			};

		default:
			return {name, value};
	}
}

function transformStats(stats) {
	const newStats = {};

	for (let name in stats) {
		let result = transformStat(name, stats[name]);
		insertOrAdd(newStats, result.name, result.value);
	}

	return newStats;
}

function insertOrAdd(obj, key, value) {
	if (key in obj)
		obj[key] += value;
	else
		obj[key] = value;
}

function gatherStats(runes) {
	const powers = {};
	const stats = {};

	runes.forEach(runeID => {
		if (runeID == null || !(runeID in Runes))
			return;

		const rune = Runes[runeID];

		if (rune.setName && rune.power && rune.setName in Runes.sets)
			insertOrAdd(powers, rune.setName, rune.power);

		insertOrAdd(stats, rune.statName, rune.statValue);
	});

	for (let setName in powers) {
		if (!(setName in Runes.sets))
			continue;

		let setPowers = Runes.sets[setName].powers;

		for (let i = 0; i < powers[setName] && i < setPowers.length; i++)
			if (setPowers[i])
				insertOrAdd(stats, setPowers[i].name, setPowers[i].value);
	}

	return stats;
}

function mergeStats(arrStats) {
	const allStats = {};

	arrStats.forEach(stats => {
		for (let key in stats)
			insertOrAdd(allStats, key, stats[key]);
	});

	return allStats;
}

function roundTwoDigits(value) {
	if (typeof(value) == "number")
		return Math.round(value * 100) / 100;
	else
		return value;
}

function formatStat(name, value) {
	switch (name) {
		case "Focus Recovery Rate":
		case "Focus Pool Multiplier":
		case "Multi-Hit Chance":
		case "Multi-Hit Severity":
		case "Crit-Hit Chance":
		case "Crit-Hit Severity":
		case "Intensity":
		case "Strikethrough":
		case "Vigor":
		case "Lifesteal":
		case "Glance Chance":
		case "Deflect Chance":
		case "Crit-Mitigation":
		case "Health Multiplier":
			return roundTwoDigits(value) + "%";

		default:
			return roundTwoDigits(value);
	}
}

export default {transformStat, transformStats, gatherStats, mergeStats, formatStat, insertOrAdd};
