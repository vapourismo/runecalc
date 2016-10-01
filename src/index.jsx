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
			this.props.onChangeRunes(runes);
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
		return (
			<div className="item">
				<div className="headline">{this.props.title}</div>
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
					title="Weapon"
					runes={this.props.loadout.weapon}
					onChangeRunes={newRunes => this.updateRunes("weapon", newRunes)} />
				<Item
					title="Head"
					runes={this.props.loadout.head}
					onChangeRunes={newRunes => this.updateRunes("head", newRunes)} />
				<Item
					title="Shoulders"
					runes={this.props.loadout.shoulders}
					onChangeRunes={newRunes => this.updateRunes("shoulders", newRunes)} />
				<Item
					title="Chest"
					runes={this.props.loadout.chest}
					onChangeRunes={newRunes => this.updateRunes("chest", newRunes)} />
				<Item
					title="Feet"
					runes={this.props.loadout.hands}
					onChangeRunes={newRunes => this.updateRunes("hands", newRunes)} />
				<Item
					title="Legs"
					runes={this.props.loadout.legs}
					onChangeRunes={newRunes => this.updateRunes("legs", newRunes)} />
				<Item
					title="Feet"
					runes={this.props.loadout.feet}
					onChangeRunes={newRunes => this.updateRunes("feet", newRunes)} />
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
