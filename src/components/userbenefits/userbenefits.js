import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUserBenefits } from "../../redux/profile/profilethunks";
import { Container, Col } from "react-bootstrap";

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
								<Container>
									{t("Benefit id")}
									{" : "}
									{item.id}
								</Container>
								<Container>
									{t("Benefit name")}
									{" : "}
									{item.name}
								</Container>
								<Container>
									{t("Cost")}
									{" : "}
									{item.cost}
								</Container>
							</Col>
						);
				  })
				: "Doesn't have benefits"}
		</Container>
	);
}
