import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uloadPhoto, editCompany } from "../../redux/company/companythunks";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";


export default function EditCompany(video) {
	const [state, setState] = useState({ videoUrl: video });
	const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
	const { t } = useTranslation();

	const onChange = (field) => (event) => {
		setState((state) => ({ ...state, [field]: event.target.value }));
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Edit company video
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit company video</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Company video</Form.Label>
						<Form.Control
							type="text"
							placeholder={t("Enter company video")}
							value={state.videoUrl}
							onChange={onChange("videoUrl")}
						/>
					</Form.Group>
				</Modal.Body>
			</Modal>
		</>
	);
}
