/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";

export default class Toolbar extends Component {
	constructor(props) {
		super(props);

		this.triggerReset = this.triggerReset.bind(this);
	}

	triggerReset() {
		if (this.props.onReset)
			this.props.onReset();
	}

	render() {
		return (
			<div className="toolbar">
				<div className="filler left"></div>
				<div className="button" onClick={this.triggerReset}>Reset</div>
				<div className="button">Save</div>
				<div className="button">Load</div>
				<div className="filler"></div>
			</div>
		);
	}
}
