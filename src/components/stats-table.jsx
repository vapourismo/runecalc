/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Stats from "../database/stats.jsx";

export default class StatsTable extends Component {
	renderStatComparison(name) {
		const value = this.props.stats[name] || 0;
		const otherValue = this.props.otherStats[name] || 0;

		const offset = value - otherValue;

		return (
			<div key={name} className="rating">
				<div className="rating-name">{name}</div>
				<div className="rating-value">{Stats.formatStat(name, value)}</div>
				<div className={"rating-value" + (offset >= 0 ? " positive" : " negative")}>
					{offset >= 0 ? "+" + offset : offset}
				</div>
			</div>
		);
	}

	renderStat(name) {
		const value = this.props.stats[name];

		return (
			<div key={name} className="rating">
				<div className="rating-name">{name}</div>
				<div className="rating-value">{Stats.formatStat(name, value)}</div>
			</div>
		);
	}

	render() {
		if (this.props.otherStats) {
			const keyDummy = {};

			for (let key in this.props.stats)
				keyDummy[key] = true;

			for (let key in this.props.otherStats)
				keyDummy[key] = true;

			return (
				<div className="ratings">
					{Object.keys(keyDummy).sort().map(this.renderStatComparison, this)}
				</div>
			);
		} else {
			return (
				<div className="ratings">
					{Object.keys(this.props.stats).sort().map(this.renderStat, this)}
				</div>
			);
		}
	}
}
