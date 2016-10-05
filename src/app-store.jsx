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
		weapon: {
			item: null,
			runes: [null, null, null]
		},
		shield: {
			item: null
		},
		head: {
			item: null,
			runes: [null, null, null]
		},
		shoulders: {
			item: null,
			runes: [null, null, null]
		},
		chest: {
			item: null,
			runes: [null, null, null]
		},
		hands: {
			item: null,
			runes: [null, null, null]
		},
		legs: {
			item: null,
			runes: [null, null, null]
		},
		feet: {
			item: null,
			runes: [null, null, null]
		}
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

export default Redux.createStore(reduceAppState, defaultState);
