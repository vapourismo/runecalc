/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Item from "./item.jsx";
import RuneSlot from "./rune-slot.jsx";
import AppStore from "../app-store.jsx";

export default class ItemSlot extends Component {
	constructor(props) {
		super(props);

		const loadoutState = AppStore.getState().loadout;

		this.state = {
			runes: loadoutState[props.itemSlot].runes
		};

		this.addRuneSlot = this.addRuneSlot.bind(this);
		this.runeSelector = this.runeSelector.bind(this);
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribeTo(
			["loadout", this.props.itemSlot, "runes"],
			runes => {
				this.setState({runes});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	signalChange(runes) {
		AppStore.dispatch({
			type: "modify_item_runes",
			itemSlot: this.props.itemSlot,
			runes
		});
	}

	addRuneSlot() {
		this.signalChange(this.state.runes.concat([null]));
	}

	updateRuneSlot(runeSlot, runeID) {
		if (runeSlot >= this.state.runes.length)
			return;

		this.signalChange(Object.assign([], this.state.runes, {[runeSlot]: runeID}));
	}

	removeRuneSlot(runeSlot) {
		if (runeSlot >= this.state.runes.length)
			return;

		const runes = Object.assign([], this.state.runes);
		runes.splice(runeSlot, 1);

		this.signalChange(runes);
	}

	runeSelector(newRuneID, oldRuneID) {
		return this.props.selector(this.props.itemSlot, newRuneID, oldRuneID);
	}

	renderSlot(runeID, runeSlot) {
		return (
			<RuneSlot
				key={runeSlot}
				runeID={runeID}
				selector={this.runeSelector}
				onChangeRune={(newRuneID) => this.updateRuneSlot(runeSlot, newRuneID)}
				onRemoveSlot={() => this.removeRuneSlot(runeSlot)} />
		);
	}

	render() {
		return (
			<div className="item-slot">
				<div className="headline">{this.props.itemSlot}</div>
				<Item itemSlot={this.props.itemSlot} />
				{this.state.runes.map(this.renderSlot, this)}
				<div className="add" onClick={this.addRuneSlot}>+</div>
			</div>
		);
	}
}
