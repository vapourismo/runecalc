/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";

import Option from "./option.jsx";
import AppStore from "../app-store.jsx";

export default class ClassFilter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			klass: AppStore.getState().filters.klass
		};
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribeTo(
			["filters", "klass"],
			klass => {
				this.setState({klass});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	toggleClass(klass, enabled) {
		if (enabled) {
			AppStore.dispatch({type: "change_class_filter", klass});
		} else if (this.state.klass === klass) {
			AppStore.dispatch({type: "change_class_filter", klass: null});
		}
	}

	render() {
		return (
			<div className="section">
				<div className="headline">Class</div>
				<Option
					state={this.state.klass === "Engineer"}
					onToggle={n => this.toggleClass("Engineer", n)}
				>
					Engineer
				</Option>
				<Option
					state={this.state.klass === "Esper"}
					onToggle={n => this.toggleClass("Esper", n)}
				>
					Esper
				</Option>
				<Option
					state={this.state.klass === "Medic"}
					onToggle={n => this.toggleClass("Medic", n)}
				>
					Medic
				</Option>
				<Option
					state={this.state.klass === "Spellslinger"}
					onToggle={n => this.toggleClass("Spellslinger", n)}
				>
					Spellslinger
				</Option>
				<Option
					state={this.state.klass === "Stalker"}
					onToggle={n => this.toggleClass("Stalker", n)}
				>
					Stalker
				</Option>
				<Option
					state={this.state.klass === "Warrior"}
					onToggle={n => this.toggleClass("Warrior", n)}
				>
					Warrior
				</Option>
			</div>
		);
	}
}
