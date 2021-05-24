import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUserBenefits } from "../../redux/profile/profilethunks";
import { Col, Row } from "react-bootstrap";
import "./style.css"

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
							<Col key={item.id} className="thing my-2">
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
		</>
	);
}
