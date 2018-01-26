import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom"; //Route包含在Router中
import App from "./newApp";
import Appb from "./newAppb";
import Appc from "./newAppc";
import Nav from "./nav";

ReactDOM.render(
	<Router>
		<div>
			<Nav />
			<Route exact path="/" component={App} />
			<Route path="/B" component={Appb} />
			<Route path="/C" component={Appc} />
		</div>
	</Router>,
	document.getElementById("root")
);

//  exact 精确匹配
