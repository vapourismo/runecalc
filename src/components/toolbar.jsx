/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import {Component} from "react";
import Storage from "../utilities/storage.jsx";

export default class Toolbar extends Component {
	constructor(props) {
		super(props);

		this.triggerReset = this.triggerReset.bind(this);
		this.triggerSave = this.triggerSave.bind(this);
		this.triggerLoad = this.triggerLoad.bind(this);
	}

	triggerReset() {
		if (this.props.onReset)
			this.props.onReset();
	}

	triggerSave() {
		if (this.props.onSave)
			this.props.onSave();
	}

	triggerLoad() {
		if (this.props.onLoad)
			this.props.onLoad();
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
