/* Copyright (C) 2016, Ole Krüger <ole@vprsm.de> */

"use strict";

import React, {Component} from "react";

import Option from "./option.jsx";
import AppStore from "../app-store.jsx";

export default class RoleFilter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			role: AppStore.getState().filters.role
		};
	}

	componentDidMount() {
		this.storeLease = AppStore.subscribeTo(
			["filters", "role"],
			role => {
				this.setState({role});
			}
		);
	}

	componentWillUnmount() {
		if (this.storeLease) this.storeLease();
	}

	toggleClass(role, enabled) {
		if (enabled) {
			AppStore.dispatch({type: "change_role_filter", role});
		} else if (this.state.role === role) {
			AppStore.dispatch({type: "change_role_filter", role: null});
		}
	}

	render() {
		return (
			<div className="section">
				<div className="headline">Role</div>
				<Option
					state={this.state.role === "Assault"}
					onToggle={n => this.toggleClass("Assault", n)}
				>
					Assault
				</Option>
				<Option
					state={this.state.role === "Support"}
					onToggle={n => this.toggleClass("Support", n)}
				>
					Support
				</Option>
			</div>
		);
	}
}
