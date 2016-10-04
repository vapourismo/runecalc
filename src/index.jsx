/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";

import AppStore from "./app-store.jsx";

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
			runes: []
		};
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribe(
			() => {
				const loadoutState = AppStore.getState().items;
				this.setState({runes: Object.values(loadoutState)});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	render() {
		let allStats = Stats.mergeStats(this.state.runes.map(Stats.gatherStats));

		if (this.state.powerConverter)
			modPowerConverter(allStats);

		allStats = Stats.transformStats(allStats);

		return (
			<StatDisplay stats={allStats} />
		);
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
