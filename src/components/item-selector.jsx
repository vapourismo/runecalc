/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import AppStore from "../app-store.jsx";
import Items from "../database/items.jsx";
import Overlay from "../utilities/overlay.jsx";

export default class ItemSelector extends Component {
	static show(itemSlot) {
		Overlay.show(<ItemSelector itemSlot={itemSlot} />);
	}

	selectItem(itemID) {
		AppStore.dispatch({type: "select_item", itemSlot: this.props.itemSlot, itemID});
		Overlay.hide();
	}

	renderRating(name, value) {
		return (
			<div key={name} className="rating">
				<div className="rating-name">{name}</div>
				<div className="rating-value">{value}</div>
			</div>
		);
	}

	renderItem(item, itemID) {
		return (
			<div key={itemID} className="item">
				<div className="item-name" onClick={() => this.selectItem(itemID)}>{item.name}</div>
				{Object.keys(item.ratings).sort().map(
					name => this.renderRating(name, item.ratings[name])
				)}
			</div>
		);
	}

	render() {
		const availableItems = [];

		for (let itemID in Items)
			if (Items[itemID].itemSlot === this.props.itemSlot)
				availableItems.push(this.renderItem(Items[itemID], itemID));

		return (
			<div className="item-selector">
				<div className="body">
					{availableItems}
				</div>
			</div>
		);
	}
}
