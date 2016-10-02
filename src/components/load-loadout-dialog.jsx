/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";
import RuneSlot from "./rune-slot.jsx";
import StatDisplay from "./stat-display.jsx";
import Toolbar from "./toolbar.jsx";
import Runes from "../database/runes.jsx";
import Stats from "../database/stats.jsx";
import Overlay from "../utilities/overlay.jsx";
import Storage from "../utilities/storage.jsx";

export default class LoadLoadoutDialog extends Component {
	loadLoadout(name) {
		if (this.props.onLoad)
			this.props.onLoad(name);
	}

	render() {
		let loadouts;

		if (this.props.names.length > 0)
			loadouts = this.props.names.map(name => (
				<div key={name} className="loadout" onClick={() => this.loadLoadout(name)}>
					{name}
				</div>
			));
		else
			loadouts = <div className="empty-message">Empty list</div>;

		return (
			<div className="load-loadout-dialog">
				<div className="headline">Select a loadout</div>
				{loadouts}
			</div>
		);
	}
}
