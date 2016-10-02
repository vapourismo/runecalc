/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Runes from "../database/runes.jsx";
import BackStack from "../utilities/back-stack.jsx";
import Rune from "./rune.jsx";

function orderRune(aID, bID) {
	const runeA = Runes[aID];
	const runeB = Runes[bID];

	if (runeA.power != runeB.power)
		return runeA.power < runeB.power ? 1 : -1;

	if (runeA.type != runeB.type)
		return runeA.type < runeB.type ? 1 : -1;

	if (runeA.statName != runeB.statName)
		return runeA.statName < runeB.statName ? 1 : -1;

	if (runeA.statValue != runeB.statValue)
		return runeA.statValue < runeB.statValue ? 1 : -1;

	return 0;
}

export default class RuneSelector extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSet: null
		};

		this.gotoSetList = this.gotoSetList.bind(this);
	}

	gotoSetList() {
		this.setState({
			selectedSet: null
		});
	}

	selectSet(name) {
		this.setState({
			selectedSet: name
		});

		BackStack.push(this.gotoSetList);
	}

	selectRune(runeID) {
		if (this.props.onSelect)
			this.props.onSelect(runeID);
	}

	componentWillUnmount() {
		BackStack.remove(this.gotoSetList);
	}

	renderRuneButton(runeID) {
		return (
			<div key={runeID} onClick={() => this.selectRune(runeID)}>
				<Rune runeID={runeID} />
			</div>
		);
	}

	renderRuneSetButton(setName) {
		return (
			<div key={setName} className="set" onClick={() => this.selectSet(setName)}>
				{setName}
			</div>
		);
	}

	render() {
		const selector = this.props.selector || (runeID => runeID in Runes);

		if (this.state.selectedSet && this.state.selectedSet in Runes.sets) {
			const availableRunes = (
				Runes.sets[this.state.selectedSet].runes.filter(selector).sort(orderRune)
			);

			return (
				<div className="rune-selector">
					<div className="headline">Select a rune</div>
					<div className="body">
						{availableRunes.map(this.renderRuneButton, this)}
					</div>
				</div>
			);
		} else {
			const availableSets = (
				Object.keys(Runes.sets).filter(
					setName => Runes.sets[setName].runes.some(selector)
				).sort()
			);

			return (
				<div className="rune-selector">
					<div className="headline">Select a rune set</div>
					<div className="body">
						{availableSets.map(this.renderRuneSetButton, this)}
					</div>
				</div>
			);
		}
	}
}
