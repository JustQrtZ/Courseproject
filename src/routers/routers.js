import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { path } from "./path";
import { useSelector } from "react-redux";
import withInit from "../hoc/withinit";
import Main from "../pages/main/main";
import Login from "../pages/login/login";
import Signup from "../pages/registration/registration";
import Admin from "../pages/admin/admin"
import { NotFound } from "../pages/notFaund/notFound";
import Topbar from "../components/topbar/topbar";
import Profile from "../pages/profile/profile"
import Company from "../pages/company/company"


const Router = () => {
	const {isLogIn, role}  = useSelector((state) => state.account);
	console.log({ isLogIn });
	console.log({ role });

	return (
		<BrowserRouter>
			<Topbar />
			<Switch>
				<Route exact path={path.main}>
					<Main />
				</Route>
				<Route exact path={path.login}>
					<Login />
				</Route>
				<Route exact path={path.signup}>
					<Signup />
				</Route>
				<Route exact path={path.admin}>
					<Admin />
				</Route>
				<Route exact path={path.profile}>
					<Profile/>
				</Route>
				<Route exact path={path.company}>
					<Company/>
				</Route>
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default withInit(Router);
