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
		if (!(newRuneID in Runes))
			return false;

		const rune = Runes[newRuneID];

		if (rune.items && rune.items.indexOf(item) < 0)
			return false;

		if (newRuneID == oldRuneID || (!rune.unique && !rune.uniquePerItem))
			return true;

		if ((rune.uniquePerItem || rune.unique) && this.props.items[item].indexOf(newRuneID) >= 0)
			return false;

		if (rune.unique) {
			for (let i in this.props.items) {
				if (this.props.items[i].indexOf(newRuneID) >= 0)
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
					runes={this.props.items.weapon}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="head"
					runes={this.props.items.head}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="shoulders"
					runes={this.props.items.shoulders}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="chest"
					runes={this.props.items.chest}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="hands"
					runes={this.props.items.hands}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="legs"
					runes={this.props.items.legs}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
				<Item
					item="feet"
					runes={this.props.items.feet}
					selector={this.runeSelector}
					onChangeRunes={this.updateRunes} />
			</div>
		);
	}
}
