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

const defaultLoadoutState = {
	items: {
		weapon:    [null, null, null],
		head:      [null, null, null],
		shoulders: [null, null, null],
		chest:     [null, null, null],
		hands:     [null, null, null],
		legs:      [null, null, null],
		feet:      [null, null, null]
	}
};

function reduceAppState(state = defaultLoadoutState, action) {
	switch (action.type) {
		case "modify_item":
			if (action.item in state.items)
				return updateObject(
					state,
					{
						items: {
							[action.item]: action.runes
						}
					}
				);
			else
				return state;

		case "reset":
			return defaultLoadoutState;

		case "load":
			return updateObject(
				state,
				{
					items: action.items
				}
			);

		default:
			return state;
	}
}

export default Redux.createStore(reduceAppState, defaultLoadoutState);
