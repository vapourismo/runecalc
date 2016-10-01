"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom"
import RuneSlot from "./components/rune-slot.jsx";
import StatDisplay from "./components/stat-display.jsx";

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
	}

	updateRunes(item, runes) {
		this.state[item] = runes;
		this.forceUpdate();
	}

	render() {
		return (
			<div className="item-set">
				<Item
					title="Weapon"
					runes={this.state.weapon}
					onChangeRunes={newRunes => this.updateRunes("weapon", newRunes)} />
				<Item
					title="Head"
					runes={this.state.head}
					onChangeRunes={newRunes => this.updateRunes("head", newRunes)} />
				<Item
					title="Shoulders"
					runes={this.state.shoulders}
					onChangeRunes={newRunes => this.updateRunes("shoulders", newRunes)} />
				<Item
					title="Chest"
					runes={this.state.chest}
					onChangeRunes={newRunes => this.updateRunes("chest", newRunes)} />
				<Item
					title="Hands"
					runes={this.state.hands}
					onChangeRunes={newRunes => this.updateRunes("hands", newRunes)} />
				<Item
					title="Legs"
					runes={this.state.legs}
					onChangeRunes={newRunes => this.updateRunes("legs", newRunes)} />
				<Item
					title="Feet"
					runes={this.state.feet}
					onChangeRunes={newRunes => this.updateRunes("feet", newRunes)} />
			</div>
		);
	}
}

class Root extends Component {
	render() {
		return (
			<div className="root">
				<ItemSet />
				<div className="stat-overview">
					<div className="headline">
						Summary
					</div>
					<StatDisplay stats={{"Awesomeness": "100%"}} />
				</div>
			</div>
		);
	}
}

window.addEventListener("load", function () {
	ReactDOM.render(<Root />, document.getElementById("canvas"));
});
