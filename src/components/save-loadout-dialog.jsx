/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Storage from "../utilities/storage.jsx";

export default class SaveLoadoutDialog extends Component {
	constructor(props) {
		super(props);

		this.saveLoadout = this.saveLoadout.bind(this);
	}

	saveLoadout() {
		if (this.inputCom && this.inputCom.value != "" && this.props.onSave)
			this.overrideLoadout(this.inputCom.value);
		else if (this.inputCom)
			this.inputCom.focus();
	}

	overrideLoadout(name) {
		Storage.state.loadouts[name] = this.props.loadout;
		Storage.save();

		if (this.props.onSave)
			this.props.onSave();
	}

	render() {
		const names = Object.keys(Storage.state.loadouts);
		let loadouts;

		if (names.length > 0)
			loadouts = names.map(name => (
				<div key={name} className="loadout" onClick={() => this.overrideLoadout(name)}>
					{name}
				</div>
			));
		else
			loadouts = <div className="empty-message">Empty list</div>;

		return (
			<div className="save-loadout-dialog">
				<div className="existing-loadouts">
					<div className="headline">Override existing loadout</div>
					{loadouts}
				</div>
				<div className="new-loadout">
					<div className="headline">Create new loadout</div>
					<input
						className="text-input"
						type="text"
						ref={com => this.inputCom = com}
						placeholder="Type name here" />
					<div className="submit" onClick={this.saveLoadout}>Save</div>
				</div>
			</div>
		);
	}
}
