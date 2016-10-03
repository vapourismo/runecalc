/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";

export default class Option extends Component {
	constructor(props) {
		super(props);

		this.toggleState = this.toggleState.bind(this);
	}

	toggleState() {
		if (this.props.onToggle)
			this.props.onToggle(!this.props.state);
	}

	render() {
		return (
			<div className="option" onClick={this.toggleState}>
				<div className={"check-box" + (this.props.state ? " checked" : "")}></div>
				<div className="description">{this.props.children}</div>
			</div>
		);
	}
}
