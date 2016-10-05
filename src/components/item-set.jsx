/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ItemSlot from "./item-slot.jsx";
import AccessorySlot from "./accessory-slot.jsx";
import AppStore from "../app-store.jsx";
import Runes from "../database/runes.jsx";

export default class ItemSet extends Component {
	constructor(props) {
		super(props);

		this.runeSelector = this.runeSelector.bind(this);
	}

	runeSelector(itemSlot, newRuneID, oldRuneID) {
		const loadoutState = AppStore.getState().loadout;

		if (!(newRuneID in Runes && itemSlot in loadoutState))
			return false;

		const rune = Runes[newRuneID];

		if (rune.slots && rune.slots.indexOf(itemSlot) < 0)
			return false;

		if (newRuneID == oldRuneID || (!rune.unique && !rune.uniquePerItem))
			return true;

		const itemRunes = loadoutState[itemSlot].runes;

		if ((rune.uniquePerItem || rune.unique) && itemRunes.indexOf(newRuneID) >= 0)
			return false;

		if (rune.unique) {
			for (let i in loadoutState) {
				let item = loadoutState[i];

				if (item.runes && item.runes.indexOf(newRuneID) >= 0)
					return false;
			}
		}

		return true;
	}

	render() {
		return (
			<div className="item-set">
				<ItemSlot
					itemSlot="weapon"
					selector={this.runeSelector} />
				<AccessorySlot
					itemSlot="shield"
					selector={this.runeSelector} />
				<ItemSlot
					itemSlot="head"
					selector={this.runeSelector} />
				<ItemSlot
					itemSlot="shoulders"
					selector={this.runeSelector} />
				<ItemSlot
					itemSlot="chest"
					selector={this.runeSelector} />
				<ItemSlot
					itemSlot="hands"
					selector={this.runeSelector} />
				<ItemSlot
					itemSlot="legs"
					selector={this.runeSelector} />
				<ItemSlot
					itemSlot="feet"
					selector={this.runeSelector} />
			</div>
		);
	}
}
