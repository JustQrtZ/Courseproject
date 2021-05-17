import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBenefit } from "../../redux/benefits/benefitsthunks";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function CreateCompanyBenefit() {
	const dispatch = useDispatch();
	const [state, setState] = useState({ Name: "", Cost: "" });
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const { t } = useTranslation();
	const { singleCompany } = useSelector((state) => state.companies);
	const handleShow = () => setShow(true);

	const onChange = (field) => (event) => {
		setState((state) => ({ ...state, [field]: event.target.value }));
	};

	const CompanyBenefitsClick = useCallback(() => {
		dispatch(createBenefit(state.Name,state.Cost,singleCompany.id));
		setShow(false);
	}, [dispatch, state, singleCompany.id]);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				{t("Addcompanybenefit")}
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{t("Company benefit")}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>{t("Companybenefitname")}</Form.Label>
						<Form.Control
							type="text"
							placeholder={t("Entercompanybenefitname")}
							value={state.Name}
							onChange={onChange("Name")}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>{t("Companybenefitcost")}</Form.Label>
						<Form.Control
							type="number"
							placeholder={t("Entercompanybenefitcost")}
							value={state.Cost}
							onChange={onChange("Cost")}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						{t("Close")}
					</Button>
					<Button variant="primary" onClick={CompanyBenefitsClick}>
						{t("Save Changes")}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
