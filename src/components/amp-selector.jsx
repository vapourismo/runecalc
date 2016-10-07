/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

import React, {Component} from "react";

import Option from "./option.jsx"
import Overlay from "../utilities/overlay.jsx";
import AppStore from "../app-store.jsx";

class Tier1AMPSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			level: AppStore.getState().amps[props.name]
		};
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

	toggleLevel(level, enabled) {
		if (enabled)
			AppStore.dispatch({type: "change_amp", name: this.props.name, value: level});
		else if (this.state.level >= level)
			AppStore.dispatch({type: "change_amp", name: this.props.name, value: level > 0 ? level - 1 : 0});
	}

	render() {
		return (
			<div className="section">
				<div className="headline">{this.props.title}</div>
				<Option state={this.state.level >= 1} onToggle={n => this.toggleLevel(1, n)}>{this.props.title} I</Option>
				<Option state={this.state.level >= 2} onToggle={n => this.toggleLevel(2, n)}>{this.props.title} II</Option>
				<Option state={this.state.level >= 3} onToggle={n => this.toggleLevel(3, n)}>{this.props.title} III</Option>
			</div>
		);
	}
}

export default class AMPSelector extends Component {
	static show() {
		Overlay.show(<AMPSelector />);
	}

	render() {
		return (
			<div className="amp-selector">
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
			</div>
		);
	}
}
