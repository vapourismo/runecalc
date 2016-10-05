/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";

export default class RatingsTable extends Component {
	renderRatingComparison(name) {
		const value = this.props.ratings[name] || 0;
		const otherValue = this.props.otherRatings[name] || 0;

		const offset = value - otherValue;

		return (
			<div key={name} className="rating">
				<div className="rating-name">{name}</div>
				<div className="rating-value">{value}</div>
				<div className={"rating-value" + (offset >= 0 ? " positive" : " negative")}>
					{offset >= 0 ? "+" + offset : offset}
				</div>
			</div>
		);
	}

	renderRating(name) {
		const value = this.props.ratings[name];

		return (
			<div key={name} className="rating">
				<div className="rating-name">{name}</div>
				<div className="rating-value">{value}</div>
			</div>
		);
	}

	render() {
		if (this.props.otherRatings) {
			const keyDummy = {};

			for (let key in this.props.ratings)
				keyDummy[key] = true;

			for (let key in this.props.otherRatings)
				keyDummy[key] = true;

			return (
				<div className="ratings">
					{Object.keys(keyDummy).sort().map(this.renderRatingComparison, this)}
				</div>
			);
		} else {
			return (
				<div className="ratings">
					{Object.keys(this.props.ratings).sort().map(this.renderRating, this)}
				</div>
			);
		}
	}
}
