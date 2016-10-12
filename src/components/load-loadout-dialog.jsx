/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Storage from "../utilities/storage.jsx";
import Overlay from "../utilities/overlay.jsx";
import AppStore from "../app-store.jsx";

export default class LoadLoadoutDialog extends Component {
	static show() {
		Overlay.show(<LoadLoadoutDialog />);
	}

	constructor(props) {
		super(props);

		this.profiles = Storage.loadProfiles() || {};
	}

	loadLoadout(name) {
		if (name in this.profiles)
			AppStore.dispatch({type: "load_profile", profile: this.profiles[name]});

		Overlay.hide();
	}

	render() {
		const names = Object.keys(this.profiles);
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
