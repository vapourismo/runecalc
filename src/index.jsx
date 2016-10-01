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
			<div className="item">
				<div className="headline">{this.props.title}</div>
				<div className="body">
					<div className="runes">
						{this.state.runes.map((runeID, slot) => (
							<RuneSlot
								key={slot}
								runeID={runeID}
								onChangeRune={newRuneID => this.updateRune(slot, newRuneID)} />
						))}
					</div>
					<LoadoutSummary runes={this.state.runes} />
				</div>
			</div>
		);
	}
}

class ItemSet extends Component {
	render() {
		return (
			<div className="item-set">
				<Item title="Weapon" />
				<Item title="Head" />
				<Item title="Shoulders" />
				<Item title="Chest" />
				<Item title="Hands" />
				<Item title="Legs" />
				<Item title="Feet" />
			</div>
		);
	}
}

class StatOverview extends Component {
	render() {
		return <div className="stat-overview"></div>;
	}
}

class Root extends Component {
	render() {
		return (
			<div className="root">
				<ItemSet />
				<StatOverview />
			</div>
		);
	}
}

window.addEventListener("load", function () {
	ReactDOM.render(<Root />, document.getElementById("canvas"));
});
