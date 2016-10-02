/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";
import RuneSlot from "./components/rune-slot.jsx";
import StatDisplay from "./components/stat-display.jsx";
import Toolbar from "./components/toolbar.jsx";
import Runes from "./database/runes.jsx";
import Stats from "./database/stats.jsx";
import Overlay from "./utilities/overlay.jsx";
import Storage from "./utilities/storage.jsx";
import FilterList from "./components/filter-list.jsx";
import ItemSet from "./components/item-set.jsx";
import SaveLoadoutDialog from "./components/save-loadout-dialog.jsx";
import LoadLoadoutDialog from "./components/load-loadout-dialog.jsx";

function copyLoadout(loadout) {
	return {
		weapon: loadout.weapon.map(x => x),
		head: loadout.head.map(x => x),
		shoulders: loadout.shoulders.map(x => x),
		chest: loadout.chest.map(x => x),
		hands: loadout.hands.map(x => x),
		legs: loadout.legs.map(x => x),
		feet: loadout.feet.map(x => x)
	};
}

function modPowerConverter(stats) {
	if ("Crit-Hit Severity Rating" in stats) {
		Stats.insertOrAdd(
			stats,
			"Multi-Hit Severity Rating",
			stats["Crit-Hit Severity Rating"] /= 2
		);
	}
}

class Root extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loadout: {
				weapon: [null, null, null],
				head: [null, null, null],
				shoulders: [null, null, null],
				chest: [null, null, null],
				hands: [null, null, null],
				legs: [null, null, null],
				feet: [null, null, null]
			},
			ampPowerConverter: false
		};

		this.changeLoadout = this.changeLoadout.bind(this);
		this.resetLoadout = this.resetLoadout.bind(this);
		this.showSaveDialog = this.showSaveDialog.bind(this);
		this.showLoadDialog = this.showLoadDialog.bind(this);
		this.loadLoadout = this.loadLoadout.bind(this);
		this.saveLoadout = this.saveLoadout.bind(this);
	}

	resetLoadout() {
		this.setState({
			loadout: {
				weapon: this.state.loadout.weapon.map(_ => null),
				head: this.state.loadout.head.map(_ => null),
				shoulders: this.state.loadout.shoulders.map(_ => null),
				chest: this.state.loadout.chest.map(_ => null),
				hands: this.state.loadout.hands.map(_ => null),
				legs: this.state.loadout.legs.map(_ => null),
				feet: this.state.loadout.feet.map(_ => null)
			}
		});
	}

	saveLoadout(name) {
		Overlay.hide();

		Storage.state.loadouts[name] = copyLoadout(this.state.loadout);
		Storage.save();
	}

	showSaveDialog() {
		Overlay.show(
			<SaveLoadoutDialog
				names={Object.keys(Storage.state.loadouts)}
				onSave={this.saveLoadout} />
		);
	}

	loadLoadout(name) {
		Overlay.hide();
		this.setState({loadout: copyLoadout(Storage.state.loadouts[name])});
	}

	showLoadDialog() {
		Overlay.show(
			<LoadLoadoutDialog
				names={Object.keys(Storage.state.loadouts)}
				onLoad={this.loadLoadout} />
		);
	}

	changeLoadout(loadout) {
		this.setState({loadout});
	}

	render() {
		let allStats = Stats.mergeStats(Object.values(this.state.loadout).map(Stats.gatherStats));

		if (this.state.ampPowerConverter)
			modPowerConverter(allStats);

		allStats = Stats.transformStats(allStats);

		return (
			<div>
				<Toolbar
					onReset={this.resetLoadout}
					onLoad={this.showLoadDialog}
					onSave={this.showSaveDialog} />
				<div className="contents">
					<ItemSet loadout={this.state.loadout} onChangeLoadout={this.changeLoadout} />
					<div className="side-bar">
						<div className="section">
							<div className="headline">
								Summary
							</div>
							<StatDisplay stats={allStats} />
						</div>
						<div className="section">
							<div className="headline">
								Filters
							</div>
							<FilterList />
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
