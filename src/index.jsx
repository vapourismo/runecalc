/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom"
import RuneSlot from "./components/rune-slot.jsx";
import StatDisplay from "./components/stat-display.jsx";
import Stats from "./database/stats.jsx";

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

class Root extends Component {
	constructor(props) {
		super(props);

		const savedLoadout = JSON.parse(localStorage.getItem("loadout"));

		if (
			savedLoadout
			&& savedLoadout.version == Version
			&& savedLoadout.loadout instanceof Object
			&& savedLoadout.loadout.weapon instanceof Array
			&& savedLoadout.loadout.head instanceof Array
			&& savedLoadout.loadout.shoulders instanceof Array
			&& savedLoadout.loadout.chest instanceof Array
			&& savedLoadout.loadout.hands instanceof Array
			&& savedLoadout.loadout.legs instanceof Array
			&& savedLoadout.loadout.feet instanceof Array
		) {
			this.state = {
				weapon: savedLoadout.loadout.weapon,
				head: savedLoadout.loadout.head,
				shoulders: savedLoadout.loadout.shoulders,
				chest: savedLoadout.loadout.chest,
				hands: savedLoadout.loadout.hands,
				legs: savedLoadout.loadout.legs,
				feet: savedLoadout.loadout.feet
			};
		} else {
			this.state = {
				weapon: [null, null, null],
				head: [null, null, null],
				shoulders: [null, null, null],
				chest: [null, null, null],
				hands: [null, null, null],
				legs: [null, null, null],
				feet: [null, null, null]
			};
		}

		this.changeLoadout = this.changeLoadout.bind(this);
	}

	changeLoadout(loadout) {
		this.setState(loadout);

		localStorage.setItem("loadout", JSON.stringify({
			version: Version,
			loadout
		}));
	}

	render() {
		const allStats = Stats.mergeStats(Object.values(this.state).map(Stats.gatherStats));

		return (
			<div className="root">
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
