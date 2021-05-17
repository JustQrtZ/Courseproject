import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uloadPhoto, editCompany } from "../../redux/company/companythunks";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import imageToBase64 from "image-to-base64/browser";
import Dayjs from "dayjs";
import Tags from "../tags/tags";

export default function EditCompany(company) {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const dispatch = useDispatch();
	const handleShow = () => setShow(true);
	const { t } = useTranslation();
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

	const [state, setState] = useState({
		id: company.company.id,
		title: company.company.title,
		description: company.company.description,
		mainPhotoUrl: company.company.mainPhotoUrl,
		theme: company.company.theme,
		requiredAmount: company.company.requiredAmount,
		endCompanyDate: Dayjs(company.company.endCompanyDate).format("YYYY-MM-DD"),
		сollectedNow: company.company.сollectedNow,
		videoUrl: company.company.videoUrl,
	});

	const onChange = (field) => (event) => {
		setState((state) => ({ ...state, [field]: event.target.value }));
	};

	const handleChangeStatus = ({ meta }, status) => {
		console.log(status, meta);
	};

	const editedCompany = useSelector((state) => state.companies.editedCompany);

	const handleSubmit = useCallback(
		(files, allFiles) => {
			const photo = files[0].meta.previewUrl;
			imageToBase64(photo)
				.then((response) => {
					dispatch(uloadPhoto(response));
				})
					console.log(editedCompany.mainPhotoUrl);
					setState((state) => ({
						...state,
						mainPhotoUrl: editedCompany.mainPhotoUrl}))
			allFiles.forEach((f) => f.remove());
		},
		[dispatch, editedCompany.mainPhotoUrl]
	);

	const editCompanyClick = useCallback(() => {
		setState((state) => ({
			...state,
			mainPhotoUrl: editedCompany.mainPhotoUrl,
		}));
		console.log(state);
		dispatch(editCompany(state, editedCompany.tags));
		setShow(false);
	}, [dispatch, state, editedCompany.tags, editedCompany.mainPhotoUrl]);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Edit company
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit company</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Company Title</Form.Label>
							<Form.Control
								type="text"
								placeholder={t("Enter company title")}
								value={state.title}
								onChange={onChange("title")}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Company description</Form.Label>
							<Form.Control
								type="text"
								placeholder={t("Enter description")}
								value={state.description}
								onChange={onChange("description")}
							/>
						</Form.Group>
						<Form.Group controlId="exampleForm.ControlSelect1">
							<Form.Label>Company theme</Form.Label>
							<Form.Control as="select" onChange={onChange("title")}>
								<option>Education</option>
								<option>Technology</option>
								<option>Electronics</option>
							</Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Required amount</Form.Label>
							<Form.Control
								type="number"
								placeholder={t("Enter the required amount")}
								value={state.requiredAmount}
								onChange={onChange("requiredAmount")}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>End company date</Form.Label>
							<Form.Control
								type="date"
								placeholder={t("End company date")}
								value={state.endCompanyDate}
								onChange={onChange("endCompanyDate")}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Company tags</Form.Label>
							<Tags target="company" />
						</Form.Group>
						<Form.Group>
							<Form.Label>Company videoUrl</Form.Label>
							<Form.Control
								type="text"
								placeholder={t("Enter videoUrl")}
								value={state.videoUrl}
								onChange={onChange("videoUrl")}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Company main photo</Form.Label>
							<Dropzone
								getUploadParams={getUploadParams}
								onChangeStatus={handleChangeStatus}
								onSubmit={handleSubmit}
								maxFiles={1}
								inputContent="Drop 1 Files"
								inputWithFilesContent={(files) => `${1 - files.length} more`}
								accept="image/*"
								styles={{
									dropzoneReject: {
										borderColor: "red",
										backgroundColor: "#DAA",
									},
									inputLabel: (files, extra) =>
										extra.reject ? { color: "red" } : {},
								}}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={editCompanyClick}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
