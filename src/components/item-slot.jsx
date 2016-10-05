/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import RuneSlot from "./rune-slot.jsx";
import StatDisplay from "./stat-display.jsx";
import AppStore from "../app-store.jsx";

export default class ItemSlot extends Component {
	constructor(props) {
		super(props);

		const loadoutState = AppStore.getState().loadout;

		this.state = {
			runes: loadoutState[props.itemSlot].runes || [null]
		};

		this.addRuneSlot = this.addRuneSlot.bind(this);
		this.runeSelector = this.runeSelector.bind(this);
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribe(
			() => {
				const loadoutState = AppStore.getState().loadout;

				this.setState({
					runes: loadoutState[this.props.itemSlot].runes || [null]
				});
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

	render() {
		const title = this.props.itemSlot[0].toUpperCase() + this.props.itemSlot.substring(1);

		return (
			<div className="item">
				<div className="headline">{title}</div>
				<div className="body">
					<div className="runes">
						{
							this.state.runes.map(
								(runeID, runeSlot) => (
									<RuneSlot
										key={runeSlot}
										runeID={runeID}
										selector={this.runeSelector}
										onChangeRune={(newRuneID) => this.updateRuneSlot(runeSlot, newRuneID)}
										onRemoveSlot={() => this.removeRuneSlot(runeSlot)} />
								)
							)
						}
						<div className="add" onClick={this.addRuneSlot}>+</div>
					</div>
				</div>
			</div>
		);
	}
}
