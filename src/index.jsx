/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import "./utilities/debugger.jsx";

import React, {Component} from "react";
import ReactDOM from "react-dom";

import Toolbar from "./components/toolbar.jsx";
import ItemSet from "./components/item-set.jsx";
import ClassFilter from "./components/class-filter.jsx";
import RoleFilter from "./components/role-filter.jsx";
import StatSummary from "./components/stat-summary.jsx";
import AMPSelector from "./components/amp-selector.jsx";

import "./utilities/persist-current-profile.jsx";

class Root extends Component {
	render() {
		return (
			<div className="root">
				<div id="root-left" className="left">
					<div id="root-left-inner"></div>
					<ItemSet />
				</div>
				<div id="root-right" className="right">
					<div id="root-right-inner"></div>
					<ClassFilter />
					<RoleFilter />
					<div className="section amp-selector-button" onClick={AMPSelector.show}>
						Select AMPs
					</div>
					<StatSummary />
				</div>
			</div>
		);
	}
}

function adjustRootSides() {
	const left = document.getElementById("root-left");
	const leftInner = document.getElementById("root-left-inner");

	if (left.offsetWidth > leftInner.offsetWidth)
		left.style.marginRight = (leftInner.offsetWidth - left.offsetWidth) + "px";

	const right = document.getElementById("root-right");
	const rightInner = document.getElementById("root-right-inner");

	if (right.offsetWidth > rightInner.offsetWidth)
		right.style.marginRight = (rightInner.offsetWidth - right.offsetWidth) + "px";
}

window.addEventListener("load", function () {
	ReactDOM.render(<Toolbar />, document.getElementById("toolbar"));
	ReactDOM.render(<Root />, document.getElementById("canvas"));

	adjustRootSides();
});
