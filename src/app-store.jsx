/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import * as Redux from "redux";

function updateObject(a, b) {
	let c = Object.assign({}, a);

	for (let k in b) {
		if (
			k in a
			&& c[k] instanceof Object
			&& b[k] instanceof Object
			&& !(b[k] instanceof Array)
		) {
			c[k] = updateObject(c[k], b[k]);
		} else {
			c[k] = b[k];
		}
	}

	return c;
}

const defaultState = {
	loadout: {
		"Weapon": {
			item: null,
			runes: [null, null, null]
		},
		"Shield": {
			item: null
		},
		"Head": {
			item: null,
			runes: [null, null, null]
		},
		"Shoulders": {
			item: null,
			runes: [null, null, null]
		},
		"Chest": {
			item: null,
			runes: [null, null, null]
		},
		"Hands": {
			item: null,
			runes: [null, null, null]
		},
		"Legs": {
			item: null,
			runes: [null, null, null]
		},
		"Feet": {
			item: null,
			runes: [null, null, null]
		},
		"Weapon Attachment": {
			item: null
		},
		"Support System": {
			item: null
		},
		"Implant": {
			item: null
		},
		"Key": {
			item: null
		}
	},

	filters: {
		klass: null,
		role: null
	}
};

function reduceAppState(state = defaultState, action) {
	switch (action.type) {
		case "modify_item_runes":
			return updateObject(
				state,
				{
					loadout: {
						[action.itemSlot]: {
							runes: action.runes
						}
					}
				}
			);

		case "select_item":
			return updateObject(
				state,
				{
					loadout: {
						[action.itemSlot]: {
							item: action.itemID
						}
					}
				}
			);

		case "remove_item":
			return updateObject(
				state,
				{
					loadout: {
						[action.itemSlot]: {
							item: null
						}
					}
				}
			);

		case "change_class_filter":
			return updateObject(
				state,
				{
					filters: {
						klass: action.klass
					}
				}
			);

		case "change_role_filter":
			return updateObject(
				state,
				{
					filters: {
						role: action.role
					}
				}
			);

		case "reset":
			return defaultState;

		case "load":
			return updateObject(
				state,
				{
					loadout: action.loadout
				}
			);

		default:
			return state;
	}
}

const store = Redux.createStore(reduceAppState, defaultState);

function walkObject(obj, path) {
	for (let i in path) {
		let dir = path[i];

		if (obj instanceof Object)
			obj = obj[dir];
		else
			return undefined;
	}

	return obj;
}

store.subscribeTo = function (path, handler) {
	let lastestState = walkObject(this.getState(), path);

	return this.subscribe(() => {
		const localState = walkObject(this.getState(), path);

		if (lastestState !== localState) {
			lastestState = localState;
			handler(localState);
		}
	});
};

export default store;
