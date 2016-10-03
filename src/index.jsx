/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as Redux from "redux";

import StatDisplay from "./components/stat-display.jsx";
import Toolbar from "./components/toolbar.jsx";
import Stats from "./database/stats.jsx";
import Overlay from "./utilities/overlay.jsx";
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

const defaultLoadoutState = {
	weapon: [null, null, null],
	head: [null, null, null],
	shoulders: [null, null, null],
	chest: [null, null, null],
	hands: [null, null, null],
	legs: [null, null, null],
	feet: [null, null, null]
};

function reduceLoadoutStore(state = defaultLoadoutState, action) {
	switch (action.type) {
		case "modify_item":
			if (action.item in state)
				return Object.assign({}, state, {[action.item]: action.runes});
			else
				return state;

		case "reset":
			return defaultLoadoutState;

		case "load":
			const stateCopy = Object.assign({}, state);

			for (let item in action.loadout)
				if (item in state)
					stateCopy[item] = action.loadout[item];


			return stateCopy;

		default:
			return state;
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
		this.storeLease = this.props.loadoutStore.subscribe(
			() => {
				const loadoutState = this.props.loadoutStore.getState();
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

		this.loadoutStore = Redux.createStore(reduceLoadoutStore);

		this.state = {
			powerConverter: false
		};

		this.resetLoadout = this.resetLoadout.bind(this);
		this.showSaveDialog = this.showSaveDialog.bind(this);
		this.showLoadDialog = this.showLoadDialog.bind(this);
		this.loadLoadout = this.loadLoadout.bind(this);
	}

	resetLoadout() {
		this.loadoutStore.dispatch({type: "reset"});
	}

	showSaveDialog() {
		Overlay.show(<SaveLoadoutDialog loadout={this.loadoutStore.getState()} onSave={Overlay.hide} />);
	}

	showLoadDialog() {
		Overlay.show(<LoadLoadoutDialog onLoad={this.loadLoadout} />);
	}

	loadLoadout(loadout) {
		Overlay.hide();
		this.loadoutStore.dispatch({type: "load", loadout});
	}

	render() {
		return (
			<div>
				<Toolbar
					onReset={this.resetLoadout}
					onLoad={this.showLoadDialog}
					onSave={this.showSaveDialog} />
				<div className="contents">
					<ItemSet loadoutStore={this.loadoutStore} />
					<div className="side-bar">
						<div className="section">
							<div className="headline">
								Summary
							</div>
							<StatSummary loadoutStore={this.loadoutStore} />
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
