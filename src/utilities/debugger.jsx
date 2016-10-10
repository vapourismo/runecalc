/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";
import Overlay from "./overlay.jsx";

let hasLoadedYet = false;

window.addEventListener("load", function () {
	hasLoadedYet = true;
});

class ErrorDisplay extends Component {
	render() {
		let issueLink = "https://github.com/vapourismo/runecalc/issues/new";
		issueLink += "?title=" + encodeURIComponent(this.props.error.message);
		issueLink += "&body=" + encodeURIComponent("```\n" + this.props.error.stack + "\n```");

		return (
			<div className="error-display">
				<div className="headline">An error has occured</div>
				<div className="stack">{this.props.error.stack}</div>
				<div className="buttons">
					<a className="report" target="blank" href={issueLink}>Report</a>
				</div>
			</div>
		);
	}
}

window.addEventListener("error", function (ev) {
	if (hasLoadedYet) {
		Overlay.show(<ErrorDisplay error={ev.error} />);
	} else {
		window.addEventListener("load", function () {
			Overlay.show(<ErrorDisplay error={ev.error} />);
		});
	}
});
