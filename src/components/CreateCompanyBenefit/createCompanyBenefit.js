import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createBenefit, editBenefit } from "../../redux/benefits/benefitsthunks";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function CreateCompanyBenefit({ target, benefit, company, title }) {
	const dispatch = useDispatch();
	const [state, setState] = useState({
		id: benefit?.id ?? "",
		Name: benefit?.name ?? "",
		Cost: benefit?.cost ?? "",
		Company: company?.id ?? ""
	});

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const { t } = useTranslation();
	const handleShow = () => setShow(true);

	const onChange = (field) => (event) => {
		setState((state) => ({ ...state, [field]: event.target.value }));
	};

	const CompanyBenefitsClick = useCallback(() => {
		if (target === "editBenefit") {
			dispatch(editBenefit(state))
		} else {
			dispatch(createBenefit(state.Name, state.Cost, state.Company));
		}
		setShow(false);
	}, [dispatch, state, target]);


	return (
		<>
			<Button variant="primary" onClick={handleShow} className="w-100 h-100">
				{t(title)}
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
