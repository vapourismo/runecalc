/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import {Component} from "react";
import Runes from "../database/runes.jsx";
import Stats from "../database/stats.jsx";

export default class StatDisplay extends Component {
	render() {
		let stats = {};

		if (this.props.runes)
			stats = Stats.gatherStats(this.props.runes);
		else if (this.props.stats)
			stats = this.props.stats;

		let counter = 0;
		const lines = Object.keys(stats).sort().map(name => {
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
