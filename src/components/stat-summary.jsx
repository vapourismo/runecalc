/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";

import StatTable from "./stats-table.jsx";
import AppStore from "../app-store.jsx";
import Items from "../database/items.jsx";
import Stats from "../database/stats.jsx";

export default class StatSummary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			runes: [],
			items: []
		};
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribe(
			() => {
				const loadoutState = AppStore.getState().loadout;
				const runes = [];
				const items = [];

				for (let itemSlot in loadoutState) {
					let item = loadoutState[itemSlot];

					if (item.item)
						items.push(item.item);

					if (item.runes)
						runes.push(item.runes);
				}

				this.setState({items, runes});
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

		const stats = Stats.translateRatingsToStats(ratings);
		Stats.fillDefaultStats(stats);
		Stats.applyStatBonuses(stats, bonuses);
		Stats.applyStatMultipliers(stats, multipliers);

		return <StatTable stats={stats} />;
	}
}
