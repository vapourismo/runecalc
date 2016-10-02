/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";


const statColors = {
	"Armor":                     "earth",
	"Armor Pierce Rating":       "air",
	"Crit-Hit Rating":           "fire",
	"Crit-Hit Severity Rating":  "earth",
	"Crit-Mitigation Rating":    "logic",
	"Deflect Rating":            "air",
	"Focus Pool":                "life",
	"Focus Recovery Rating":     "air",
	"Glance Mitigation Rating":  "fire",
	"Glance Rating":             "water",
	"Health":                    "life",
	"Intensity Rating":          "logic",
	"Lifesteal Rating":          "life",
	"Multi-Hit Rating":          "water",
	"Multi-Hit Severity Rating": "earth",
	"Strikethrough Rating":      "air",
	"Suit Power":                "logic",
	"Vigor Rating":              "logic"
};

const statValues = {
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
			unique: true
		});
	});

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
		"Strikethrough Rating",
		"Health",
		"Lifesteal Rating",
		"Vigor Rating"
	],
	[
		{name: "Vigor", value: 0.21},
		{name: "Strikethrough", value: 0.24},
		{name: "Technician Tier 1", value: ""},
		{name: "Vigor", value: 0.30},
		{name: "Strikethrough", value: 0.33},
		{name: "Vigor", value: 0.36},
		{name: "Technician Tier 2", value: ""}
	]
);
makeNonRMTClassSet(
	120,
	"Fiendish",
	[
		"Strikethrough Rating",
		"Health",
		"Lifesteal Rating",
		"Vigor Rating"
	],
	[
		{name: "Vigor", value: 0.21},
		{name: "Strikethrough", value: 0.24},
		{name: "Fiendish Tier 1", value: ""},
		{name: "Vigor", value: 0.30},
		{name: "Strikethrough", value: 0.33},
		{name: "Vigor", value: 0.36},
		{name: "Fiendish Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Atomic Charge",
	[
		"Strikethrough Rating",
		"Health",
		"Multi-Hit Rating",
		"Vigor Rating"
	],
	[
		{name: "Multi-Hit Chance", value: 0.35},
		{name: "Multi-Hit Severity", value: 0.40},
		{name: "Atomic Charge Tier 1", value: ""},
		{name: "Strikethrough", value: 0.30},
		{name: "Multi-Hit Chance", value: 0.55},
		{name: "Multi-Hit Severity", value: 0.60},
		{name: "Atomic Charge Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Flame Surge",
	[
		"Strikethrough Rating",
		"Health",
		"Multi-Hit Rating",
		"Crit-Hit Rating"
	],
	[
		{name: "Multi-Hit Chance", value: 0.35},
		{name: "Crit-Hit Chance", value: 0.20},
		{name: "Flame Surge Tier 1", value: ""},
		{name: "Strikethrough", value: 0.30},
		{name: "Crit-Hit Chance", value: 0.28},
		{name: "Multi-Hit Chance", value: 0.60},
		{name: "Flame Surge Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Eviscerator",
	[
		"Strikethrough Rating",
		"Health",
		"Crit-Hit Severity Rating",
		"Crit-Hit Rating"
	],
	[
		{name: "Crit-Hit Chance", value: 0.18},
		{name: "Crit-Hit Severity", value: 0.80},
		{name: "Eviscerator Tier 1", value: ""},
		{name: "Strikethrough", value: 0.30},
		{name: "Crit-Hit Chance", value: 0.28},
		{name: "Crit-Hit Severity", value: 1.20},
		{name: "Eviscerator Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Burning Rage",
	[
		"Strikethrough Rating",
		"Health",
		"Crit-Hit Severity Rating",
		"Crit-Hit Rating"
	],
	[
		{name: "Crit-Hit Chance", value: 0.18},
		{name: "Crit-Hit Severity", value: 0.80},
		{name: "Burning Rage Tier 1", value: ""},
		{name: "Strikethrough", value: 0.30},
		{name: "Crit-Hit Chance", value: 0.28},
		{name: "Crit-Hit Severity", value: 1.20},
		{name: "Burning Rage Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Hardened",
	[
		"Crit-Hit Rating",
		"Health",
		"Focus Pool",
		"Crit-Hit Severity Rating"
	],
	[
		{name: "Crit-Hit Chance", value: 0.18},
		{name: "Focus Recovery Rate", value: 0.02},
		{name: "Hardened Tier 1", value: ""},
		{name: "Crit-Hit Severity", value: 1.00},
		{name: "Focus Recovery Rate", value: 0.02},
		{name: "Crit-Hit Chance", value: 0.30},
		{name: "Hardened Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Resource Probes",
	[
		"Focus Recovery Rating",
		"Health",
		"Focus Pool",
		"Intensity Rating"
	],
	[
		{name: "Intensity", value: 0.21},
		{name: "Focus Pool Multiplier", value: 1.20},
		{name: "Resource Probes Tier 1", value: ""},
		{name: "Focus Recovery Rate", value: 0.02},
		{name: "Focus Pool Multiplier", value: 1.65},
		{name: "Intensity", value: 0.36},
		{name: "Resource Probes Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Prevention",
	[
		"Focus Recovery Rating",
		"Health",
		"Focus Pool",
		"Intensity Rating"
	],
	[
		{name: "Intensity", value: 0.21},
		{name: "Focus Pool Multiplier", value: 1.20},
		{name: "Prevention Tier 1", value: ""},
		{name: "Focus Recovery Rate", value: 0.02},
		{name: "Focus Pool Multiplier", value: 1.65},
		{name: "Intensity", value: 0.36},
		{name: "Prevention Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Mecha Shield",
	[
		"Multi-Hit Rating",
		"Glance Rating",
		"Armor",
		"Crit-Mitigation Rating"
	],
	[
		{name: "Glance Chance", value: 0.21},
		{name: "Glance Mitigation", value: 0.40},
		{name: "Mecha Shield Tier 1", value: ""},
		{name: "Armor", value: 0.50},
		{name: "Glance Chance", value: 0.33},
		{name: "Glance Mitigation", value: 0.60},
		{name: "Mecha Shield Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Furor",
	[
		"Strikethrough Rating",
		"Health",
		"Deflect Rating",
		"Crit-Mitigation Rating"
	],
	[
		{name: "Deflect Chance", value: 0.10},
		{name: "Health Multiplier", value: 0.20},
		{name: "Furor Tier 1", value: ""},
		{name: "Crit-Mitigation", value: 1.50},
		{name: "Health Multiplier", value: 0.28},
		{name: "Deflect Chance", value: 0.18},
		{name: "Furor Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	120,
	"Vanguard",
	[
		"Glance Rating",
		"Multi-Hit Rating",
		"Armor",
		"Crit-Mitigation Rating"
	],
	[
		{name: "Glance Chance", value: 0.21},
		{name: "Glance Mitigation", value: 0.40},
		{name: "Vanguard Tier 1", value: ""},
		{name: "Armor", value: 0.50},
		{name: "Glance Chance", value: 0.33},
		{name: "Glance Mitigation", value: 0.60},
		{name: "Vanguard Tier 2", value: ""}
	]
);

// Genetic Archives Class Sets
makeNonRMTClassSet(
	100,
	"Eradication",
	[
		"Multi-Hit Rating",
		"Strikethrough Rating",
		"Health",
		"Vigor Rating"
	],
	[
		{name: "Multi-Hit Chance", value: 0.35},
		{name: "Multi-Hit Severity", value: 0.40},
		{name: "Eradication Tier 1", value: ""},
		{name: "Strikethrough", value: 0.30},
		{name: "Multi-Hit Chance", value: 0.55},
		{name: "Multi-Hit Severity", value: 0.60},
		{name: "Eradication Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Mental Prowess",
	[
		"Crit-Hit Rating",
		"Strikethrough Rating",
		"Health",
		"Crit-Hit Severity Rating"
	],
	[
		{name: "Crit-Hit Chance", value: 0.18},
		{name: "Crit-Hit Severity", value: 0.80},
		{name: "Mental Prowess Tier 1", value: ""},
		{name: "Strikethrough", value: 0.30},
		{name: "Crit-Hit Chance", value: 0.28},
		{name: "Crit-Hit Severity", value: 1.20},
		{name: "Mental Prowess Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Overcharge",
	[
		"Strikethrough Rating",
		"Health",
		"Lifesteal Rating",
		"Vigor Rating"
	],
	[
		{name: "Vigor", value: 0.21},
		{name: "Strikethrough", value: 0.24},
		{name: "Overcharge Tier 1", value: ""},
		{name: "Vigor", value: 0.30},
		{name: "Strikethrough", value: 0.33},
		{name: "Vigor", value: 0.36},
		{name: "Overcharge Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Well Of Power",
	[
		"Strikethrough Rating",
		"Health",
		"Lifesteal Rating",
		"Vigor Rating"
	],
	[
		{name: "Vigor", value: 0.21},
		{name: "Strikethrough", value: 0.24},
		{name: "Well of Power Tier 1", value: ""},
		{name: "Vigor", value: 0.30},
		{name: "Strikethrough", value: 0.33},
		{name: "Vigor", value: 0.36},
		{name: "Well of Power Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Assasin",
	[
		"Strikethrough Rating",
		"Health",
		"Lifesteal Rating",
		"Vigor Rating"
	],
	[
		{name: "Vigor", value: 0.21},
		{name: "Strikethrough", value: 0.24},
		{name: "Assassin Tier 1", value: ""},
		{name: "Vigor", value: 0.30},
		{name: "Strikethrough", value: 0.33},
		{name: "Vigor", value: 0.36},
		{name: "Assassin Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Unity",
	[
		"Strikethrough Rating",
		"Health",
		"Lifesteal Rating",
		"Vigor Rating"
	],
	[
		{name: "Vigor", value: 0.21},
		{name: "Strikethrough", value: 0.24},
		{name: "Unity Tier 1", value: ""},
		{name: "Vigor", value: 0.30},
		{name: "Strikethrough", value: 0.33},
		{name: "Vigor", value: 0.36},
		{name: "Unity Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Guardian",
	[
		"Intensity Rating",
		"Focus Recovery Rating",
		"Health",
		"Focus Pool"
	],
	[
		{name: "Intensity", value: 0.21},
		{name: "Focus Pool Multiplier", value: 1.20},
		{name: "Guardian Tier 1", value: ""},
		{name: "Focus Recovery Rate", value: 0.02},
		{name: "Focus Pool Multiplier", value: 1.65},
		{name: "Intensity", value: 0.36},
		{name: "Guardian Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Great Aegis",
	[
		"Focus Recovery Rating",
		"Health",
		"Focus Pool",
		"Multi-Hit Rating"
	],
	[
		{name: "Multi-Hit Chance", value: 0.35},
		{name: "Focus Pool Multiplier", value: 1.20},
		{name: "Great Aegis Tier 1", value: ""},
		{name: "Multi-Hit Severity", value: 0.50},
		{name: "Focus Pool Multiplier", value: 1.65},
		{name: "Multi-Hit Chance", value: 0.60},
		{name: "Great Aegis Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Surge Life",
	[
		"Crit-Hit Rating",
		"Health",
		"Multi-Hit Rating",
		"Intensity Rating"
	],
	[
		{name: "Crit-Hit Chance", value: 0.18},
		{name: "Multi-Hit Chance", value: 0.40},
		{name: "Surge Life Tier 1", value: ""},
		{name: "Intensity", value: 0.30},
		{name: "Multi-Hit Chance", value: 0.55},
		{name: "Crit-Hit Chance", value: 0.30},
		{name: "Surge Life Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Unbreakable",
	[
		"Armor",
		"Strikethrough Rating",
		"Health",
		"Crit-Mitigation Rating"
	],
	[
		{name: "Crit-Mitigation", value: 1.05},
		{name: "Armor", value: 0.40},
		{name: "Unbreakable Tier 1", value: ""},
		{name: "Health Multiplier", value: 0.25},
		{name: "Armor", value: 0.55},
		{name: "Crit-Mitigation", value: 1.80},
		{name: "Unbreakable Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Waller",
	[
		"Strikethrough Rating",
		"Health",
		"Armor",
		"Crit-Mitigation Rating"
	],
	[
		{name: "Crit-Mitigation", value: 1.05},
		{name: "Armor", value: 0.40},
		{name: "Waller Tier 1", value: ""},
		{name: "Health Multiplier", value: 0.25},
		{name: "Armor", value: 0.55},
		{name: "Crit-Mitigation", value: 1.80},
		{name: "Waller Tier 2", value: ""}
	]
);

makeNonRMTClassSet(
	100,
	"Energized Arms",
	[
		"Strikethrough Rating",
		"Armor",
		"Health",
		"Crit-Mitigation Rating"
	],
	[
		{name: "Crit-Mitigation", value: 1.05},
		{name: "Armor", value: 0.40},
		{name: "Energized Arms Tier 1", value: ""},
		{name: "Health Multiplier", value: 0.25},
		{name: "Armor", value: 0.55},
		{name: "Crit-Mitigation", value: 1.80},
		{name: "Energized Arms Tier 2", value: ""}
	]
);

// RMT Class Sets
makeRMTClassSet(
	"Broadside",
	[
		"Multi-Hit Severity Rating",
		"Strikethrough Rating",
		"Lifesteal Rating",
		"Vigor Rating"
	],
	[
		{name: "Strikethrough", value: 1.50},
		{name: "Broadside Tier 1", value: ""},
		{name: "Broadside Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Deadlight",
	[
		"Glance Mitigation Rating",
		"Glance Rating",
		"Armor",
		"Crit-Mitigation Rating"
	],
	[
		{name: "Crit-Mitigation", value: 7.50},
		{name: "Deadlight Tier 1", value: ""},
		{name: "Deadlight Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Deja Vu",
	[
		"Crit-Hit Severity Rating",
		"Strikethrough Rating",
		"Lifesteal Rating",
		"Vigor Rating"
	],
	[
		{name: "Strikethrough", value: 1.50},
		{name: "Deja Tier 1", value: ""},
		{name: "Deja Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Requiem",
	[
		"Multi-Hit Severity Rating",
		"Crit-Hit Rating",
		"Crit-Hit Severity Rating",
		"Focus Pool"
	],
	[
		{name: "Focus Recovery Rate", value: 0.10},
		{name: "Requiem Tier 1", value: ""},
		{name: "Requiem Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Reanimator",
	[
		"Multi-Hit Severity Rating",
		"Focus Recovery Rating",
		"Focus Pool",
		"Intensity Rating"
	],
	[
		{name: "Focus Recovery Rate", value: 0.10},
		{name: "Reanimator Tier 1", value: ""},
		{name: "Reanimator Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Scourge",
	[
		"Multi-Hit Severity Rating",
		"Multi-Hit Rating",
		"Strikethrough Rating",
		"Vigor Rating"
	],
	[
		{name: "Strikethrough", value: 1.50},
		{name: "Scourge Tier 1", value: ""},
		{name: "Scourge Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Bullet From Beyond",
	[
		"Armor Pierce Rating",
		"Crit-Hit Rating",
		"Multi-Hit Rating",
		"Strikethrough Rating"
	],
	[
		{name: "Strikethrough", value: 1.50},
		{name: "Bullet Tier 1", value: ""},
		{name: "Bullet Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Voice From Beyond",
	[
		"Multi-Hit Severity Rating",
		"Focus Recovery Rating",
		"Focus Pool",
		"Intensity Rating"
	],
	[
		{name: "Focus Recovery Rate", value: 0.10},
		{name: "Voice Tier 1", value: ""},
		{name: "Voice Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Murder",
	[
		"Suit Power",
		"Crit-Hit Rating",
		"Crit-Hit Severity Rating",
		"Strikethrough Rating"
	],
	[
		{name: "Strikethrough", value: 1.50},
		{name: "Murder Tier 1", value: ""},
		{name: "Murder Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Graverobber",
	[
		"Suit Power",
		"Deflect Rating",
		"Health",
		"Crit-Mitigation Rating"
	],
	[
		{name: "Crit-Mitigation", value: 7.50},
		{name: "Graverobber Tier 1", value: ""},
		{name: "Graverobber Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Captain's Curse",
	[
		"Glance Mitigation Rating",
		"Glance Rating",
		"Armor",
		"Crit-Mitigation Rating"
	],
	[
		{name: "Crit-Mitigation", value: 7.50},
		{name: "Captain Tier 1", value: ""},
		{name: "Captain Tier 2", value: ""}
	]
);

makeRMTClassSet(
	"Keelhaul",
	[
		"Armor Pierce Rating",
		"Crit-Hit Rating",
		"Crit-Hit Severity Rating",
		"Strikethrough Rating"
	],
	[
		{name: "Strikethrough", value: 1.50},
		{name: "Keelhaul Tier 1", value: ""},
		{name: "Keelhaul Tier 2", value: ""}
	]
);
