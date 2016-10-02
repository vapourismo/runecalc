/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";
import RuneSlot from "./rune-slot.jsx";
import StatDisplay from "./stat-display.jsx";
import Item from "./item.jsx";
import Toolbar from "./toolbar.jsx";
import Runes from "../database/runes.jsx";
import Stats from "../database/stats.jsx";
import Overlay from "../utilities/overlay.jsx";
import Storage from "../utilities/storage.jsx";

export default class ItemSet extends Component {
	constructor(props) {
		super(props);

		this.updateRunes = this.updateRunes.bind(this);
		this.runeSelector = this.runeSelector.bind(this);
	}

	updateRunes(item, runes) {
		const loadout = {};

		for (let key in this.props.loadout)
			loadout[key] = this.props.loadout[key];

		loadout[item] = runes;

		if (this.props.onChangeLoadout)
			this.props.onChangeLoadout(loadout);
	}

	runeSelector(item, newRuneID, oldRuneID) {
		if (!(newRuneID in Runes))
			return false;

		const rune = Runes[newRuneID];

		if (rune.items && rune.items.indexOf(item) < 0)
			return false;

		if (newRuneID == oldRuneID || (!rune.unique && !rune.uniquePerItem))
			return true;

		if ((rune.uniquePerItem || rune.unique) && this.props.loadout[item].indexOf(newRuneID) >= 0)
			return false;

		if (rune.unique) {
			for (let i in this.props.loadout) {
				if (this.props.loadout[i].indexOf(newRuneID) >= 0)
					return false;
			}
		}

		return true;
	}

	render() {
		return (
			<div className="item-set">
				<Item
					item="weapon"
					runes={this.props.loadout.weapon}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="head"
					runes={this.props.loadout.head}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="shoulders"
					runes={this.props.loadout.shoulders}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="chest"
					runes={this.props.loadout.chest}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="hands"
					runes={this.props.loadout.hands}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="legs"
					runes={this.props.loadout.legs}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="feet"
					runes={this.props.loadout.feet}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
			</div>
		);
	}
}
