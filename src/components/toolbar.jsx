/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Storage from "../utilities/storage.jsx";
import SaveLoadoutDialog from "./save-loadout-dialog.jsx";
import LoadLoadoutDialog from "./load-loadout-dialog.jsx";
import AppStore from "../app-store.jsx";

export default class Toolbar extends Component {
	triggerReset() {
		AppStore.dispatch({type: "reset"});
	}

	triggerSave() {
		SaveLoadoutDialog.show();
	}

	triggerLoad() {
		LoadLoadoutDialog.show();
	}

	render() {
		if (Storage.isAvailable) {
			return (
				<div className="toolbar">
					<div className="filler left"></div>
					<div className="button" onClick={this.triggerReset}>Reset</div>
					<div className="button" onClick={this.triggerSave}>Save</div>
					<div className="button" onClick={this.triggerLoad}>Load</div>
					<div className="filler"></div>
				</div>
			);
		} else {
			return (
				<div className="toolbar">
					<div className="filler left"></div>
					<div className="button" onClick={this.triggerReset}>Reset</div>
					<div className="filler"></div>
				</div>
			);
		}
	}
}
