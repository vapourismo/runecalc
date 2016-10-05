/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import RatingsTable from "./ratings-table.jsx";
import AppStore from "../app-store.jsx";
import Items from "../database/items.jsx";
import Overlay from "../utilities/overlay.jsx";

export default class ItemSelector extends Component {
	static show(itemSlot, otherItem) {
		Overlay.show(<ItemSelector itemSlot={itemSlot} otherItem={otherItem} />);
	}

	selectItem(itemID) {
		AppStore.dispatch({type: "select_item", itemSlot: this.props.itemSlot, itemID});
		Overlay.hide();
	}

	renderItem(item, itemID) {
		return (
			<div key={itemID} className="item">
				<div className="item-info" onClick={() => this.selectItem(itemID)}>
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

	render() {
		const availableItems = [];

		for (let itemID in Items)
			if (Items[itemID].slot === this.props.itemSlot)
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
