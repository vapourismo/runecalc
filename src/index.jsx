"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom"
import Runes from "./runes.jsx";

class Slot extends Component {
	render() {
		if (this.props.runeID != null && this.props.runeID in Runes) {
			const rune = Runes[this.props.runeID];

			return (
				<div className="slot">
					<div className="holder">
						<div className={`rune ${rune.type}`}></div>
					</div>
					<div className="description">
						<div className="name">
							{rune.statName}
						</div>
						<div className="set-name">
							+{rune.power} {rune.setName}
						</div>
					</div>
					<div className="rating">
						{rune.statValue}
					</div>
				</div>
			);
		} else {
			return (
				<div className="slot">
					<div className="holder"></div>
				</div>
			);
		}
	}
}

class SiteRoot extends Component {
	render() {
		return (
			<div>
				<Slot runeID={0} />
				<Slot runeID={1} />
				<Slot />
			</div>
		);
	}
}

window.addEventListener("load", function () {
	ReactDOM.render(<SiteRoot />, document.getElementById("canvas"));
});
