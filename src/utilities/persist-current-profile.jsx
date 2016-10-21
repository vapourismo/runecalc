/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import Storage from "./storage.jsx";
import AppStore from "../app-store.jsx";

if (Storage.isAvailable) {
	// Save current profile on change
	AppStore.subscribe(() => {
		const appState = AppStore.getState();

		const result = Storage.saveCurrentProfile({
			loadout: appState.loadout,
			filters: appState.filters,
			amps: appState.amps
		});

		if (!result)
			console.error("Storage rejected saving of current profile");
	});

	// Restore saved profile
	const currentProfile = Storage.loadCurrentProfile();

	if (currentProfile)
		AppStore.dispatch({type: "load_profile", profile: currentProfile});
	else
		console.error("Failed to load current profile");
}

function numberString(val) {
	return val == null ? "" : "" + val;
}

const itemOrder = [
	"Weapon",
	"Shield",
	"Head",
	"Shoulders",
	"Chest",
	"Hands",
	"Legs",
	"Feet",
	"Weapon Attachment",
	"Support System",
	"Implant",
	"Key"
];

AppStore.subscribe(() => {
	const state = AppStore.getState();

	const dat = itemOrder.map(item => {
	 	item = state.loadout[item];

		return (
			item.runes
				? [numberString(item.item), ...item.runes.map(numberString)].join(",")
				: numberString(item.item)
		);
	});

	window.location.hash = "#profile:" + dat.join(";");
});

const numberPattern = /^[0-9]+$/;
const hashPattern = /^#profile:(([0-9,]*)(;?)){12}$/;

if (hashPattern.test(window.location.hash)) {
	const items = window.location.hash.substring(9).split(";");
	const loadout = {};

	if (items.length === itemOrder.length) {
		items.forEach((itemDescription, idx) => {
			const slot = itemOrder[idx];
			const info = (loadout[slot] = {});

			const segments = itemDescription.split(",");

			if (segments.length > 0 && numberPattern.test(segments[0])) {
				info.item = segments[0];
			}

			if (segments.length > 1) {
				info.runes = segments.slice(1).map(seg => {
					if (numberPattern.test(seg))
						return Number.parseInt(seg);

					return null;
				});
			}
		});
	}

	AppStore.dispatch({type: "load_profile", profile: {loadout}});
}
