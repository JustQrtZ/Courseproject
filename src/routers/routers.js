import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Login from "../pages/login/login";
import { path } from "./path";
// import { NotFound } from "../pages/notFaund/notFound";
// import Registration from "../pages/registration/registration";
import { useSelector } from "react-redux";
// import withInit from "../hoc/withinit";
import Main from "../pages/main/main";
import Login from "../pages/login/login";
import Signup from "../pages/registration/registration";
import { NotFound } from "../pages/notFaund/notFound";
import Topbar from "../components/topbar/topbar";

const Router = () => {
	const isLogin = useSelector((state) => state.account.isLogIn);
	console.log({ isLogin });
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
				<Route path="*">
					<NotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
