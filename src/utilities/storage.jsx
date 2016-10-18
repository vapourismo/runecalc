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

const numberStringNull = Serialize.oneOf(
	Serialize.typeOf("number"),
	Serialize.typeOf("string"),
	Serialize.exact(null)
);

const currentProfileMigrations = [
	{
		validate: Serialize.object({
			loadout: Serialize.object({
				"Weapon": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Shield": Serialize.object({
					item: numberStringNull
				}),
				"Head": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Shoulders": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Chest": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Hands": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Legs": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Feet": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Weapon Attachment": Serialize.object({
					item: numberStringNull
				}),
				"Support System": Serialize.object({
					item: numberStringNull
				}),
				"Implant": Serialize.object({
					item: numberStringNull
				}),
				"Key": Serialize.object({
					item: numberStringNull
				})
			}),
			filters: Serialize.object({
				klass: Serialize.oneOf(
					Serialize.exact("Engineer"),
					Serialize.exact("Esper"),
					Serialize.exact("Medic"),
					Serialize.exact("Spellslinger"),
					Serialize.exact("Stalker"),
					Serialize.exact("Warrior"),
					Serialize.exact(null)
				),
				role: Serialize.oneOf(
					Serialize.exact("Assault"),
					Serialize.exact("Support"),
					Serialize.exact(null)
				)
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
		}),
		upgrade: old => Serialize.updateObject(old, {
			amps: {
				powerConverter: false
			}
		})
	},
	{
		validate: Serialize.object({
			loadout: Serialize.object({
				"Weapon": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Shield": Serialize.object({
					item: numberStringNull
				}),
				"Head": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Shoulders": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Chest": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Hands": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Legs": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Feet": Serialize.object({
					item: numberStringNull,
					runes: Serialize.array(numberStringNull)
				}),
				"Weapon Attachment": Serialize.object({
					item: numberStringNull
				}),
				"Support System": Serialize.object({
					item: numberStringNull
				}),
				"Implant": Serialize.object({
					item: numberStringNull
				}),
				"Key": Serialize.object({
					item: numberStringNull
				})
			}),
			filters: Serialize.object({
				klass: Serialize.oneOf(
					Serialize.exact("Engineer"),
					Serialize.exact("Esper"),
					Serialize.exact("Medic"),
					Serialize.exact("Spellslinger"),
					Serialize.exact("Stalker"),
					Serialize.exact("Warrior"),
					Serialize.exact(null)
				),
				role: Serialize.oneOf(
					Serialize.exact("Assault"),
					Serialize.exact("Support"),
					Serialize.exact(null)
				)
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
				intensity: Serialize.typeOf("number"),
				powerConverter: Serialize.typeOf("boolean")
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
		validate: Serialize.objectValues(currentProfileMigrations[0].validate),
		upgrade: old => {
			const newProfiles = {};
			const upgrade = currentProfileMigrations[0].upgrade;

			for (let key in old)
				newProfiles[key] = upgrade(old[key]);

			return newProfiles;
		}
	},
	{
		validate: Serialize.objectValues(currentProfileMigrations[1].validate)
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
