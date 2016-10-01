"use strict";

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

export default {transformStat};
