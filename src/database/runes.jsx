/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

const statColors = {
	"Armor":                 "earth",
	"Armor Pierce":          "air",
	"Critical Hit Chance":   "fire",
	"Critical Hit Severity": "earth",
	"Critical Mitigation":   "logic",
	"Deflect Chance":        "air",
	"Focus Pool":            "life",
	"Focus Recovery Rate":   "air",
	"Glance Mitigation":     "fire",
	"Glance Chance":         "water",
	"Health":                "life",
	"Intensity":             "logic",
	"Life Steal":            "life",
	"Multi-Hit Chance":      "water",
	"Multi-Hit Severity":    "earth",
	"Strikethrough":         "air",
	"Suit Power":            "logic",
	"Vigor":                 "logic"
};

const statValues = {
	80: {
		"Armor": 134,
		"Health": 485,
		"Focus Pool": 40,
		[null]: 269
	},
	100: {
		"Armor": 164,
		"Health": 593,
		"Focus Pool": 49,
		[null]: 329
	},
	110: {
		"Health": 655,
		"Focus Pool": 54,
		[null]: 364
	},
	120: {
		"Armor": 201,
		"Health": 724,
		"Focus Pool": 60,
		[null]: 402
	},
	140: {
		"Armor": 250,
		"Health": 902,
		"Focus Pool": 75,
		"Suit Power": 10,
		[null]: 501
	},
};

const runes = [];
runes.sets = {};

function makeNonRMTClassSet(lvl, name, stats, powers) {
	if (!(lvl in statValues)) {
		console.error("Invalid class set", name, "with item level", lvl);
		return;
	}

	const valueTable = statValues[lvl];
	const valueUpgradeTable = statValues[140];

	stats.forEach(statName => {
		if (!(statName in statColors))
			console.error("Stat", statName, "does not have an associated color");

		const statColor = statColors[statName];
		const statValue = statName in valueTable ? valueTable[statName] : valueTable[null];
		const statUpgradeValue = statName in valueUpgradeTable ? valueUpgradeTable[statName] : valueUpgradeTable[null];

		runes.push({
			type: statColor,
			setName: name,
			power: 3,
			statName,
			statValue: statUpgradeValue,
			unique: true,
			items: ["head", "shoulders", "legs"]
		});

		runes.push({
			type: statColor,
			setName: name,
			power: 2,
			statName,
			statValue,
			uniquePerItem: true
		});

		runes.push({
			type: statColor,
			setName: name,
			power: 1,
			statName,
			statValue
		});
	});

	powers.unshift(null);

	runes.sets[name] = {
		runes: runes.fromSet(name),
		powers
	};
}

function makeRMTClassSet(name, stats, powers) {
	const valueTable = statValues[140];

	stats.forEach((statName, idx) => {
		if (!(statName in statColors))
			console.error("Stat", statName, "does not have an associated color");

		const statColor = statColors[statName];
		const statValue = statName in valueTable ? valueTable[statName] : valueTable[null];

		runes.push({
			type: statColor,
			setName: name,
			power: idx == 0 ? 2 : 1,
			statName,
			statValue,
			unique: true,
			items: ["head", "shoulders", "legs"]
		});
	});

	runes.sets[name] = {
		runes: runes.fromSet(name),
		powers
	};
}

function makeRMTSet(name, stats, powers) {
	const valueTable = statValues[140];

	stats.forEach((statName, idx) => {
		if (!(statName in statColors))
			console.error("Stat", statName, "does not have an associated color");

		const statColor = statColors[statName];
		const statValue = statName in valueTable ? valueTable[statName] : valueTable[null];

		runes.push({
			type: statColor,
			setName: name,
			power: idx == 0 ? 2 : 1,
			statName,
			statValue,
			unique: idx == 0,
			uniquePerItem: true
		});
	});

	runes.sets[name] = {
		runes: runes.fromSet(name),
		powers
	};
}

