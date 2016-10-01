"use strict";

import React, {Component} from "react";
import Runes from "../database/runes.jsx";
import Overlay from "../overlay.jsx";
import RuneSelector from "./rune-selector.jsx";
import Rune from "./rune.jsx";

export default class RuneSlot extends Component {
	constructor(props) {
		super(props);

		this.removeRune = this.removeRune.bind(this);
		this.selectRune = this.selectRune.bind(this);
		this.showRuneSelector = this.showRuneSelector.bind(this);
		this.removeSlot = this.removeSlot.bind(this);
	}

	removeRune(ev) {
		if (ev) ev.preventDefault();

		if (this.props.onChangeRune)
			this.props.onChangeRune(null);

		return false;
	}

	selectRune(runeID) {
		Overlay.hide();

		if (this.props.onChangeRune)
			this.props.onChangeRune(runeID);
	}

	showRuneSelector() {
		Overlay.show(<RuneSelector onSelect={this.selectRune} />);
	}

	removeSlot(ev) {
		if (ev) ev.preventDefault();

		if (this.props.onRemoveSlot)
			this.props.onRemoveSlot();

		return false;
	}

	render() {
		if (this.props.runeID != null && this.props.runeID in Runes) {
			return (
				<div onContextMenu={this.removeRune} onClick={this.showRuneSelector}>
					<Rune runeID={this.props.runeID} />
				</div>
			);
		} else {
			return (
				<div className="rune" onClick={this.showRuneSelector} onContextMenu={this.removeSlot}>
					<div className="symbol"></div>
					<div className="description">
						<div className="hint">
							Left-click to select a rune
						</div>
						<div className="hint">
							Right-click to remove the slot
						</div>
					</div>
				</div>
			);
		}
	}
}
