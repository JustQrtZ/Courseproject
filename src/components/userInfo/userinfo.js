import React, { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/profile/profilethunks";
import { Button, Col, Card } from "react-bootstrap";
import { changeLanguage } from "../../redux/profile/profilethunks";
import CreateCompany from "../../components/editcompany/editcompany";
import moment from 'moment';

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
		<Col>
			<Card className="my-2">
				<Card.Header>
					{t("Username")}
					{" : "}
					{profileInfo.username}
				</Card.Header>
				<Card.Body className="text-left">
					<Card.Text>
						{t("Email")}
						{" : "}
						{profileInfo.email}
					</Card.Text>
					<Card.Text>
						{t("Language")}
						{" : "}
						<Button variant="outline-secondary" onClick={handleSwitchLanguage}>
							{i18n.language}
						</Button>
					</Card.Text>
					<Card.Text>
						{t("Design theme")}
						{" : "}
						{profileInfo.designTheme}
					</Card.Text>
					<Card.Text>
						{t("Lasttimelogin")}
						{" : "}
						{moment(profileInfo.lastLoginDate).format('LLL')}
					</Card.Text>
				</Card.Body>
				<Card.Footer>
					<CreateCompany target="createCompany" title={t("Create company")} />
				</Card.Footer>
			</Card>
		</Col>
	);
}
