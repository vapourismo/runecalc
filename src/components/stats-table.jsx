/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Stats from "../database/stats.jsx";

export default class StatsTable extends Component {
	// renderStatComparison(name) {
	// 	const value = this.props.stats[name] || 0;
	// 	const otherValue = this.props.otherStats[name] || 0;

	// 	const offset = value - otherValue;

	// 	return (
	// 		<div key={name} className="stat">
	// 			<div className="stat-name">{name}</div>
	// 			<div className="stat-value">{Stats.formatStat(name, value)}</div>
	// 			<div className={"stat-value" + (offset >= 0 ? " positive" : " negative")}>
	// 				{offset >= 0 ? "+" + offset : offset}
	// 			</div>
	// 		</div>
	// 	);
	// }

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
		return (
			<div>
				<div className="stat-section">
					<div className="headline">General</div>
					<div className="ratings">
						{this.renderStat("Health")}
						{this.renderStat("Assault Rating")}
						{this.renderStat("Support Rating")}
					</div>
				</div>
				<div className="stat-section">
					<div className="headline">Offensive</div>
					<div className="ratings">
						{this.renderStat("Strikethrough")}
						{this.renderStat("Critical Hit Chance")}
						{this.renderStat("Critical Hit Severity")}
						{this.renderStat("Multi-Hit Chance")}
						{this.renderStat("Multi-Hit Severity")}
						{this.renderStat("Vigor")}
						{this.renderStat("Armor Pierce")}
					</div>
				</div>
				<div className="stat-section">
					<div className="headline">Defensive</div>
					<div className="ratings">
						{this.renderStat("Armor")}
						{this.renderStat("Glance Mitigation")}
						{this.renderStat("Glance Chance")}
						{this.renderStat("Critical Mitigation")}
						{this.renderStat("Deflect Chance")}
					</div>
				</div>
				<div className="stat-section">
					<div className="headline">Utility</div>
					<div className="ratings">
						{this.renderStat("CC Resilience")}
						{this.renderStat("Life Steal")}
						{this.renderStat("Focus Pool")}
						{this.renderStat("Focus Recovery Rate")}
						{this.renderStat("Reflect Chance")}
						{this.renderStat("Intensity")}
					</div>
				</div>
			</div>
		);
	}
}
