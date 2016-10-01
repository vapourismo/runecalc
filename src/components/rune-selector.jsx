/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Runes from "../database/runes.jsx";
import BackStack from "../utilities/back-stack.jsx";
import Rune from "./rune.jsx";

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

	render() {
		if (this.state.selectedSet && this.state.selectedSet in Runes.sets) {
			const availableRunes = Runes.sets[this.state.selectedSet].runes.map(
				runeID => (
					<div key={runeID} onClick={() => this.selectRune(runeID)}>
						<Rune runeID={runeID} />
					</div>
				)
			);

			return (
				<div className="rune-selector">
					<div className="headline">Select a rune</div>
					<div className="body">
						{availableRunes}
					</div>
				</div>
			);
		} else {
			const availableSets = Object.keys(Runes.sets).map(
				setName => (
					<div key={setName} className="set" onClick={() => this.selectSet(setName)}>
						{setName}
					</div>
				)
			);

			return (
				<div className="rune-selector">
					<div className="headline">Select a rune set</div>
					<div className="body">
						{availableSets}
					</div>
				</div>
			);
		}
	}
}
