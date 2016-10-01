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
			{name: "Voice From Beyond Tier 1", value: true},
			{name: "Voice From Beyond Tier 2", value: true}
		]
	}
};

export default runes;
