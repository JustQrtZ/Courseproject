import React, { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyBenefits } from "../../redux/benefits/benefitsthunks";
import { Row, Container, Col, Button } from "react-bootstrap";
import { createPayment, deleteBenefit } from "../../redux/benefits/benefitsthunks";
import EditBenefit from "../CreateCompanyBenefit/createCompanyBenefit";
import "./style.css";
import { useToasts } from 'react-toast-notifications';

export default function CompanyBenefits() {
	const dispatch = useDispatch();
	const { singleCompany } = useSelector((state) => state.companies);
	const { benefits, error } = useSelector((state) => state.benefits);
	const { isLogIn } = useSelector((state) => state.account);
	const user = useSelector((state) => state.account);
	const { addToast, removeAllToasts } = useToasts()

	const { t } = useTranslation();
	useEffect(() => {
		dispatch(getCompanyBenefits(singleCompany.id));
	}, [dispatch, singleCompany.id]);

	const CompanyBenefitsClick = useCallback(
		(benefitId) => {
			dispatch(createPayment(benefitId, singleCompany.id));
			removeAllToasts();
			addToast("Payment success", {
				placement: "top-center",
				appearance: "success",
			});
		},
		[dispatch, singleCompany.id, addToast, removeAllToasts]
	);

	const DeleteBenefitClick = useCallback((item) => {
		dispatch(deleteBenefit(item.id, singleCompany.id));
	}, [dispatch, singleCompany.id])

	useEffect(() => {
		if (error !== "") {
			removeAllToasts();
			addToast(error, {
				placement: "top-center",
				appearance: "error",
			}
			)
		}
	}, [error, addToast, removeAllToasts])

	console.log({benefits})

	return (
		<Container>
			<Row className="justify-content-center">
				{benefits.length !== 0
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
										<>
											<Col>
												<Row>
													<EditBenefit
														target="editBenefit"
														benefit={item}
														company={singleCompany}
														title="Edit benefit"
													/>
												</Row>
												<Row>
													<Button className="w-100 h-100 mt-1" onClick={() => DeleteBenefitClick(item)}>Delete</Button>
												</Row>
											</Col>
										</>
									)}
							</Col>
						);
					})
					: "Doesn't have benefits"}
			</Row>
		</Container>
	);
}
