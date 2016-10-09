/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Overlay from "../utilities/overlay.jsx";
import AppStore from "../app-store.jsx";

export default class ConfirmResetDialog extends Component {
	static show() {
		Overlay.show(<ConfirmResetDialog />);
	}

	performReset(name) {
		AppStore.dispatch({type: "reset"});
		Overlay.hide();
	}

	render() {
		return (
			<div className="confirm-reset-dialog">
				<div className="headline">
					Confirm reset
				</div>
				<div className="message">
					Are you sure you want to reset the current profile?
				</div>
				<div className="buttons">
					<div className="yes" onClick={this.performReset}>Yes</div>
					<div className="splitter"></div>
					<div className="no" onClick={Overlay.hide}>No</div>
				</div>
			</div>
		);
	}
}
