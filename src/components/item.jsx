/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";
import RuneSlot from "./rune-slot.jsx";
import StatDisplay from "./stat-display.jsx";
import Toolbar from "./toolbar.jsx";
import Runes from "../database/runes.jsx";
import Stats from "../database/stats.jsx";
import Overlay from "../utilities/overlay.jsx";
import Storage from "../utilities/storage.jsx";

export default class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			runes: [null]
		};

		this.addRuneSlot = this.addRuneSlot.bind(this);
		this.runeSelector = this.runeSelector.bind(this);
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

	runeSelector(newRuneID, oldRuneID) {
		return this.props.selector(this.props.item, newRuneID, oldRuneID);
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
								selector={this.runeSelector}
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
