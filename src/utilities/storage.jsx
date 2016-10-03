/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

const isAvailable = window.localStorage !== undefined;

function getItem(key) {
	if (!isAvailable)
		return null;

	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (_) {
		return null;
	}
}

function setItem(key, data) {
	if(!isAvailable)
		return;

	localStorage.setItem(key, JSON.stringify(data));
}

const currentVersion = 2;

const defaultState = {
	loadouts: {}
};

const migrations = [
	function (state) {
		return {
			loadouts: {}
		};
	},
	function (state) {
		return {
			loadouts: {}
		};
	}
];

let state = defaultState;

if (isAvailable) {
	const version = getItem("version");
	state = getItem("state");

	if (version == null || state == null || version > currentVersion) {
		state = defaultState;
	} else if (version < currentVersion) {
		for (let i = version; i < currentVersion; i++)
			state = migrations[i](state);
	} else if (!(state instanceof Object)) {
		state = defaultState;
	} else if (!state.loadouts || !(state.loadouts instanceof Object)) {
		state.loadouts = {};
	}

	save();
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
