import React, { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyBenefits } from "../../redux/benefits/benefitsthunks";
import { Row, Container, Col, Button } from "react-bootstrap";
import { createPayment } from "../../redux/benefits/benefitsthunks";
import EditBenefit from "../CreateCompanyBenefit/createCompanyBenefit";
import "./style.css";

export default function CompanyBenefits() {
	const dispatch = useDispatch();
	const { singleCompany } = useSelector((state) => state.companies);
	const { benefits } = useSelector((state) => state.benefits);
	const { isLogIn } = useSelector((state) => state.account);
	const user = useSelector((state) => state.account);

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
			<Row className="justify-content-center">
				{benefits !== undefined
					? benefits.map((item) => {
							return (
								<Col
									key={item.id}
									className="thing col-lg-5 col-md-5 col-sm-12 col-12 d-flex align-items-stretch my-3 px-1 mx-2"
								>
									<Col>
										<Row key={item.name}>
											{t("Name")}
											{" : "}
											{item.name}
										</Row>
										<Row key={item.cost}>
											{t("Cost")}
											{" : "}
											{item.cost}
										</Row>
									</Col>
									{isLogIn === true && (
										<Col>
											<Button
												className="w-100 h-100"
												onClick={() => CompanyBenefitsClick(item.id)}
											>
												{t("Support")}
											</Button>
										</Col>
									)}
									{(user.role === "Admin" || user.id === singleCompany.owner) &&
										user.isLogIn === true && (
											<Col>
												<EditBenefit
													target="editBenefit"
													benefit={item}
													company={singleCompany}
													title="Edit benefit"
												/>
											</Col>
										)}
								</Col>
							);
					  })
					: "Doesn't have benefits"}
			</Row>
		</Container>
	);
}
