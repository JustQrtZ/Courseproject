import React, { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { path } from "../../routers/path";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Topbar = () => {
	const { t, i18n } = useTranslation();
	const handleSwitchLanguage = () => {
		if (i18n.language === "en") {
			i18n.changeLanguage("ru");
			localStorage.setItem("lng", "ru");
		} else if (i18n.language === "ru") {
			i18n.changeLanguage("en");
			localStorage.setItem("lng", "en");
		}
	};

	const isLogin = useSelector((state) => state.account.isLogIn);
	useEffect(()=>{
		console.log(isLogin)
	})
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand href={path.main}>Crowdfunding</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse className="justify-content-end">
				{!isLogin && (
					<Nav>
						<Nav.Link eventKey="link-1" href={path.login}>
							{t("Login")}
						</Nav.Link>
						<Nav.Link eventKey="link-2" href={path.signup}>
							{t("Signup")}
						</Nav.Link>
					</Nav>
				)}
				<button onClick={handleSwitchLanguage} className="switchLangBtn">
					{i18n.language}
				</button>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Topbar;
