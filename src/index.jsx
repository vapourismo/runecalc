import React, {Component} from "react";
import ReactDOM from "react-dom"

class SiteRoot extends Component {
	render() {
		return <div>Hello World</div>;
	}
}

window.addEventListener("load", function () {
	ReactDOM.render(<SiteRoot />, document.getElementById("canvas"));
});
