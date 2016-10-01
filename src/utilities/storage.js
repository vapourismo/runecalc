/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

const isAvailable = window.localStorage !== undefined;

export default {
	isAvailable,

	load(key) {
		if (!isAvailable)
			return null;

		try {
			return JSON.parse(localStorage.getItem(key));
		} catch (_) {
			return null;
		}
	},

	save(key, data) {
		if(!isAvailable)
			return;

		localStorage.setItem(key, JSON.stringify(data));
	}
};
