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

	console.log({ userBenefits })
	return (
		<>
			<Container style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
				<h1>{t("Your benefits")}</h1>
			</Container>
			{userBenefits.length !== 0
				? userBenefits.map((item) => {
					return (
						<Container className="thing my-2 ml-0 w-100">
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
				: t("Doesn't have benefits")
			}
		</>
	);
}
