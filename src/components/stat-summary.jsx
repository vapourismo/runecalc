/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";

import StatTable from "./stats-table.jsx";
import AppStore from "../app-store.jsx";
import Items from "../database/items.jsx";
import Runes from "../database/runes.jsx";
import Stats from "../database/stats.jsx";

function getAMPBonuses(amps) {
	return {
		"Critical Hit Chance": amps.criticalHitChance,
		"Critical Hit Severity": 2 * amps.criticalHitSeverity,
		"Strikethrough": 1.5 * amps.strikethrough,
		"Armor Pierce": 2 * amps.armorPierce,
		"Life Steal": amps.lifeSteal,
		"Deflect Chance": amps.deflectChance,
		"Critical Mitigation": 4 * amps.criticalMitigation,
		"Intensity": 2 * amps.intensity,
		"Assault Rating": (Math.pow(1.025, amps.assaultPower) - 1) * 100,
		"Support Rating": (Math.pow(1.025, amps.supportPower) - 1) * 100
	};
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

		this.state.items.forEach(itemID => {
			if (itemID in Items)
				Stats.mergeRatings(ratings, Items[itemID].ratings);
		});

		this.state.runes.forEach(runes => {
			Stats.gatherRuneDetails(runes, ratings, bonuses);
		});

		Stats.mergeBonuses(bonuses, getAMPBonuses(this.state.amps));

		const stats = Stats.processRatings(ratings, bonuses);
		Stats.fillDefaultStats(stats);

		return <StatTable stats={stats} />;
	}
}