function makeNonRMTSet(name, stats, powers) {
	[80, 100, 120].forEach(lvl => {
		const valueTable = statValues[lvl];

		stats.forEach(statName => {
			if (!(statName in statColors))
				console.error("Stat", statName, "does not have an associated color");

			const statColor = statColors[statName];
			const statValue = statName in valueTable ? valueTable[statName] : valueTable[null];

			runes.push({
				type: statColor,
				setName: name,
				power: 2,
				statName,
				statValue,
				uniquePerItem: true
			});

			runes.push({
				type: statColor,
				setName: name,
				power: 1,
				statName,
				statValue
			});
		});
	});

	powers.unshift(null);

	runes.sets[name] = {
		runes: runes.fromSet(name),
		powers
	};
}

runes.fromSet = function fromSet(name) {
	const result = [];

	runes.forEach(function (rune, runeID) {
		if (rune.setName == name)
			result.push(runeID);
	});

	return result;
};

export default runes;

// Datascape Class Sets
makeNonRMTClassSet(
	120,
	"Technician",
	[
		"Strikethrough",
		"Health",
		"Life Steal",
		"Vigor"
	],
	[
		{type: "bonus", name: "Vigor", value: 0.21},
		{type: "bonus", name: "Strikethrough", value: 0.24},
		{type: "special", name: "Technician Tier 1", value: ""},
		{type: "bonus", name: "Vigor", value: 0.30},
		{type: "bonus", name: "Strikethrough", value: 0.33},
		{type: "bonus", name: "Vigor", value: 0.36},
		{type: "special", name: "Technician Tier 2", value: ""}
	]
);
makeNonRMTClassSet(
	120,
	"Fiendish",
	[
		"Strikethrough",
		"Health",
		"Life Steal",
		"Vigor"
	],
	[
		{type: "bonus", name: "Vigor", value: 0.21},
		{type: "bonus", name: "Strikethrough", value: 0.24},
		{type: "special", name: "Fiendish Tier 1", value: ""},
		{type: "bonus", name: "Vigor", value: 0.30},
		{type: "bonus", name: "Strikethrough", value: 0.33},
		{type: "bonus", name: "Vigor", value: 0.36},
		{type: "special", name: "Fiendish Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Atomic Charge",
	[
		"Strikethrough",
		"Health",
		"Multi-Hit Chance",
		"Vigor"
	],
	[
		{type: "bonus", name: "Multi-Hit Chance", value: 0.35},
		{type: "bonus", name: "Multi-Hit Severity", value: 0.40},
		{type: "special", name: "Atomic Charge Tier 1", value: ""},
		{type: "bonus", name: "Strikethrough", value: 0.30},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.55},
		{type: "bonus", name: "Multi-Hit Severity", value: 0.60},
		{type: "special", name: "Atomic Charge Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Flame Surge",
	[
		"Strikethrough",
		"Health",
		"Multi-Hit Chance",
		"Critical Hit Chance"
	],
	[
		{type: "bonus", name: "Multi-Hit Chance", value: 0.35},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.20},
		{type: "special", name: "Flame Surge Tier 1", value: ""},
		{type: "bonus", name: "Strikethrough", value: 0.30},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.28},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.60},
		{type: "special", name: "Flame Surge Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Eviscerator",
	[
		"Strikethrough",
		"Health",
		"Critical Hit Severity",
		"Critical Hit Chance"
	],
	[
		{type: "bonus", name: "Crit-Hit Chance", value: 0.18},
		{type: "bonus", name: "Crit-Hit Severity", value: 0.80},
		{type: "special", name: "Eviscerator Tier 1", value: ""},
		{type: "bonus", name: "Strikethrough", value: 0.30},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.28},
		{type: "bonus", name: "Crit-Hit Severity", value: 1.20},
		{type: "special", name: "Eviscerator Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Burning Rage",
	[
		"Strikethrough",
		"Health",
		"Critical Hit Severity",
		"Critical Hit Chance"
	],
	[
		{type: "bonus", name: "Crit-Hit Chance", value: 0.18},
		{type: "bonus", name: "Crit-Hit Severity", value: 0.80},
		{type: "special", name: "Burning Rage Tier 1", value: ""},
		{type: "bonus", name: "Strikethrough", value: 0.30},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.28},
		{type: "bonus", name: "Crit-Hit Severity", value: 1.20},
		{type: "special", name: "Burning Rage Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Hardened",
	[
		"Critical Hit Chance",
		"Health",
		"Focus Pool",
		"Critical Hit Severity"
	],
	[
		{type: "bonus", name: "Crit-Hit Chance", value: 0.18},
		{type: "bonus", name: "Focus Recovery Rate", value: 0.02},
		{type: "special", name: "Hardened Tier 1", value: ""},
		{type: "bonus", name: "Crit-Hit Severity", value: 1.00},
		{type: "bonus", name: "Focus Recovery Rate", value: 0.02},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.30},
		{type: "special", name: "Hardened Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Resource Probes",
	[
		"Focus Recovery Rate",
		"Health",
		"Focus Pool",
		"Intensity"
	],
	[
		{type: "bonus", name: "Intensity", value: 0.21},
		{type: "multiplier", name: "Focus Pool", value: 1.20},
		{type: "special", name: "Resource Probes Tier 1", value: ""},
		{type: "bonus", name: "Focus Recovery Rate", value: 0.02},
		{type: "multiplier", name: "Focus Pool", value: 1.65},
		{type: "bonus", name: "Intensity", value: 0.36},
		{type: "special", name: "Resource Probes Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Prevention",
	[
		"Focus Recovery Rate",
		"Health",
		"Focus Pool",
		"Intensity"
	],
	[
		{type: "bonus", name: "Intensity", value: 0.21},
		{type: "multiplier", name: "Focus Pool", value: 1.20},
		{type: "special", name: "Prevention Tier 1", value: ""},
		{type: "bonus", name: "Focus Recovery Rate", value: 0.02},
		{type: "multiplier", name: "Focus Pool", value: 1.65},
		{type: "bonus", name: "Intensity", value: 0.36},
		{type: "special", name: "Prevention Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Mecha Shield",
	[
		"Multi-Hit Chance",
		"Glance Chance",
		"Armor",
		"Critical Mitigation"
	],
	[
		{type: "bonus", name: "Glance Chance", value: 0.21},
		{type: "bonus", name: "Glance Mitigation", value: 0.40},
		{type: "special", name: "Mecha Shield Tier 1", value: ""},
		{type: "bonus", name: "Armor", value: 0.50},
		{type: "bonus", name: "Glance Chance", value: 0.33},
		{type: "bonus", name: "Glance Mitigation", value: 0.60},
		{type: "special", name: "Mecha Shield Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Furor",
	[
		"Strikethrough",
		"Health",
		"Deflect Chance",
		"Critical Mitigation"
	],
	[
		{type: "bonus", name: "Deflect Chance", value: 0.10},
		{type: "multiplier", name: "Health", value: 0.20},
		{type: "special", name: "Furor Tier 1", value: ""},
		{type: "bonus", name: "Crit-Mitigation", value: 1.50},
		{type: "multiplier", name: "Health", value: 0.28},
		{type: "bonus", name: "Deflect Chance", value: 0.18},
		{type: "special", name: "Furor Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Vanguard",
	[
		"Glance Chance",
		"Multi-Hit Chance",
		"Armor",
		"Critical Mitigation"
	],
	[
		{type: "bonus", name: "Glance Chance", value: 0.21},
		{type: "bonus", name: "Glance Mitigation", value: 0.40},
		{type: "special", name: "Vanguard Tier 1", value: ""},
		{type: "bonus", name: "Armor", value: 0.50},
		{type: "bonus", name: "Glance Chance", value: 0.33},
		{type: "bonus", name: "Glance Mitigation", value: 0.60},
		{type: "special", name: "Vanguard Tier 2", value: ""}
	]
);

// Genetic Archives Class Sets
makeNonRMTClassSet(
	100,
	"Eradication",
	[
		"Multi-Hit Chance",
		"Strikethrough",
		"Health",
		"Vigor"
	],
	[
		{type: "bonus", name: "Multi-Hit Chance", value: 0.35},
		{type: "bonus", name: "Multi-Hit Severity", value: 0.40},
		{type: "special", name: "Eradication Tier 1", value: ""},
		{type: "bonus", name: "Strikethrough", value: 0.30},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.55},
		{type: "bonus", name: "Multi-Hit Severity", value: 0.60},
		{type: "special", name: "Eradication Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Mental Prowess",
	[
		"Critical Hit Chance",
		"Strikethrough",
		"Health",
		"Critical Hit Severity"
	],
	[
		{type: "bonus", name: "Crit-Hit Chance", value: 0.18},
		{type: "bonus", name: "Crit-Hit Severity", value: 0.80},
		{type: "special", name: "Mental Prowess Tier 1", value: ""},
		{type: "bonus", name: "Strikethrough", value: 0.30},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.28},
		{type: "bonus", name: "Crit-Hit Severity", value: 1.20},
		{type: "special", name: "Mental Prowess Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Overcharge",
	[
		"Strikethrough",
		"Health",
		"Life Steal",
		"Vigor"
	],
	[
		{type: "bonus", name: "Vigor", value: 0.21},
		{type: "bonus", name: "Strikethrough", value: 0.24},
		{type: "special", name: "Overcharge Tier 1", value: ""},
		{type: "bonus", name: "Vigor", value: 0.30},
		{type: "bonus", name: "Strikethrough", value: 0.33},
		{type: "bonus", name: "Vigor", value: 0.36},
		{type: "special", name: "Overcharge Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Well Of Power",
	[
		"Strikethrough",
		"Health",
		"Life Steal",
		"Vigor"
	],
	[
		{type: "bonus", name: "Vigor", value: 0.21},
		{type: "bonus", name: "Strikethrough", value: 0.24},
		{type: "special", name: "Well of Power Tier 1", value: ""},
		{type: "bonus", name: "Vigor", value: 0.30},
		{type: "bonus", name: "Strikethrough", value: 0.33},
		{type: "bonus", name: "Vigor", value: 0.36},
		{type: "special", name: "Well of Power Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Assasin",
	[
		"Strikethrough",
		"Health",
		"Life Steal",
		"Vigor"
	],
	[
		{type: "bonus", name: "Vigor", value: 0.21},
		{type: "bonus", name: "Strikethrough", value: 0.24},
		{type: "special", name: "Assassin Tier 1", value: ""},
		{type: "bonus", name: "Vigor", value: 0.30},
		{type: "bonus", name: "Strikethrough", value: 0.33},
		{type: "bonus", name: "Vigor", value: 0.36},
		{type: "special", name: "Assassin Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Unity",
	[
		"Strikethrough",
		"Health",
		"Life Steal",
		"Vigor"
	],
	[
		{type: "bonus", name: "Vigor", value: 0.21},
		{type: "bonus", name: "Strikethrough", value: 0.24},
		{type: "special", name: "Unity Tier 1", value: ""},
		{type: "bonus", name: "Vigor", value: 0.30},
		{type: "bonus", name: "Strikethrough", value: 0.33},
		{type: "bonus", name: "Vigor", value: 0.36},
		{type: "special", name: "Unity Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Guardian",
	[
		"Intensity",
		"Focus Recovery Rate",
		"Health",
		"Focus Pool"
	],
	[
		{type: "bonus", name: "Intensity", value: 0.21},
		{type: "multiplier", name: "Focus Pool", value: 1.20},
		{type: "special", name: "Guardian Tier 1", value: ""},
		{type: "bonus", name: "Focus Recovery Rate", value: 0.02},
		{type: "multiplier", name: "Focus Pool", value: 1.65},
		{type: "bonus", name: "Intensity", value: 0.36},
		{type: "special", name: "Guardian Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Great Aegis",
	[
		"Focus Recovery Rate",
		"Health",
		"Focus Pool",
		"Multi-Hit Chance"
	],
	[
		{type: "bonus", name: "Multi-Hit Chance", value: 0.35},
		{type: "multiplier", name: "Focus Pool", value: 1.20},
		{type: "special", name: "Great Aegis Tier 1", value: ""},
		{type: "bonus", name: "Multi-Hit Severity", value: 0.50},
		{type: "multiplier", name: "Focus Pool", value: 1.65},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.60},
		{type: "special", name: "Great Aegis Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Surge Life",
	[
		"Critical Hit Chance",
		"Health",
		"Multi-Hit Chance",
		"Intensity"
	],
	[
		{type: "bonus", name: "Crit-Hit Chance", value: 0.18},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.40},
		{type: "special", name: "Surge Life Tier 1", value: ""},
		{type: "bonus", name: "Intensity", value: 0.30},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.55},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.30},
		{type: "special", name: "Surge Life Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Unbreakable",
	[
		"Armor",
		"Strikethrough",
		"Health",
		"Critical Mitigation"
	],
	[
		{type: "bonus", name: "Crit-Mitigation", value: 1.05},
		{type: "bonus", name: "Armor", value: 0.40},
		{type: "special", name: "Unbreakable Tier 1", value: ""},
		{type: "multiplier", name: "Health", value: 0.25},
		{type: "bonus", name: "Armor", value: 0.55},
		{type: "bonus", name: "Crit-Mitigation", value: 1.80},
		{type: "special", name: "Unbreakable Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Waller",
	[
		"Strikethrough",
		"Health",
		"Armor",
		"Critical Mitigation"
	],
	[
		{type: "bonus", name: "Crit-Mitigation", value: 1.05},
		{type: "bonus", name: "Armor", value: 0.40},
		{type: "special", name: "Waller Tier 1", value: ""},
		{type: "multiplier", name: "Health", value: 0.25},
		{type: "bonus", name: "Armor", value: 0.55},
		{type: "bonus", name: "Crit-Mitigation", value: 1.80},
		{type: "special", name: "Waller Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Energized Arms",
	[
		"Strikethrough",
		"Armor",
		"Health",
		"Critical Mitigation"
	],
	[
		{type: "bonus", name: "Crit-Mitigation", value: 1.05},
		{type: "bonus", name: "Armor", value: 0.40},
		{type: "special", name: "Energized Arms Tier 1", value: ""},
		{type: "multiplier", name: "Health", value: 0.25},
		{type: "bonus", name: "Armor", value: 0.55},
		{type: "bonus", name: "Crit-Mitigation", value: 1.80},
		{type: "special", name: "Energized Arms Tier 2", value: ""}
	]
);

// RMT Class Sets
makeRMTClassSet(
	"Broadside",
	[
		"Multi-Hit Severity",
		"Strikethrough",
		"Life Steal",
		"Vigor"
	],
	[
		{type: "bonus", name: "Strikethrough", value: 1.50},
		{type: "special", name: "Broadside Tier 1", value: ""},
		{type: "special", name: "Broadside Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Deadlight",
	[
		"Glance Mitigation",
		"Glance Chance",
		"Armor",
		"Critical Mitigation"
	],
	[
		{type: "bonus", name: "Crit-Mitigation", value: 7.50},
		{type: "special", name: "Deadlight Tier 1", value: ""},
		{type: "special", name: "Deadlight Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Deja Vu",
	[
		"Critical Hit Severity",
		"Strikethrough",
		"Life Steal",
		"Vigor"
	],
	[
		{type: "bonus", name: "Strikethrough", value: 1.50},
		{type: "special", name: "Deja Tier 1", value: ""},
		{type: "special", name: "Deja Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Requiem",
	[
		"Multi-Hit Severity",
		"Critical Hit Chance",
		"Critical Hit Severity",
		"Focus Pool"
	],
	[
		{type: "bonus", name: "Focus Recovery Rate", value: 0.10},
		{type: "special", name: "Requiem Tier 1", value: ""},
		{type: "special", name: "Requiem Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Reanimator",
	[
		"Multi-Hit Severity",
		"Focus Recovery Rate",
		"Focus Pool",
		"Intensity"
	],
	[
		{type: "bonus", name: "Focus Recovery Rate", value: 0.10},
		{type: "special", name: "Reanimator Tier 1", value: ""},
		{type: "special", name: "Reanimator Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Scourge",
	[
		"Multi-Hit Severity",
		"Multi-Hit Chance",
		"Strikethrough",
		"Vigor"
	],
	[
		{type: "bonus", name: "Strikethrough", value: 1.50},
		{type: "special", name: "Scourge Tier 1", value: ""},
		{type: "special", name: "Scourge Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Bullet From Beyond",
	[
		"Armor Pierce",
		"Critical Hit Chance",
		"Multi-Hit Chance",
		"Strikethrough"
	],
	[
		{type: "bonus", name: "Strikethrough", value: 1.50},
		{type: "special", name: "Bullet Tier 1", value: ""},
		{type: "special", name: "Bullet Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Voice From Beyond",
	[
		"Multi-Hit Severity",
		"Focus Recovery Rate",
		"Focus Pool",
		"Intensity"
	],
	[
		{type: "bonus", name: "Focus Recovery Rate", value: 0.10},
		{type: "special", name: "Voice Tier 1", value: ""},
		{type: "special", name: "Voice Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Murder",
	[
		"Suit Power",
		"Critical Hit Chance",
		"Critical Hit Severity",
		"Strikethrough"
	],
	[
		{type: "bonus", name: "Strikethrough", value: 1.50},
		{type: "special", name: "Murder Tier 1", value: ""},
		{type: "special", name: "Murder Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Graverobber",
	[
		"Suit Power",
		"Deflect Chance",
		"Health",
		"Critical Mitigation"
	],
	[
		{type: "bonus", name: "Crit-Mitigation", value: 7.50},
		{type: "special", name: "Graverobber Tier 1", value: ""},
		{type: "special", name: "Graverobber Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Captain's Curse",
	[
		"Glance Mitigation",
		"Glance Chance",
		"Armor",
		"Critical Mitigation"
	],
	[
		{type: "bonus", name: "Crit-Mitigation", value: 7.50},
		{type: "special", name: "Captain Tier 1", value: ""},
		{type: "special", name: "Captain Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Keelhaul",
	[
		"Armor Pierce",
		"Critical Hit Chance",
		"Critical Hit Severity",
		"Strikethrough"
	],
	[
		{type: "bonus", name: "Strikethrough", value: 1.50},
		{type: "special", name: "Keelhaul Tier 1", value: ""},
		{type: "special", name: "Keelhaul Tier 2", value: ""}
	]
);

// RMT Sets
makeRMTSet(
	"Pallliated",
	[
		"Critical Mitigation",
		"Critical Mitigation",
		"Armor",
		"Health"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "multiplier", name: "Armor", value: 0.65},
		{type: "bonus", name: "Crit-Mitigation", value: 4.50}
	]
);

makeRMTSet(
	"Intensification",
	[
		"Intensity",
		"Focus Pool",
		"Focus Recovery Rate",
		"Intensity"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "multiplier", name: "Focus Pool", value: 2.00},
		{type: "bonus", name: "Intensity", value: 0.84}
	]
);

makeRMTSet(
	"Resumption",
	[
		"Focus Recovery Rate",
		"Focus Recovery Rate",
		"Multi-Hit Chance",
		"Health"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.75},
		{type: "bonus", name: "Focus Recovery Rate", value: 0.15}
	]
);

makeRMTSet(
	"Gleaming",
	[
		"Glance Mitigation",
		"Glance Chance",
		"Armor",
		"Health"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "bonus", name: "Glance Chance", value: 0.73},
		{type: "bonus", name: "Glance Mitigation", value: 0.60}
	]
);

makeRMTSet(
	"Ruination",
	[
		"Critical Hit Severity",
		"Critical Hit Severity",
		"Strikethrough",
		"Critical Hit Chance"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.32},
		{type: "bonus", name: "Crit-Hit Severity", value: 3.00}
	]
);

makeRMTSet(
	"Evasion",
	[
		"Deflect Chance",
		"Deflect Chance",
		"Health",
		"Armor"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "multiplier", name: "Armor", value: 0.65},
		{type: "bonus", name: "Deflect Chance", value: 0.45}
	]
);

makeRMTSet(
	"Pandemic",
	[
		"Vigor",
		"Vigor",
		"Multi-Hit Chance",
		"Critical Hit Chance"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.31},
		{type: "bonus", name: "Vigor", value: 0.84}
	]
);

makeRMTSet(
	"Siphoning",
	[
		"Life Steal",
		"Life Steal",
		"Strikethrough",
		"Vigor"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "bonus", name: "Strikethrough", value: 0.38},
		{type: "bonus", name: "Life Steal", value: 0.63}
	]
);

makeRMTSet(
	"Hardiness",
	[
		"Health",
		"Health",
		"Armor",
		"Deflect Chance"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "bonus", name: "Glance Chance", value: 0.73},
		{type: "bonus", name: "Deflect Chance", value: 0.45}
	]
);

makeRMTSet(
	"Rejuvenation",
	[
		"Critical Hit Chance",
		"Critical Hit Chance",
		"Intensity",
		"Multi-Hit Chance"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.75},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.75}
	]
);

makeRMTSet(
	"Vim",
	[
		"Focus Pool",
		"Focus Pool",
		"Critical Hit Chance",
		"Critical Hit Severity"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.31},
		{type: "multiplier", name: "Focus Pool", value: 4.80}
	]
);

makeRMTSet(
	"Basher",
	[
		"Multi-Hit Severity",
		"Multi-Hit Chance",
		"Vigor",
		"Strikethrough"
	],
	[
		{type: "multiplier", name: "Health", value: 1},
		{type: "bonus", name: "Multi-Hit Severity", value: 1.20},
		{type: "bonus", name: "Multi-Hit Chance", value: 1.80}
	]
);

// Non-RMT Sets
makeNonRMTSet(
	"Striker",
	[
		"Multi-Hit Chance",
		"Strikethrough",
		"Health"
	],
	[
		{type: "bonus", name: "Multi-Hit Chance", value: 0.35},
		{type: "bonus", name: "Multi-Hit Severity", value: 0.40},
		{type: "bonus", name: "Strikethrough", value: 0.27},
		{type: "bonus", name: "Multi-Hit Severity", value: 0.50},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.55}
	]
);

makeNonRMTSet(
	"Defiance",
	[
		"Glance Chance",
		"Armor",
		"Strikethrough"
	],
	[
		{type: "bonus", name: "Glance Chance", value: 0.49},
		{type: "bonus", name: "Glance Mitigation", value: 0.14},
		{type: "multiplier", name: "Armor", value: 0.45},
		{type: "bonus", name: "Glance Mitigation", value: 0.17},
		{type: "bonus", name: "Glance Chance", value: 0.76}
	]
);

makeNonRMTSet(
	"Pulse",
	[
		"Critical Hit Chance",
		"Intensity",
		"Multi-Hit Chance"
	],
	[
		{type: "multiplier", name: "Health", value: 0.17},
		{type: "bonus", name: "Multi-Hit Severity", value: 0.40},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.22},
		{type: "bonus", name: "Multi-Hit Severity", value: 0.50},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.28}
	]
);

makeNonRMTSet(
	"Havoc",
	[
		"Critical Hit Chance",
		"Multi-Hit Chance",
		"Strikethrough"
	],
	[
		{type: "multiplier", name: "Health", value: 0.17},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.20},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.45},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.25},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.55}
	]
);

makeNonRMTSet(
	"Elusion",
	[
		"Deflect Chance",
		"Health",
		"Strikethrough"
	],
	[
		{type: "bonus", name: "Deflect Chance", value: 0.10},
		{type: "multiplier", name: "Health", value: 0.20},
		{type: "multiplier", name: "Armor", value: 0.45},
		{type: "multiplier", name: "Health", value: 0.25},
		{type: "bonus", name: "Deflect Chance", value: 0.16}
	]
);

makeNonRMTSet(
	"Resurgence",
	[
		"Critical Hit Chance",
		"Focus Pool",
		"Health"
	],
	[
		{type: "bonus", name: "Crit-Hit Chance", value: 0.18},
		{type: "bonus", name: "Focus Recovery Rate", value: 0.02},
		{type: "bonus", name: "Crit-Hit Severity", value: 0.90},
		{type: "bonus", name: "Focus Recovery Rate", value: 0.02},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.28}
	]
);

makeNonRMTSet(
	"Onslaught",
	[
		"Vigor",
		"Life Steal",
		"Strikethrough"
	],
	[
		{type: "bonus", name: "Vigor", value: 0.21},
		{type: "bonus", name: "Strikethrough", value: 0.24},
		{type: "bonus", name: "Life Steal", value: 0.18},
		{type: "bonus", name: "Strikethrough", value: 0.30},
		{type: "bonus", name: "Vigor", value: 0.33}
	]
);

makeNonRMTSet(
	"Alleviation",
	[
		"Critical Mitigation",
		"Health",
		"Armor"
	],
	[
		{type: "bonus", name: "Crit-Mitigation", value: 1.05},
		{type: "multiplier", name: "Health", value: 0.20},
		{type: "multiplier", name: "Armor", value: 0.45},
		{type: "multiplier", name: "Health", value: 0.25},
		{type: "bonus", name: "Crit-Mitigation", value: 1.65}
	]
);

makeNonRMTSet(
	"Concentration",
	[
		"Intensity",
		"Focus Pool",
		"Focus Recovery Rate"
	],
	[
		{type: "bonus", name: "Intensity", value: 0.21},
		{type: "bonus", name: "Focus Recovery Rate", value: 0.02},
		{type: "multiplier", name: "Health", value: 0.22},
		{type: "multiplier", name: "Focus Pool", value: 1.50},
		{type: "bonus", name: "Intensity", value: 0.33}
	]
);

makeNonRMTSet(
	"Devastation",
	[
		"Critical Hit Chance",
		"Critical Hit Severity",
		"Health"
	],
	[
		{type: "bonus", name: "Strikethrough", value: 0.21},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.20},
		{type: "bonus", name: "Crit-Hit Severity", value: 0.90},
		{type: "bonus", name: "Crit-Hit Chance", value: 0.25},
		{type: "bonus", name: "Crit-Hit Severity", value: 1.10}
	]
);

makeNonRMTSet(
	"Provoker",
	[
		"Deflect Chance",
		"Glance Chance",
		"Multi-Hit Chance"
	],
	[
		{type: "bonus", name: "Multi-Hit Chance", value: 0.35},
		{type: "bonus", name: "Glance Chance", value: 0.55},
		{type: "bonus", name: "Deflect Chance", value: 0.14},
		{type: "bonus", name: "Glance Chance", value: 0.69},
		{type: "bonus", name: "Deflect Chance", value: 0.16}
	]
);

makeNonRMTSet(
	"Cynosure",
	[
		"Multi-Hit Chance",
		"Focus Recovery Rate",
		"Health"
	],
	[
		{type: "bonus", name: "Multi-Hit Chance", value: 0.35},
		{type: "multiplier", name: "Focus Pool", value: 1.20},
		{type: "bonus", name: "Multi-Hit Severity", value: 0.45},
		{type: "multiplier", name: "Focus Pool", value: 1.50},
		{type: "bonus", name: "Multi-Hit Chance", value: 0.55}
	]
);
