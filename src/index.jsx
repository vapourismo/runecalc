"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom"
import update from "react-addons-update";
import RuneSlot from "./components/rune-slot.jsx";
import LoadoutSummary from "./components/loadout-summary.jsx";


class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			runes: [null, null, null]
		};
	}

	updateRune(slot, runeID) {
		const obj = {};
		obj[slot] = {$set: runeID};

		this.setState({
			runes: update(this.state.runes, obj)
		});
	}

	render() {
		return (
			<div className="slot">
				<div className="headline">Head</div>
				<div className="body">
					<div className="runes">
						{this.state.runes.map((runeID, slot) => (
							<RuneSlot
								key={slot}
								runeID={runeID}
								onChangeRune={newRuneID => this.updateRune(slot, newRuneID)} />
						))}
					</div>
					<LoadoutSummary
						runes={this.state.runes} />
				</div>
			</div>
		);
	}
}

window.addEventListener("load", function () {
	ReactDOM.render(<Item />, document.getElementById("canvas"));
});
