/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";

export default class Section extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: props.expanded || false
		};

		this.toggleBody = this.toggleBody.bind(this);
	}

	toggleBody() {
		this.setState({expanded: !this.state.expanded});
	}

	render() {
		return (
			<div className="section">
				<div className="headline" onClick={this.toggleBody}>
					{this.state.expanded ? "-" : "+"} {this.props.headline}
				</div>
				{this.state.expanded ? (<div className="body">{this.props.children}</div>) : null}
			</div>
		);
	}
}
