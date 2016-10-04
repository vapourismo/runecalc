/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";

import AppStore from "./app-store.jsx";
import Runes from "./database/runes.jsx";

import StatDisplay from "./components/stat-display.jsx";
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
			stats: {}
		};
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribe(
			() => {
				const loadoutState = AppStore.getState().items;

				const items = [
					loadoutState.weapon,
					loadoutState.head,
					loadoutState.shoulders,
					loadoutState.chest,
					loadoutState.hands,
					loadoutState.legs,
					loadoutState.feet
				];

				const ratings = {};
				const bonuses = {};
				const multipliers = {};

				items.forEach(item => {
					const info = Stats.analyzeItem(item);

					Stats.merge(ratings, info.ratings);
					Stats.merge(bonuses, info.bonuses);
					Stats.merge(multipliers, info.multipliers);
				});

				const stats = Stats.translateRatingsToStats(ratings);
				Stats.applyStatBonuses(stats, bonuses);
				Stats.applyStatMultipliers(stats, multipliers);

				this.setState({stats});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	render() {
		return <StatDisplay stats={this.state.stats} />
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
						{/*<div className="section">
							<div className="headline">
								Options
							</div>
							<div className="options">
								{<Option
									state={this.state.powerConverter}
									onToggle={newState => this.setState({powerConverter: newState})}
								>
									Power Converter AMP
								</Option>}
							</div>
						</div>*/}
					</div>
				</div>
			</div>
		);
	}
}

window.addEventListener("load", function () {
	ReactDOM.render(<Root />, document.getElementById("canvas"));
});
