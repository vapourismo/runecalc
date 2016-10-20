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
				<div className="description">{this.props.children}</div>
				<div className={"check-box" + (this.props.state ? " checked" : "")}></div>
			</div>
		);
	}
}

class MultiOption extends Component {
	constructor(props) {
		super(props);

		this.increaseLevel = this.increaseLevel.bind(this);
		this.decreaseLevel = this.decreaseLevel.bind(this);
	}

	increaseLevel() {
		if (this.props.value < this.props.count)
			this.props.onChange(this.props.value + 1);
		else
			this.props.onChange(0);
	}

	decreaseLevel(ev) {
		if (ev)
			ev.preventDefault();

		if (this.props.value > 0)
			this.props.onChange(this.props.value - 1);
		else
			this.props.onChange(this.props.count);

		return false;
	}

	render() {
		const buttons = [];

		for (let i = 0; i < this.props.count; i++)
			buttons.push(
				<div key={i} className={"check-box" + (i < this.props.value ? " checked" : "")} />
			);

		return (
			<div className="option" onClick={this.increaseLevel} onContextMenu={this.decreaseLevel}>
				<div className="description">{this.props.children}</div>
				{buttons}
			</div>
		);
	}
}

Option.MultiOption = MultiOption;
