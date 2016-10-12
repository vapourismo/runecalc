/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import Serialize from "./serialize.jsx";

const isAvailable = window.localStorage !== undefined;

function getItem(key) {
	if (!isAvailable)
		return undefined;

	return window.localStorage.getItem(key);
}

function setItem(key, data) {
	if(!isAvailable)
		return;

	window.localStorage.setItem(key, data);
}

const currentProfileMigrations = [
	{
		validate: Serialize.object({
			loadout: Serialize.object({
				"Weapon": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					),
					runes: Serialize.array(
						Serialize.oneOf(
							Serialize.typeOf("number"),
							Serialize.typeOf("string"),
							Serialize.exact(null)
						)
					)
				}),
				"Shield": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					)
				}),
				"Head": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					),
					runes: Serialize.array(
						Serialize.oneOf(
							Serialize.typeOf("number"),
							Serialize.typeOf("string"),
							Serialize.exact(null)
						)
					)
				}),
				"Shoulders": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					),
					runes: Serialize.array(
						Serialize.oneOf(
							Serialize.typeOf("number"),
							Serialize.typeOf("string"),
							Serialize.exact(null)
						)
					)
				}),
				"Chest": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					),
					runes: Serialize.array(
						Serialize.oneOf(
							Serialize.typeOf("number"),
							Serialize.typeOf("string"),
							Serialize.exact(null)
						)
					)
				}),
				"Hands": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					),
					runes: Serialize.array(
						Serialize.oneOf(
							Serialize.typeOf("number"),
							Serialize.typeOf("string"),
							Serialize.exact(null)
						)
					)
				}),
				"Legs": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					),
					runes: Serialize.array(
						Serialize.oneOf(
							Serialize.typeOf("number"),
							Serialize.typeOf("string"),
							Serialize.exact(null)
						)
					)
				}),
				"Feet": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					),
					runes: Serialize.array(
						Serialize.oneOf(
							Serialize.typeOf("number"),
							Serialize.typeOf("string"),
							Serialize.exact(null)
						)
					)
				}),
				"Weapon Attachment": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					)
				}),
				"Support System": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					)
				}),
				"Implant": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					)
				}),
				"Key": Serialize.object({
					item: Serialize.oneOf(
						Serialize.typeOf("number"),
						Serialize.typeOf("string"),
						Serialize.exact(null)
					)
				})
			}),
			amps: Serialize.object({
				assaultPower: Serialize.typeOf("number"),
				supportPower: Serialize.typeOf("number"),
				criticalHitChance: Serialize.typeOf("number"),
				criticalHitSeverity: Serialize.typeOf("number"),
				strikethrough: Serialize.typeOf("number"),
				armorPierce: Serialize.typeOf("number"),
				lifeSteal: Serialize.typeOf("number"),
				deflectChance: Serialize.typeOf("number"),
				criticalMitigation: Serialize.typeOf("number"),
				intensity: Serialize.typeOf("number")
			})
		})
	}
];

function loadCurrentProfile() {
	const value = getItem("currentProfile");

	if (!value)
		return undefined;

	return Serialize.unpack(value, currentProfileMigrations);
}

function saveCurrentProfile(currentProfile) {
	const json = Serialize.pack(currentProfile, currentProfileMigrations);

	if (!json)
		return false;

	setItem("currentProfile", json);
	return true;
}

const profilesMigrations = [
	{
		validate: Serialize.objectValues(currentProfileMigrations[0].validate)
	}
];

function loadProfiles() {
	const value = getItem("profiles");

	if (!value)
		return undefined;

	return Serialize.unpack(value, profilesMigrations);
}

function saveProfiles(profiles) {
	const json = Serialize.pack(profiles, profilesMigrations);

	if (!json)
		return false;

	setItem("profiles", json);
	return true;
}

export default {
	isAvailable,

	loadCurrentProfile,
	saveCurrentProfile,
	loadProfiles,
	saveProfiles
};
