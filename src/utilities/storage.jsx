/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

const isAvailable = window.localStorage !== undefined;

function getItem(key) {
	if (!isAvailable)
		return null;

	try {
		return JSON.parse(window.localStorage.getItem(key));
	} catch (_) {
		return null;
	}
}

function setItem(key, data) {
	if(!isAvailable)
		return;

	window.localStorage.setItem(key, JSON.stringify(data));
}

const currentVersion = 4;

const defaultState = {
	loadouts: {}
};

let state = defaultState;

if (isAvailable) {
	const version = getItem("version");

	if (version === currentVersion) {
		state = getItem("state");
	} else {
		setItem("state", state);
		save();
	}
}

function save() {
	setItem("version", currentVersion);
	setItem("state", state);
}

export default {
	isAvailable,
	state,

	save
};
