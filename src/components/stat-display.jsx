/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Stats from "../database/stats.jsx";

export default class StatDisplay extends Component {
	render() {
		let stats = {};

		if (this.props.runes)
			stats = Stats.gatherStats(this.props.runes);
		else if (this.props.stats)
			stats = this.props.stats;

		stats = Stats.transformStats(stats);

		let counter = 0;
		const lines = Object.keys(stats).sort(
			(a, b) => stats[a] < stats[b] ? 1 : (stats[a] == stats[b] ? 0 : -1)
		).map(name => {
			return (
				<div key={counter++} className="property">
					<div className="name">
						{name}
					</div>
					<div className="value">
						{Stats.formatStat(name, stats[name])}
					</div>
				</div>
			);
		});

		return <div className="summary">{lines}</div>;
	}
}
