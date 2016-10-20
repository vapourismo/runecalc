/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";

import Section from "./section.jsx";
import Option from "./option.jsx"
import AppStore from "../app-store.jsx";

class Tier1AMPSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			level: AppStore.getState().amps[props.name]
		};

		this.changeLevel = this.changeLevel.bind(this);
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribeTo(
			["amps", this.props.name],
			level => {
				this.setState({level});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	changeLevel(level) {
		AppStore.dispatch({type: "change_amp", name: this.props.name, value: level});
	}

	render() {
		return (
			<Option.MultiOption value={this.state.level} count={3} onChange={this.changeLevel}>
				{this.props.title}
			</Option.MultiOption>
		);
	}
}

class SpecialAMP extends Component {
	constructor(props) {
		super(props);

		this.state = {
			enabled: AppStore.getState().amps[props.name]
		};

		this.toggleEnabled = this.toggleEnabled.bind(this);
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribeTo(
			["amps", this.props.name],
			enabled => {
				this.setState({enabled});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	toggleEnabled(n) {
		AppStore.dispatch({type: "change_amp", name: this.props.name, value: n});
	}

	render() {
		return (
			<Option state={this.state.enabled} onToggle={this.toggleEnabled}>
				{this.props.title}
			</Option>
		);
	}
}

export default class AMPSection extends Component {
	render() {
		return (
			<div>
				<Section headline="AMPs">
					<Tier1AMPSection title="Assault Power" name="assaultPower" />
					<Tier1AMPSection title="Support Power" name="supportPower" />
					<Tier1AMPSection title="Critical Hit Chance" name="criticalHitChance" />
					<Tier1AMPSection title="Critical Hit Severity" name="criticalHitSeverity" />
					<Tier1AMPSection title="Strikethrough" name="strikethrough" />
					<Tier1AMPSection title="Armor Pierce" name="armorPierce" />
					<Tier1AMPSection title="Life Steal" name="lifeSteal" />
					<Tier1AMPSection title="Deflect Chance" name="deflectChance" />
					<Tier1AMPSection title="Critical Mitigation" name="criticalMitigation" />
					<Tier1AMPSection title="Intensity" name="intensity" />
					<SpecialAMP title="Power Converter" name="powerConverter" />
					<SpecialAMP title="Fury" name="fury" />
				</Section>
			</div>
		);
	}
}
