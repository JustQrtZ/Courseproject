import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import UserInfo from "../../components/userInfo/userinfo";
import UserBenefits from "../../components/userbenefits/userbenefits";
import UserCompanies from "../../components/userCompanies/userCompanies";

const Profile = () => {
	const { t } = useTranslation();

	return (
		<Container>
			<Container>{t("Profile")}</Container>
			<Row>
				<UserInfo />
				<Col>
					<UserBenefits />
				</Col>
				<Col>
					<UserCompanies />
				</Col>
			</Row>
		</Container>
	);
};

export default Profile;
