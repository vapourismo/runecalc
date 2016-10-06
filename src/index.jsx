/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";

import AppStore from "./app-store.jsx";
import Items from "./database/items.jsx";

import StatTable from "./components/stats-table.jsx";
import Option from "./components/option.jsx";
import Toolbar from "./components/toolbar.jsx";
import Stats from "./database/stats.jsx";
import ItemSet from "./components/item-set.jsx";
import SaveLoadoutDialog from "./components/save-loadout-dialog.jsx";
import LoadLoadoutDialog from "./components/load-loadout-dialog.jsx";

class StatSummary extends Component {
	constructor(props) {
		super(props);

		this.state = {
			runes: [],
			items: []
		};
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribe(
			() => {
				const loadoutState = AppStore.getState().loadout;
				const runes = [];
				const items = [];

				for (let itemSlot in loadoutState) {
					let item = loadoutState[itemSlot];

					if (item.item)
						items.push(item.item);

					if (item.runes)
						runes.push(item.runes);
				}

				this.setState({items, runes});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	render() {
		const ratings = {};
		const bonuses = {};
		const multipliers = {};

		this.state.items.forEach(itemID => {
			if (itemID in Items)
				Stats.merge(ratings, Items[itemID].ratings);
		});

		this.state.runes.forEach(runes => {
			const info = Stats.analyzeItem(runes);

			Stats.merge(ratings, info.ratings);
			Stats.merge(bonuses, info.bonuses);
			Stats.mergeMultipliers(multipliers, info.multipliers);
		});

		const stats = Stats.translateRatingsToStats(ratings);
		Stats.fillDefaultStats(stats);
		Stats.applyStatBonuses(stats, bonuses);
		Stats.applyStatMultipliers(stats, multipliers);

		return <StatTable stats={stats} />;
	}
}

class ClassFilter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			klass: AppStore.getState().filters.klass
		};
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribeTo(
			["filters", "klass"],
			klass => {
				this.setState({klass});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	toggleClass(klass, enabled) {
		if (enabled) {
			AppStore.dispatch({type: "change_class_filter", klass});
		} else if (this.state.klass === klass) {
			AppStore.dispatch({type: "change_class_filter", klass: null});
		}
	}

	render() {
		return (
			<div className="section">
				<div className="headline">Class</div>
				<Option
					state={this.state.klass === "Engineer"}
					onToggle={n => this.toggleClass("Engineer", n)}
				>
					Engineer
				</Option>
				<Option
					state={this.state.klass === "Esper"}
					onToggle={n => this.toggleClass("Esper", n)}
				>
					Esper
				</Option>
				<Option
					state={this.state.klass === "Medic"}
					onToggle={n => this.toggleClass("Medic", n)}
				>
					Medic
				</Option>
				<Option
					state={this.state.klass === "Spellslinger"}
					onToggle={n => this.toggleClass("Spellslinger", n)}
				>
					Spellslinger
				</Option>
				<Option
					state={this.state.klass === "Stalker"}
					onToggle={n => this.toggleClass("Stalker", n)}
				>
					Stalker
				</Option>
				<Option
					state={this.state.klass === "Warrior"}
					onToggle={n => this.toggleClass("Warrior", n)}
				>
					Warrior
				</Option>
			</div>
		);
	}
}

class Root extends Component {
	render() {
		return (
			<div className="root">
				<div id="root-left" className="left">
					<div id="root-left-inner"></div>
					<ItemSet />
				</div>
				<div id="root-right" className="right">
					<div id="root-right-inner"></div>
					<ClassFilter />
					<StatSummary />
				</div>
			</div>
		);
	}
}

function adjustRootSides() {
	const left = document.getElementById("root-left");
	const leftInner = document.getElementById("root-left-inner");

	if (left.offsetWidth > leftInner.offsetWidth)
		left.style.marginRight = (leftInner.offsetWidth - left.offsetWidth) + "px";

	const right = document.getElementById("root-right");
	const rightInner = document.getElementById("root-right-inner");

	if (right.offsetWidth > rightInner.offsetWidth)
		right.style.marginRight = (rightInner.offsetWidth - right.offsetWidth) + "px";
}

window.addEventListener("load", function () {
	ReactDOM.render(<Toolbar />, document.getElementById("toolbar"));
	ReactDOM.render(<Root />, document.getElementById("canvas"));

	adjustRootSides();
});
