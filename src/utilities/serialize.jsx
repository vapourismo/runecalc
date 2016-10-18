/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

function schemaArray(validator) {
	return input => input instanceof Array && input.every(validator);
}

function schemaObject(validatorObject) {
	return input => {
		if (!(input instanceof Object))
			return false;

		for (let key in validatorObject)
			if (!validatorObject[key](input[key]))
				return false;

		return true;
	};
}

function schemaObjectValues(validateValue) {
	return input => {
		if (!(input instanceof Object))
			return false;

		return Object.values(input).every(validateValue);
	}
}

function schemaExact(value) {
	return input => input === value;
}

function schemaTypeOf(typeName) {
	return input => typeof(input) === typeName;
}

function schemaOneOf(...validators) {
	return input => validators.some(validate => validate(input));
}

const schemaNotUndefined = input => input !== undefined;

const isContainer = schemaObject({
	version: schemaTypeOf("number"),
	payload: schemaNotUndefined
});

function unpack(json, versions = []) {
	const currentVersion = versions.length - 1;

	try {
		let value = JSON.parse(json);

		if (!isContainer(value))
			return undefined;

		if (value.version === currentVersion) {
			if (currentVersion < 0)
				return value.payload;
			else if (versions[currentVersion].validate(value.payload))
				return value.payload;
			else
				return undefined;
		} else if (value.version < currentVersion) {
			let target = value.payload;

			for (let version = value.version; version < currentVersion; version++) {
				if (!versions[version].validate(target))
					return undefined;

				target = versions[version].upgrade(target);
			}

			return versions[currentVersion].validate(target) ? target : undefined;
		} else {
			return undefined;
		}
	} catch (_) {
		return undefined;
	}
}

function pack(value, versions = []) {
	const currentVersion = versions.length - 1;

	if (currentVersion < 0 || versions[currentVersion].validate(value))
		return JSON.stringify({version: currentVersion, payload: value});
	else
		return undefined;
}

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

export default {
	array: schemaArray,
	object: schemaObject,
	objectValues: schemaObjectValues,
	exact: schemaExact,
	typeOf: schemaTypeOf,
	notUndefined: schemaNotUndefined,
	oneOf: schemaOneOf,

	unpack,
	pack,

	updateObject
};
