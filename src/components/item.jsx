/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ItemSelector from "./item-selector.jsx";
import AppStore from "../app-store.jsx";
import Items from "../database/items.jsx";

export default class Item extends Component {
	constructor(props) {
		super(props);

		this.state = {
			item: AppStore.getState().loadout[props.itemSlot].item
		};

		this.showItemSelector = this.showItemSelector.bind(this);
		this.clearSlot = this.clearSlot.bind(this);
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribe(
			() => {
				this.setState({
					item: AppStore.getState().loadout[this.props.itemSlot].item
				});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	showItemSelector() {
		ItemSelector.show(this.props.itemSlot, this.state.item);
	}

	clearSlot(ev) {
		if (ev)
			ev.preventDefault();

		AppStore.dispatch({type: "remove_item", itemSlot: this.props.itemSlot});

		return false;
	}

	render() {
		if (this.state.item in Items) {
			const item = Items[this.state.item];

			return (
				<div className="item" onClick={this.showItemSelector} onContextMenu={this.clearSlot}>
					{item.name}
				</div>
			);
		} else {
			return (
				<div className="item empty" onClick={this.showItemSelector}>
					No item selected
				</div>
			);
		}
	}
}
