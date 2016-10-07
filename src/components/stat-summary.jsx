/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";

import StatTable from "./stats-table.jsx";
import AppStore from "../app-store.jsx";
import Items from "../database/items.jsx";
import Stats from "../database/stats.jsx";

function translateAMPs(amps) {
	return {
		bonuses: {
			"Critical Hit Chance": amps.criticalHitChance,
			"Critical Hit Severity": 2 * amps.criticalHitSeverity,
			"Strikethrough": 1.5 * amps.strikethrough,
			"Armor Pierce": 2 * amps.armorPierce,
			"Life Steal": amps.lifeSteal,
			"Deflect Chance": amps.deflectChance,
			"Critical Mitigation": 4 * amps.criticalMitigation,
			"Intensity": 2 * amps.intensity
		},

		multipliers: {
			"Assault Rating": 2.5 * amps.assaultPower,
			"Support Rating": 2.5 * amps.supportPower
		}
	}
}

export default class StatSummary extends Component {
	constructor(props) {
		super(props);

		this.state = this.calculateState();
	}

	calculateState() {
		const appState = AppStore.getState();

		const runes = [];
		const items = [];

		for (let itemSlot in appState.loadout) {
			let item = appState.loadout[itemSlot];

			if (item.item)
				items.push(item.item);

			if (item.runes)
				runes.push(item.runes);
		}

		return {items, runes, amps: appState.amps};
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribe(
			() => {
				this.setState(this.calculateState());
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	render() {
		const ratings = {};
		const bonuses = {};
		const multipliers = {};

		this.state.items.forEach(itemID => {
			if (itemID in Items)
				Stats.merge(ratings, Items[itemID].ratings);
		});

		this.state.runes.forEach(runes => {
			const info = Stats.analyzeItem(runes);

			Stats.merge(ratings, info.ratings);
			Stats.merge(bonuses, info.bonuses);
			Stats.mergeMultipliers(multipliers, info.multipliers);
		});

		const ampInfos = translateAMPs(this.state.amps);
		Stats.merge(bonuses, ampInfos.bonuses);
		Stats.mergeMultipliers(multipliers, ampInfos.multipliers);

		const stats = Stats.translateRatingsToStats(ratings);
		Stats.fillDefaultStats(stats);
		Stats.applyStatBonuses(stats, bonuses);
		Stats.applyStatMultipliers(stats, multipliers);

		return <StatTable stats={stats} />;
	}
}
