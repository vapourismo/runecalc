/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import RatingsTable from "./ratings-table.jsx";
import Option from "./option.jsx";
import AppStore from "../app-store.jsx";
import Items from "../database/items.jsx";
import Overlay from "../utilities/overlay.jsx";

function itemMatchesType(item, itemType) {
	if (!itemType)
		return true;

	return item.type === itemType;
}

function itemMatchesClass(item, itemClass) {
	if (!itemClass)
		return true;

	if (item.klass == null)
		switch (itemClass) {
			case "Spellslinger":
				return item.type === "Light" || item.type === "Pistols";

			case "Esper":
				return item.type === "Light" || item.type === "Psyblade";

			case "Medic":
				return item.type === "Medium" || item.type === "Resonators";

			case "Stalker":
				return item.type === "Medium" || item.type === "Claws";

			case "Warrior":
				return item.type === "Heavy" || item.type === "Greatsword";

			case "Engineer":
				return item.type === "Heavy" || item.type === "Heavy Gun";
		}

	return item.klass === itemClass;
}

export default class ItemSelector extends Component {
	static show(itemSlot, otherItem) {
		Overlay.show(<ItemSelector itemSlot={itemSlot} otherItem={otherItem} />);
	}

	constructor(props) {
		super(props);

		this.state = {
			itemType: null,
			itemClass: null
		};
	}

	selectItem(itemID) {
		AppStore.dispatch({type: "select_item", itemSlot: this.props.itemSlot, itemID});
		Overlay.hide();
	}

	toggleItemType(itemType, enabled) {
		if (enabled)
			this.setState({itemType});
		else if (this.state.itemType === itemType)
			this.setState({itemType: null});
	}

	toggleItemClass(itemClass, enabled) {
		if (enabled) {
			this.setState({itemClass});
		} else if (this.state.itemClass === itemClass) {
			this.setState({itemClass: null});
		}
	}

	renderItem(item, itemID) {
		return (
			<div key={itemID} className="item" onClick={() => this.selectItem(itemID)}>
				<div className="item-info">
					<div className="item-name">{item.name}</div>
					<div className="item-detail">
						{item.level} {item.type}
					</div>
				</div>
				<RatingsTable
					ratings={item.ratings}
					otherRatings={
						this.props.otherItem
						? Items[this.props.otherItem].ratings
						: undefined
					} />
			</div>
		);
	}

	renderItemTypes(itemTypes) {
		if (itemTypes.length > 0) {
			return (
				<div className="section">
					<div className="headline">Item Type</div>
					{itemTypes.map(itemType =>
						<Option
							key={itemType}
							state={this.state.itemType === itemType}
							onToggle={s => this.toggleItemType(itemType, s)}
						>
							{itemType}
						</Option>
					)}
				</div>
			);
		} else {
			return null;
		}
	}

	renderItemClasses(itemClasses) {
		if (itemClasses.length > 0) {
			return (
				<div className="section">
					<div className="headline">Item Class</div>
					{itemClasses.map(itemClass =>
						<Option
							key={itemClass}
							state={this.state.itemClass === itemClass}
							onToggle={s => this.toggleItemClass(itemClass, s)}
						>
							{itemClass}
						</Option>
					)}
				</div>
			);
		} else {
			return null;
		}
	}

	render() {
		const availableItems = [];
		const itemTypesDummy = {};
		const itemClassesDummy = {};

		for (let itemID in Items) {
			let item = Items[itemID];

			if (item.slot === this.props.itemSlot) {
				if (item.type)
					itemTypesDummy[item.type] = true;

				if (item.klass)
					itemClassesDummy[item.klass] = true;

				if (itemMatchesType(item, this.state.itemType) && itemMatchesClass(item, this.state.itemClass))
					availableItems.push(this.renderItem(item, itemID));
			}
		}

		return (
			<div className="item-selector">
				<div className="items">
					{availableItems}
				</div>
				<div className="filters">
					{this.renderItemTypes(Object.keys(itemTypesDummy))}
					{this.renderItemClasses(Object.keys(itemClassesDummy))}
				</div>
			</div>
		);
	}
}
