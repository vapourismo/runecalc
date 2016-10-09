/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Storage from "../utilities/storage.jsx";
import ConfirmResetDialog from "./confirm-reset-dialog.jsx";
import SaveLoadoutDialog from "./save-loadout-dialog.jsx";
import LoadLoadoutDialog from "./load-loadout-dialog.jsx";
import AppStore from "../app-store.jsx";

export default class Toolbar extends Component {
	triggerReset() {
		AppStore.dispatch({type: "reset"});
	}

	render() {
		if (Storage.isAvailable) {
			return (
				<div className="toolbar">
					<div className="filler left"></div>
					<div className="button" onClick={ConfirmResetDialog.show}>Reset</div>
					<div className="button" onClick={SaveLoadoutDialog.show}>Save</div>
					<div className="button" onClick={LoadLoadoutDialog.show}>Load</div>
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
