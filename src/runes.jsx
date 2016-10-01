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
		type: "life",
		setName: "Voice From Beyond",
		statName: "Intensity Rating",
		statValue: 501,
		power: 1
	}
];

function runesFromSet(name) {
	return runes.filter(rune => rune.setName == name);
}

runes.sets = {
	"Voice From Beyond": {
		runes: runesFromSet("Voice from Beyond"),
		powers: [
			{"Focus Recovery Rate": 0.1},
			{"Voice From Beyond Tier 1": true},
			{"Voice From Beyond Tier 2": true}
		]
	}
};

export default runes;
