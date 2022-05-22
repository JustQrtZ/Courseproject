import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteCompany } from "../../redux/company/companythunks";
import { Modal, Button, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function DeleteCompany({ company, title }) {
	const dispatch = useDispatch();
	
	const [state] = useState({
		CompanyId: company?.id
	});

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { t } = useTranslation();

	const DeleteCompanyClick = useCallback(() => {
		dispatch(deleteCompany(state.CompanyId));
		setShow(false);
		window.location = window.location.origin;
	}, [dispatch, state.CompanyId]);


	return (
		<>
			<Button variant="primary" onClick={handleShow} className="w-100 h-100">
				{t(title)}
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{t("Delete company")}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<h1>{t("DeleteCompanyWarningMessage")}</h1>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						{t("Close")}
					</Button>
						<Button variant="primary" onClick={DeleteCompanyClick}>
							{t("Delete")}
						</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
