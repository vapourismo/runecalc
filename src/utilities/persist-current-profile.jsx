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
