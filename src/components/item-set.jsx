/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Item from "./item.jsx";
import AppStore from "../app-store.jsx";
import Runes from "../database/runes.jsx";

export default class ItemSet extends Component {
	constructor(props) {
		super(props);

		this.runeSelector = this.runeSelector.bind(this);
	}

	runeSelector(item, newRuneID, oldRuneID) {
		const loadoutState = AppStore.getState().items;

		if (!(newRuneID in Runes && item in loadoutState))
			return false;

		const itemState = loadoutState[item];
		const rune = Runes[newRuneID];

		if (rune.items && rune.items.indexOf(item) < 0)
			return false;

		if (newRuneID == oldRuneID || (!rune.unique && !rune.uniquePerItem))
			return true;

		if ((rune.uniquePerItem || rune.unique) && itemState.indexOf(newRuneID) >= 0)
			return false;

		if (rune.unique) {
			for (let i in loadoutState) {
				if (loadoutState[i].indexOf(newRuneID) >= 0)
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
					selector={this.runeSelector} />
				<Item
					item="head"
					selector={this.runeSelector} />
				<Item
					item="shoulders"
					selector={this.runeSelector} />
				<Item
					item="chest"
					selector={this.runeSelector} />
				<Item
					item="hands"
					selector={this.runeSelector} />
				<Item
					item="legs"
					selector={this.runeSelector} />
				<Item
					item="feet"
					selector={this.runeSelector} />
			</div>
		);
	}
}
