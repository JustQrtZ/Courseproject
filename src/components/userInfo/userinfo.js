import React, { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/profile/profilethunks";
import { Row, Container, Button } from "react-bootstrap";
import {changeLanguage} from "../../redux/profile/profilethunks";
// import _ from 'lodash';

export default function UserInfo() {
	const dispatch = useDispatch();
	const { profileInfo } = useSelector((state) => state.profile);
	useEffect(() => {
		dispatch(getUserProfile());
	}, [dispatch]);

	const { t, i18n } = useTranslation();
	const handleSwitchLanguage = () => {
		if (i18n.language === "en") {
			i18n.changeLanguage("ru");
			localStorage.setItem("lng", "ru");
      changeLanguageClick();
		} else if (i18n.language === "ru") {
			i18n.changeLanguage("en");
			localStorage.setItem("lng", "en");
      changeLanguageClick();
		}
	};

  const changeLanguageClick = useCallback(() => {
		dispatch(changeLanguage(i18n.language));
	}, [i18n, dispatch]);

	return (
		<Container>
			<Row>
				{t("User id")}
				{" : "}
				{profileInfo.id}
			</Row>
			<Row>
				{t("Username")}
				{" : "}
				{profileInfo.username}
			</Row>
			<Row>
				{t("Email")}
				{" : "}
				{profileInfo.email}
			</Row>
			<Row>
				{t("Language")}
				{" : "}
				<Button
					variant="outline-secondary"
					onClick={handleSwitchLanguage}
					className="switchLangBtn"
				>
					{i18n.language}
				</Button>
			</Row>
			<Row>
				{t("Design theme")}
				{" : "}
				{profileInfo.designTheme}
			</Row>
			<Row>
				{t("Lasttimelogin")}
				{" : "}
				{profileInfo.lastLoginDate}
			</Row>
		</Container>
	);
}
