/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Item from "./item.jsx";
import AppStore from "../app-store.jsx";

export default class AccessorySlot extends Component {
	constructor(props) {
		super(props);

		this.state = {
			item: AppStore.getState().loadout[props.itemSlot].item
		};
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribeTo(
			["loadout", this.props.itemSlot, "item"],
			item => {
				this.setState({item});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	render() {
		return (
			<div className="item-slot">
				<div className="headline">{this.props.itemSlot}</div>
				<Item itemSlot={this.props.itemSlot} />
			</div>
		);
	}
}
