import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { path } from "../../routers/path";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./style.css"

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

	const LogOut = () => {
		localStorage.clear();
		window.location.reload();
		window.location.href = "../";
	};

	const isLogin = useSelector((state) => state.account.isLogIn);
	const Role = useSelector((state) => state.account.role);

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
				{isLogin && Role === "Admin" && (
					<Nav>
						<Nav.Link eventKey="link-1" href={path.admin}>
							{t("Adminka")}
						</Nav.Link>
					</Nav>
				)}
				{isLogin && (
					<Nav>
						<Nav.Link eventKey="link-1" href={path.profile}>
							{t("Profile")}
						</Nav.Link>
						<Button variant="outline-secondary" onClick={LogOut}>
							{t("Logout")}
						</Button>
					</Nav>
				)}
				<Button
					variant="outline-secondary"
					onClick={handleSwitchLanguage}
					className="switchLangBtn"
				>
					{i18n.language}
				</Button>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Topbar;
