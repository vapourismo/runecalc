/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Storage from "../utilities/storage.jsx";

export default class LoadLoadoutDialog extends Component {
	loadLoadout(name) {
		if (name in Storage.state.loadouts && this.props.onLoad)
			this.props.onLoad(Storage.state.loadouts[name]);
	}

	render() {
		const names = Object.keys(Storage.state.loadouts);
		let loadouts;

		if (names.length > 0)
			loadouts = names.map(name => (
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
