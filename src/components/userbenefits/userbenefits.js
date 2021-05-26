import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUserBenefits } from "../../redux/profile/profilethunks";
import { Col, Row, Container } from "react-bootstrap";
import "./style.css";

export default function UserBenefits() {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { userBenefits } = useSelector((state) => state.profile);

	useEffect(() => {
		dispatch(getUserBenefits());
	}, [dispatch]);

	return (
		<>
			<h1>Ваши бенефиты</h1>
			{userBenefits.benefits !== undefined
				? userBenefits.benefits.map((item) => {
						return (
							<Container className="thing my-2 ml-0">
								<Col key={item.id}>
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
							</Container>
						);
				  })
				: "Doesn't have benefits"}
		</>
	);
}
