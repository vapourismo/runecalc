/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import ReactDOM from "react-dom"

import BackStack from "./utilities/back-stack.jsx";

function show(content) {
	const elem = document.getElementById("overlay");
	elem.style.display = "flex";

	ReactDOM.render(content, elem);
	BackStack.push(hide);
}

function hide() {
	const elem = document.getElementById("overlay");

	ReactDOM.unmountComponentAtNode(elem);
	BackStack.remove(hide);

	elem.style.display = "none";
}

window.addEventListener("click", function (ev) {
	if (ev.target && ev.target.id == "overlay")
		hide();
});

export default {show, hide};
