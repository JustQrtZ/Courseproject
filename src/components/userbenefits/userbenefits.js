import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUserBenefits } from "../../redux/profile/profilethunks";
import { Row, Container, Col } from "react-bootstrap";

export default function UserBenefits() {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { userBenefits } = useSelector((state) => state.profile);

	useEffect(() => {
		dispatch(getUserBenefits());
	}, [dispatch]);

	return (
		<Container>
			{userBenefits.benefits !== undefined
				? userBenefits.benefits.map((item) => {
						return (
							<Col key={item.id}>
								<Row>
									{t("Benefit id")}
									{" : "}
									{item.id}
								</Row>
								<Row>
									{t("Benefit name")}
									{" : "}
									{item.name}
								</Row>
								<Row>
									{t("Cost")}
									{" : "}
									{item.cost}
								</Row>
							</Col>
						);
				  })
				: "Doesn't have benefits"}
		</Container>
	);
}
