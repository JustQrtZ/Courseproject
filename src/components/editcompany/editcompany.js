import React, { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCompany } from "../../redux/company/companythunks";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "react-dropzone-uploader/dist/styles.css";
import Dayjs from "dayjs";
import Tags from "../tags/tags";
import { EditCompanyImages } from "../editImages/editImages";

export default function EditCompany(company) {
	const mainPhotoChild = useRef();
	const imageGaleyChild = useRef();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const dispatch = useDispatch();
	const handleShow = () => setShow(true);
	const { t } = useTranslation();

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
		tags: company.company.tags,
		photos: company.company.photos,
	});

	const onChange = (field) => (event) => {
		setState((state) => ({ ...state, [field]: event.target.value }));
	};

	const editedCompany = useSelector((state) => state.companies.editedCompany);

	const editCompanyClick = useCallback(async () => {
		const mainPhoto = await mainPhotoChild.current.handleSubmit();
		const ImageGalery = await imageGaleyChild.current.handleSubmit();
		console.log(ImageGalery)
		dispatch(editCompany(state, editedCompany, mainPhoto, ImageGalery));

		setShow(false);
	}, [dispatch, state, editedCompany]);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				{t("Editcompany")}
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{t("Editcompany")}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>{t("Company title")}</Form.Label>
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
							<Form.Label>{t("Company theme")}</Form.Label>
							<Form.Control as="select" onChange={onChange("theme")}>
								<option>{t("Education")}</option>
								<option>{t("Technology")}</option>
								<option>{t("Electronics")}</option>
							</Form.Control>
						</Form.Group>
						<Form.Group>
							<Form.Label>Required amount</Form.Label>
							<Form.Control
								type="number"
								placeholder={t("Entertherequiredamount")}
								value={state.requiredAmount}
								onChange={onChange("requiredAmount")}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>{t("Endcompanydate")}</Form.Label>
							<Form.Control
								type="date"
								placeholder={t("Endcompanydate")}
								value={state.endCompanyDate}
								onChange={onChange("endCompanyDate")}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>{t("Company tags")}</Form.Label>
							<Tags target={"company"} tagsValue={state.tags} />
						</Form.Group>
						<Form.Group>
							<Form.Label>{t("Company videoUrl")}</Form.Label>
							<Form.Control
								type="text"
								placeholder={t("Enter videoUrl")}
								value={state.videoUrl}
								onChange={onChange("videoUrl")}
							/>
						</Form.Group>
						<EditCompanyImages
							imageCount={1}
							target={"mainPhoto"}
							title={"mainPhoto"}
							companyPhotos={[{ id: 1, blob: state.mainPhotoUrl }]}
							ref={mainPhotoChild}
						/>
						<EditCompanyImages
							imageCount={10}
							target={"companyPhoto"}
							title={"image gallety"}
							companyPhotos={state.photos.map((file) => ({
								id: file.id,
								blob: file.photoUrl,
							}))}
							ref={imageGaleyChild}
						/>

						{/* <Form.Group>
							<Form.Label>{t("Companymainphoto")}</Form.Label>
							<Dropzone
								getUploadParams={getUploadParams}
								onChangeStatus={handleChangeStatus}
								onSubmit={handleSubmit}
								maxFiles={1}
								inputContent={t("Drop1Files")}
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
						</Form.Group> */}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						{t("Close")}
					</Button>
					<Button variant="primary" onClick={editCompanyClick}>
						{t("Save Changes")}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
