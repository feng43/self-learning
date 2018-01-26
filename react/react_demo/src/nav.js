import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.css";

const NavBar = () => (
	<div>
		<div>
			<NavLink exact className="blue" to="/">
				app-a
			</NavLink>
			<NavLink to="/b" className="blue" activeClassName="bbb">
				app-b
			</NavLink>
			<NavLink to="/c" className="blue">
				app-c
			</NavLink>
		</div>
	</div>
);

export default NavBar;
