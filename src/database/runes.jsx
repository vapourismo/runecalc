/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

const runes = [
	{
		type: "earth",
		setName: "Voice From Beyond",
		statName: "Multi-Hit Severity Rating",
		statValue: 501,
		power: 2,
		unique: true
	},
	{
		type: "life",
		setName: "Voice From Beyond",
		statName: "Focus Pool",
		statValue: 75,
		power: 1
	},
	{
		type: "air",
		setName: "Voice From Beyond",
		statName: "Focus Recovery Rating",
		statValue: 501,
		power: 1
	},
	{
		type: "logic",
		setName: "Voice From Beyond",
		statName: "Intensity Rating",
		statValue: 501,
		power: 1
	},
	{
		type: "life",
		setName: "Vim",
		power: 2,
		statName: "Focus Pool",
		statValue: 75,
		unique: true
	},
	{
		type: "fire",
		setName: "Vim",
		power: 1,
		statName: "Crit-Hit Rating",
		statValue: 501
	},
	{
		type: "earth",
		setName: "Vim",
		power: 1,
		statName: "Crit-Hit Severity Rating",
		statValue: 501
	},
	{
		type: "life",
		setName: "Vim",
		power: 1,
		statName: "Focus Pool",
		statValue: 75
	},
	{
		type: "earth",
		setName: "Ruination",
		power: 2,
		statName: "Crit-Hit Severity Rating",
		statValue: 501,
		unique: true
	},
	{
		type: "fire",
		setName: "Ruination",
		power: 1,
		statName: "Crit-Hit Rating",
		statValue: 501
	},
	{
		type: "earth",
		setName: "Ruination",
		power: 1,
		statName: "Crit-Hit Severity Rating",
		statValue: 501
	},
	{
		type: "fire",
		setName: "Rejuvenation",
		power: 2,
		statName: "Crit-Hit Rating",
		statValue: 501,
		unique: true
	},
	{
		type: "fire",
		setName: "Rejuvenation",
		power: 1,
		statName: "Crit-Hit Rating",
		statValue: 501
	},
	{
		type: "water",
		setName: "Rejuvenation",
		power: 1,
		statName: "Multi-Hit Rating",
		statValue: 501
	},
	{
		type: "logic",
		setName: "Rejuvenation",
		power: 1,
		statName: "Intensity Rating",
		statValue: 501
	},
	{
		type: "logic",
		setName: "Intensification",
		power: 2,
		statName: "Intensity Rating",
		statValue: 501,
		unique: true
	},
	{
		type: "life",
		setName: "Intensification",
		power: 1,
		statName: "Focus Pool",
		statValue: 75
	},
	{
		type: "air",
		setName: "Intensification",
		power: 1,
		statName: "Focus Recovery Rating",
		statValue: 501
	},
	{
		type: "logic",
		setName: "Intensification",
		power: 1,
		statName: "Intensity Rating",
		statValue: 501
	},
	{
		type: "earth",
		setName: "Basher",
		power: 2,
		statName: "Multi-Hit Severity Rating",
		statValue: 501,
		unique: true
	},
	{
		type: "water",
		setName: "Basher",
		power: 1,
		statName: "Multi-Hit Rating",
		statValue: 501
	},
	{
		type: "air",
		setName: "Prevention",
		power: 3,
		statName: "Focus Recovery Rating",
		statValue: 501,
		unique: true
	},
	{
		type: "life",
		setName: "Prevention",
		power: 3,
		statName: "Focus Pool",
		statValue: 75,
		unique: true
	},
	{
		type: "logic",
		setName: "Prevention",
		power: 3,
		statName: "Intensity Rating",
		statValue: 501,
		unique: true
	},
	{
		type: "air",
		setName: "Prevention",
		power: 2,
		statName: "Focus Recovery Rating",
		statValue: 402,
		uniquePerItem: true
	},
	{
		type: "life",
		setName: "Prevention",
		power: 2,
		statName: "Focus Pool",
		statValue: 60,
		uniquePerItem: true
	},
	{
		type: "logic",
		setName: "Prevention",
		power: 2,
		statName: "Intensity Rating",
		statValue: 402,
		uniquePerItem: true
	},
	{
		type: "air",
		setName: "Prevention",
		power: 1,
		statName: "Focus Recovery Rating",
		statValue: 402
	},
	{
		type: "life",
		setName: "Prevention",
		power: 1,
		statName: "Focus Pool",
		statValue: 60
	},
	{
		type: "logic",
		setName: "Prevention",
		power: 1,
		statName: "Intensity Rating",
		statValue: 402
	}
];

runes.fromSet = function fromSet(name) {
	const result = [];

	runes.forEach(function (rune, runeID) {
		if (rune.setName == name)
			result.push(runeID);
	});

	return result;
};

runes.sets = {
	"Voice From Beyond": {
		runes: runes.fromSet("Voice From Beyond"),
		powers: [
			{name: "Focus Recovery Rate",      value: 0.1},
			{name: "Voice From Beyond Tier 1", value: ""},
			{name: "Voice From Beyond Tier 2", value: ""}
		]
	},
	"Vim": {
		runes: runes.fromSet("Vim"),
		powers: [
			{name: "Health Multiplier",     value: 1},
			{name: "Crit-Hit Chance",       value: 0.31},
			{name: "Focus Pool Multiplier", value: 4.80}
		]
	},
	"Ruination": {
		runes: runes.fromSet("Ruination"),
		powers: [
			{name: "Health Multiplier",        value: 1},
			{name: "Crit-Hit Chance",          value: 0.31},
			{name: "Crit-Hit Chance Severity", value: 3}
		]
	},
	"Rejuvenation": {
		runes: runes.fromSet("Rejuvenation"),
		powers: [
			{name: "Health Multiplier", value: 1},
			{name: "Multi-Hit Chance",  value: 0.75},
			{name: "Crit-Hit Chance",   value: 0.75}
		]
	},
	"Intensification": {
		runes: runes.fromSet("Intensification"),
		powers: [
			{name: "Health Multiplier",     value: 1},
			{name: "Focus Pool Multiplier", value: 2},
			{name: "Intensity",             value: 0.84}
		]
	},
	"Basher": {
		runes: runes.fromSet("Basher"),
		powers: [
			{name: "Health Multiplier",  value: 1},
			{name: "Multi-Hit Severity", value: 1.20},
			{name: "Multi-Hit Chance",   value: 1.80}
		]
	},
	"Resumption": {
		runes: runes.fromSet("Resumption"),
		powers: [
			{name: "Health Multiplier",   value: 1},
			{name: "Multi-Hit Chance",    value: 0.75},
			{name: "Focus Recovery Rate", value: 0.15}
		]
	},
	"Prevention": {
		runes: runes.fromSet("Prevention"),
		powers: [
			null,
			{name: "Intensity", value: 0.21},
			{name: "Focus Pool Multiplier", value: 1.2},
			{name: "Prevention Tier 1", value: ""},
			{name: "Focus Recovery Rate", value: 0.02},
			{name: "Focus Pool Multiplier", value: 1.65},
			{name: "Intensity", value: 0.36},
			{name: "Prevention Tier 2", value: ""}
		]
	}
};

export default runes;
