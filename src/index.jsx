/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom"
import RuneSlot from "./components/rune-slot.jsx";
import StatDisplay from "./components/stat-display.jsx";
import Toolbar from "./components/toolbar.jsx";
import Stats from "./database/stats.jsx";
import Overlay from "./overlay.jsx";

const Version = 0;

class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			runes: [null]
		};

		this.addRuneSlot = this.addRuneSlot.bind(this);
	}

	signalChangedRunes(runes) {
		if (this.props.onChangeRunes)
			this.props.onChangeRunes(this.props.item, runes);
	}

	updateRuneSlot(slot, runeID) {
		const runes = this.props.runes.map(x => x);
		runes[slot] = runeID;

		this.signalChangedRunes(runes);
	}

	removeRuneSlot(slot) {
		if (slot >= this.props.runes.length)
			return;

		const runes = this.props.runes.map(x => x);
		runes.splice(slot, 1);

		this.signalChangedRunes(runes);
	}

	addRuneSlot() {
		this.signalChangedRunes(this.props.runes.concat([null]));
	}

	render() {
		const title = this.props.item[0].toUpperCase() + this.props.item.substring(1);

		return (
			<div className="item">
				<div className="headline">{title}</div>
				<div className="body">
					<div className="runes">
						{this.props.runes.map((runeID, slot) => (
							<RuneSlot
								key={slot}
								runeID={runeID}
								onChangeRune={newRuneID => this.updateRuneSlot(slot, newRuneID)}
								onRemoveSlot={() => this.removeRuneSlot(slot)} />
						))}
						<div className="add" onClick={this.addRuneSlot}>+</div>
					</div>
					<StatDisplay runes={this.props.runes} />
				</div>
			</div>
		);
	}
}

class ItemSet extends Component {
	constructor(props) {
		super(props);

		this.updateRunes = this.updateRunes.bind(this);
	}

	updateRunes(item, runes) {
		const loadout = {};

		for (let key in this.props.loadout)
			loadout[key] = this.props.loadout[key];

		loadout[item] = runes;

		if (this.props.onChangeLoadout)
			this.props.onChangeLoadout(loadout);
	}

	render() {
		return (
			<div className="item-set">
				<Item
					item="weapon"
					runes={this.props.loadout.weapon}
					onChangeRunes={this.updateRunes} />
				<Item
					item="head"
					runes={this.props.loadout.head}
					onChangeRunes={this.updateRunes} />
				<Item
					item="shoulders"
					runes={this.props.loadout.shoulders}
					onChangeRunes={this.updateRunes} />
				<Item
					item="chest"
					runes={this.props.loadout.chest}
					onChangeRunes={this.updateRunes} />
				<Item
					item="hands"
					runes={this.props.loadout.hands}
					onChangeRunes={this.updateRunes} />
				<Item
					item="legs"
					runes={this.props.loadout.legs}
					onChangeRunes={this.updateRunes} />
				<Item
					item="feet"
					runes={this.props.loadout.feet}
					onChangeRunes={this.updateRunes} />
			</div>
		);
	}
}

class SaveLoadoutDialog extends Component {
	render() {
		return (
			<div>Hello</div>
		);
	}
}

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
			feet: [null, null, null]
		};

		this.changeLoadout = this.changeLoadout.bind(this);
		this.resetLoadout = this.resetLoadout.bind(this);
		this.saveLoadout = this.saveLoadout.bind(this);
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

	saveLoadout() {
		Overlay.show(<SaveLoadoutDialog />);
	}

	changeLoadout(loadout) {
		this.setState(loadout);
	}

	render() {
		const allStats = Stats.mergeStats(Object.values(this.state).map(Stats.gatherStats));

		return (
			<div className="root">
				<Toolbar
					onReset={this.resetLoadout}
					onSave={this.saveLoadout} />
				<ItemSet loadout={this.state} onChangeLoadout={this.changeLoadout} />
				<div className="stat-overview">
					<div className="headline">
						Summary
					</div>
					<StatDisplay stats={allStats} />
				</div>
			</div>
		);
	}
}

window.addEventListener("load", function () {
	ReactDOM.render(<Root />, document.getElementById("canvas"));
});
