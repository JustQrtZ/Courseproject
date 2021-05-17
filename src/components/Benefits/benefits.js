import React, { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyBenefits } from "../../redux/benefits/benefitsthunks";
import { Row, Container, Col, Button } from "react-bootstrap";
import { createPayment } from "../../redux/benefits/benefitsthunks";

export default function CompanyBenefits() {
  const dispatch = useDispatch();
	const { singleCompany } = useSelector((state) => state.companies);
	const { benefits } = useSelector((state) => state.benefits);
	const { t } = useTranslation();
	useEffect(() => {
		dispatch(getCompanyBenefits(singleCompany.id));
	}, [dispatch, singleCompany.id]);

  const CompanyBenefitsClick = useCallback(
		(benefitId) => {
			dispatch(createPayment(benefitId, singleCompany.id));
      alert("Payment success");
		},
		[dispatch, singleCompany.id]
	);

	return (
			<Container>
				<Row>
					{benefits !== undefined
						? benefits.map((item) => {
								return (
									<Row key={item.id}>
										<Col key={item.id}>
											<Container key={item.id}>
												{t("Benefit id")}
												{" : "}
												{item.id}
											</Container>
											<Container key={item.name}>
												{t("Benefit name")}
												{" : "}
												{item.name}
											</Container>
											<Container key={item.cost}>
												{t("Cost")}
												{" : "}
												{item.cost}
											</Container>
											<Button
												onClick={() => CompanyBenefitsClick(item.id)}
											>
												Support
											</Button>
										</Col>
									</Row>
								);
						  })
						: "Doesn't have benefits"}
				</Row>
			</Container>
	);
}
