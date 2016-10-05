/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import RuneSlot from "./rune-slot.jsx";
import StatDisplay from "./stat-display.jsx";
import AppStore from "../app-store.jsx";

export default class AccessorySlot extends Component {
	constructor(props) {
		super(props);

		this.state = {
			item: AppStore.getState().loadout[props.itemSlot].item
		};
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribe(
			() => {

			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	render() {
		const title = this.props.itemSlot[0].toUpperCase() + this.props.itemSlot.substring(1);

		return (
			<div className="item">
				<div className="headline">{title}</div>
				<div className="body">
				</div>
			</div>
		);
	}
}
