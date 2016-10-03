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
import ItemSet from "./components/item-set.jsx";
import SaveLoadoutDialog from "./components/save-loadout-dialog.jsx";
import LoadLoadoutDialog from "./components/load-loadout-dialog.jsx";

// function copyLoadout(loadout) {
// 	return {
// 		weapon: loadout.weapon.map(x => x),
// 		head: loadout.head.map(x => x),
// 		shoulders: loadout.shoulders.map(x => x),
// 		chest: loadout.chest.map(x => x),
// 		hands: loadout.hands.map(x => x),
// 		legs: loadout.legs.map(x => x),
// 		feet: loadout.feet.map(x => x)
// 	};
// }

// function modPowerConverter(stats) {
// 	if ("Crit-Hit Severity Rating" in stats) {
// 		Stats.insertOrAdd(
// 			stats,
// 			"Multi-Hit Severity Rating",
// 			stats["Crit-Hit Severity Rating"] /= 2
// 		);
// 	}
// }

class Root extends Component {
	constructor(props) {
		super(props);

		this.state = {
			weapon: [null, null, null],
			head: [null, null, null],
			shoulders: [null, null, null],
			chest: [null, null, null],
			hands: [null, null, null],
			legs: [null, null, null],
			feet: [null, null, null],

			powerConverter: false
		};

		this.changeLoadout = this.changeLoadout.bind(this);
		this.resetLoadout = this.resetLoadout.bind(this);
		this.showSaveDialog = this.showSaveDialog.bind(this);
		this.hideSaveDialog = this.hideSaveDialog.bind(this);
		this.showLoadDialog = this.showLoadDialog.bind(this);
		this.loadLoadout = this.loadLoadout.bind(this);
	}

	resetLoadout() {
		this.setState({
			weapon: this.state.weapon.map(_ => null),
			head: this.state.head.map(_ => null),
			shoulders: this.state.shoulders.map(_ => null),
			chest: this.state.chest.map(_ => null),
			hands: this.state.hands.map(_ => null),
			legs: this.state.legs.map(_ => null),
			feet: this.state.feet.map(_ => null)
		});
	}

	showSaveDialog() {
		Overlay.show(<SaveLoadoutDialog loadout={this.state} onSave={this.hideSaveDialog} />);
	}

	hideSaveDialog() {
		Overlay.hide();
	}

	showLoadDialog() {
		Overlay.show(<LoadLoadoutDialog onLoad={this.loadLoadout} />);
	}

	loadLoadout(loadout) {
		Overlay.hide();
		this.setState(loadout);
	}

	changeLoadout(item, runes) {
		switch (item) {
			case "weapon":
				this.setState({weapon: runes});
				break;

			case "head":
				this.setState({head: runes});
				break;

			case "shoulders":
				this.setState({shoulders: runes});
				break;

			case "chest":
				this.setState({chest: runes});
				break;

			case "hands":
				this.setState({hands: runes});
				break;

			case "legs":
				this.setState({legs: runes});
				break;

			case "feet":
				this.setState({feet: runes});
				break;
		}
	}

	render() {
		let allStats = Stats.mergeStats([
			Stats.gatherStats(this.state.weapon),
			Stats.gatherStats(this.state.head),
			Stats.gatherStats(this.state.shoulders),
			Stats.gatherStats(this.state.chest),
			Stats.gatherStats(this.state.hands),
			Stats.gatherStats(this.state.legs),
			Stats.gatherStats(this.state.feet),
		]);

		// if (this.state.powerConverter)
		// 	modPowerConverter(allStats);

		allStats = Stats.transformStats(allStats);

		return (
			<div>
				<Toolbar
					onReset={this.resetLoadout}
					onLoad={this.showLoadDialog}
					onSave={this.showSaveDialog} />
				<div className="contents">
					<ItemSet
						items={{
							weapon: this.state.weapon,
							head: this.state.head,
							shoulders: this.state.shoulders,
							chest: this.state.chest,
							hands: this.state.hands,
							legs: this.state.legs,
							feet: this.state.feet
						}}
						onChangeLoadout={this.changeLoadout} />
					<div className="side-bar">
						<div className="section">
							<div className="headline">
								Summary
							</div>
							<StatDisplay stats={allStats} />
						</div>
						<div className="section">
							<div className="headline">
								Options
							</div>
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
