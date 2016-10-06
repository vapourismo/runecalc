/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";

import AppStore from "./app-store.jsx";
import Runes from "./database/runes.jsx";
import Items from "./database/items.jsx";

import StatTable from "./components/stats-table.jsx";
import Toolbar from "./components/toolbar.jsx";
import Stats from "./database/stats.jsx";
import ItemSet from "./components/item-set.jsx";
import Option from "./components/option.jsx";
import SaveLoadoutDialog from "./components/save-loadout-dialog.jsx";
import LoadLoadoutDialog from "./components/load-loadout-dialog.jsx";

function modPowerConverter(stats) {
	if ("Crit-Hit Severity Rating" in stats) {
		Stats.insertOrAdd(
			stats,
			"Multi-Hit Severity Rating",
			stats["Crit-Hit Severity Rating"] /= 2
		);
	}
}

class StatSummary extends Component {
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
		Stats.applyStatBonuses(stats, bonuses);
		Stats.applyStatMultipliers(stats, multipliers);

		return <StatTable stats={stats} />
	}
}

class Root extends Component {
	constructor(props) {
		super(props);

		this.state = {
			powerConverter: false
		};

		this.resetLoadout = this.resetLoadout.bind(this);
	}

	resetLoadout() {
		AppStore.dispatch({type: "reset"});
	}

	render() {
		return (
			<div>
				<Toolbar
					onReset={this.resetLoadout}
					onLoad={LoadLoadoutDialog.show}
					onSave={SaveLoadoutDialog.show} />
				<div className="contents">
					<ItemSet />
					<div className="side-bar">
						<div className="section">
							<div className="headline">
								Summary
							</div>
							<StatSummary />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

window.addEventListener("load", function () {
	ReactDOM.render(<Root />, document.getElementById("canvas"));
});
