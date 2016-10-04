/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import RuneSlot from "./rune-slot.jsx";
import StatDisplay from "./stat-display.jsx";

export default class Item extends Component {
	constructor(props) {
		super(props);

		const loadoutState = props.loadoutStore.getState().items;

		this.state = {
			runes: loadoutState[props.item] || [null]
		};

		this.addRuneSlot = this.addRuneSlot.bind(this);
		this.runeSelector = this.runeSelector.bind(this);
	}

	componentDidMount() {
		this.storeLease = this.props.loadoutStore.subscribe(
			() => {
				const loadoutState = this.props.loadoutStore.getState().items;

				this.setState({
					runes: loadoutState[this.props.item] || [null]
				});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	signalChange(runes) {
		this.props.loadoutStore.dispatch({
			type: "modify_item",
			item: this.props.item,
			runes
		});
	}

	addRuneSlot() {
		this.signalChange(this.state.runes.concat([null]));
	}

	updateRuneSlot(slot, runeID) {
		if (slot >= this.state.runes.length)
			return;

		this.signalChange(Object.assign([], this.state.runes, {[slot]: runeID}));
	}

	removeRuneSlot(slot) {
		if (slot >= this.state.runes.length)
			return;

		const runes = Object.assign([], this.state.runes);
		runes.splice(slot, 1);

		this.signalChange(runes);
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
						{
							this.state.runes.map(
								(runeID, slot) => (
									<RuneSlot
										key={slot}
										runeID={runeID}
										selector={this.runeSelector}
										onChangeRune={(newRuneID) => this.updateRuneSlot(slot, newRuneID)}
										onRemoveSlot={() => this.removeRuneSlot(slot)} />
								)
							)
						}
						<div className="add" onClick={this.addRuneSlot}>+</div>
					</div>
					<StatDisplay runes={this.state.runes} />
				</div>
			</div>
		);
	}
}
