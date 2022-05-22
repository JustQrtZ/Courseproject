import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserInfo from "../../components/userInfo/userinfo";
import UserBenefits from "../../components/userbenefits/userbenefits";
import UserCompanies from "../../components/userCompanies/userCompanies";

const Profile = () => {
	return (
		<Container>
			<Row>
				<UserInfo />
			</Row>
			<Row>
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
