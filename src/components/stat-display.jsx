/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Stats from "../database/stats.jsx";

export default class StatDisplay extends Component {
	render() {
		let counter = 0;
		const lines = Object.keys(this.props.stats).sort().map(name => {
			return (
				<div key={counter++} className="property">
					<div className="name">
						{name}
					</div>
					<div className="value">
						{Stats.formatStat(name, this.props.stats[name])}
					</div>
				</div>
			);
		});

		return <div className="summary">{lines}</div>;
	}
}
