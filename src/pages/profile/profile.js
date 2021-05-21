import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row,Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
	getUserBenefits,
	getUserCompanies,
	getUserProfile,
} from "../../redux/profile/profilethunks";
import UserInfo from "../../components/userInfo/userinfo";
import UserBenefits from "../../components/userbenefits/userbenefits";

const Profile = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserBenefits());
		dispatch(getUserCompanies());
		dispatch(getUserProfile());
	}, [dispatch]);

	return (
		<Container>
			<Container>{t("Profile")}</Container>
			<Container>
				<UserInfo />
			</Container>
			<Container>
				<Row>
					<Col>
						<UserBenefits />
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default Profile;
