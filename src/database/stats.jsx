/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import Runes from "./runes.jsx";

const focusRecFactor    = 0.2 / 1000;
const multiHitFactor    = 6   / 1000;
const multiHitSevFactor = 4   / 1000;
const critHitFactor     = 2.5 / 1000;
const critHitSevFactor  = 10  / 1000;
const intensityFactor   = 2.8 / 1000;

function transformStat(name, value) {
	switch (name) {
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
		const stat = transformStat(rune.statName, rune.statValue);

		if (rune.setName && rune.power && rune.setName in Runes.sets)
			insertOrAdd(powers, rune.setName, rune.power);

		insertOrAdd(stats, stat.name, stat.value);
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
		case "Health Multiplier":
			return roundTwoDigits(value) + "%";

		default:
			return roundTwoDigits(value);
	}
}

export default {transformStat, gatherStats, mergeStats, formatStat};
