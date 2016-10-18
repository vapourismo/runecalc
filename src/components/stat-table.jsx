/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";

import Section from "./section.jsx";
import Stats from "../database/stats.jsx";

export default class StatTable extends Component {
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
				<Section headline="General" expanded={true}>
					<div className="ratings">
						{this.renderStat("Health")}
						{this.renderStat("Assault Rating")}
						{this.renderStat("Support Rating")}
					</div>
				</Section>
				<Section headline="Offensive" expanded={true}>
					<div className="ratings">
						{this.renderStat("Strikethrough")}
						{this.renderStat("Critical Hit Chance")}
						{this.renderStat("Critical Hit Severity")}
						{this.renderStat("Multi-Hit Chance")}
						{this.renderStat("Multi-Hit Severity")}
						{this.renderStat("Vigor")}
						{this.renderStat("Armor Pierce")}
					</div>
				</Section>
				<Section headline="Defensive" expanded={true}>
					<div className="ratings">
						{this.renderStat("Armor")}
						{this.renderStat("Glance Mitigation")}
						{this.renderStat("Glance Chance")}
						{this.renderStat("Critical Mitigation")}
						{this.renderStat("Deflect Chance")}
					</div>
				</Section>
				<Section headline="Utility" expanded={true}>
					<div className="ratings">
						{this.renderStat("CC Resilience")}
						{this.renderStat("Life Steal")}
						{this.renderStat("Focus Pool")}
						{this.renderStat("Focus Recovery Rate")}
						{this.renderStat("Reflect Chance")}
						{this.renderStat("Intensity")}
					</div>
				</Section>
			</div>
		);
	}
}
