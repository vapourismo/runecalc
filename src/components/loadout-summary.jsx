"use strict";

import React, {Component} from "react";
import Runes from "../database/runes.jsx";
import Stats from "../database/stats.jsx";

function insertOrAdd(obj, key, value) {
	if (key in obj)
		obj[key] += value;
	else
		obj[key] = value;
}

function displayStatValue(value) {
	if (typeof(value) == "number")
		return Math.round(value * 100) / 100;
	else
		return value;
}

export default class LoadoutSummary extends Component {
	render() {
		const powers = {};
		const stats = {};

		this.props.runes.forEach(runeID => {
			if (runeID == null || !(runeID in Runes))
				return;

			const rune = Runes[runeID];
			insertOrAdd(powers, rune.setName, rune.power);

			const stat = Stats.transformStat(rune.statName, rune.statValue);
			insertOrAdd(stats, stat.name, stat.value);
		});

		for (let setName in powers) {
			if (!(setName in Runes.sets))
				continue;

			let setPowers = Runes.sets[setName].powers;

			for (let i = 0; i < powers[setName] && i < setPowers.length; i++)
				insertOrAdd(stats, setPowers[i].name, setPowers[i].value);
		}

		let counter = 0;
		const lines = Object.keys(stats).sort().map(name => {
			return (
				<div key={counter++} className="property">
					<div className="name">
						{name}
					</div>
					<div className="value">
						{displayStatValue(stats[name])}
					</div>
				</div>
			);
		});

		return <div className="summary">{lines}</div>;
	}
}
