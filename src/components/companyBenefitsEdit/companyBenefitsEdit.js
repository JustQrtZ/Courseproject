import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uloadPhoto, editCompany } from "../../redux/company/companythunks";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";


export default function CompanyBenefits(video) {
	const dispatch = useDispatch();
	const [state, setState] = useState({ Name: "", Cost: ""});
	const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
	const { t } = useTranslation();
	const { singleCompany } = useSelector((state) => state.companies);

	const onChange = (field) => (event) => {
		setState((state) => ({ ...state, [field]: event.target.value }));
	};

  const CompanyBenefitsClick = useCallback(() => {
		dispatch(editCompany());
		setShow(false);
	}, [dispatch, state, editedCompany.tags]);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Add company benefit
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Company benefit</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Company benefit name</Form.Label>
						<Form.Control
							type="text"
							placeholder={t("Enter company benefit name")}
							value={state.Name}
							onChange={onChange("Name")}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Company benefit cost</Form.Label>
						<Form.Control
							type="number"
							placeholder={t("Enter company benefit cost")}
							value={state.Cost}
							onChange={onChange("Cost")}
						/>
					</Form.Group>
				</Modal.Body>
        <Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={CompanyBenefitsClick}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
