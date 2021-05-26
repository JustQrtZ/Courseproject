import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import UserInfo from "../../components/userInfo/userinfo";
import UserBenefits from "../../components/userbenefits/userbenefits";
import UserCompanies from "../../components/userCompanies/userCompanies";
import CreateCompany from "../../components/editcompany/editcompany";

const Profile = () => {
	const { t } = useTranslation();

	return (
		<Container>
			<h3>{t("Profile")}</h3>
			<Row>
				<UserInfo />
				<Col>
					<UserBenefits />
				</Col>
				<Col>
					<h1>{t("Your companies")}</h1>
					<CreateCompany target="createCompany" title="Create company" />
					<UserCompanies />
				</Col>
			</Row>
		</Container>
	);
};

export default Profile;
