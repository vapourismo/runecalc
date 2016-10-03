/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Item from "./item.jsx";
import Runes from "../database/runes.jsx";

export default class ItemSet extends Component {
	constructor(props) {
		super(props);

		this.updateRunes = this.updateRunes.bind(this);
		this.runeSelector = this.runeSelector.bind(this);
	}

	updateRunes(item, runes) {
		if (this.props.onChangeLoadout)
			this.props.onChangeLoadout(item, runes);
	}

	runeSelector(item, newRuneID, oldRuneID) {
		const loadoutState = this.props.loadoutStore.getState();

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
					loadoutStore={this.props.loadoutStore}
					selector={this.runeSelector} />
				<Item
					item="head"
					loadoutStore={this.props.loadoutStore}
					selector={this.runeSelector} />
				<Item
					item="shoulders"
					loadoutStore={this.props.loadoutStore}
					selector={this.runeSelector} />
				<Item
					item="chest"
					loadoutStore={this.props.loadoutStore}
					selector={this.runeSelector} />
				<Item
					item="hands"
					loadoutStore={this.props.loadoutStore}
					selector={this.runeSelector} />
				<Item
					item="legs"
					loadoutStore={this.props.loadoutStore}
					selector={this.runeSelector} />
				<Item
					item="feet"
					loadoutStore={this.props.loadoutStore}
					selector={this.runeSelector} />
			</div>
		);
	}
}
