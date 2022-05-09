import React, { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCompany } from "../../redux/company/companythunks";
import { createCompany } from "../../redux/profile/profilethunks";
import { Modal, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "react-dropzone-uploader/dist/styles.css";
import Dayjs from "dayjs";
import Tags from "../tags/tags";
import { EditCompanyImages } from "../editImages/editImages";

export default function EditCompany({ company, target, title }) {
	const mainPhotoChild = useRef();
	const imageGaleyChild = useRef();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const dispatch = useDispatch();
	const handleShow = () => setShow(true);
	const { t } = useTranslation();

	const [state, setState] = useState({
		id: company?.id ?? null,
		title: company?.title ?? "",
		description: company?.description ?? "",
		mainPhotoUrl: company?.mainPhotoUrl ?? "Education",
		theme: company?.theme ?? "",
		requiredAmount: company?.requiredAmount ?? "",
		endCompanyDate: Dayjs(company?.endCompanyDate).format("YYYY-MM-DD") ?? null,
		сollectedNow: company?.сollectedNow ?? "",
		videoUrl: company?.videoUrl ?? "",
		tags: company?.tags ?? [],
		photos: company?.photos ?? [],
	});

	console.log(state);
	const onChange = (field) => (event) => {
		setState((state) => ({ ...state, [field]: event.target.value }));
	};

	const editedCompany = useSelector((state) => state.companies.editedCompany);

	const editCompanyClick = useCallback(async () => {
		const mainPhoto = await mainPhotoChild.current.handleSubmit();
		const ImageGalery = await imageGaleyChild.current.handleSubmit();

		if (target === "createCompany") {
			dispatch(createCompany(state, editedCompany, mainPhoto, ImageGalery));
		} else {
			dispatch(editCompany(state, editedCompany, mainPhoto, ImageGalery));
		}

		setShow(false);
	}, [dispatch, state, editedCompany, target]);

	return (
		<>
			<Button variant="primary" onClick={handleShow} className="w-100">
				{t(title)}
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{t(title)}</Modal.Title>
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
							<Form.Label>{t("Company description")}</Form.Label>
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
							<Form.Label>{t("Required amount")}</Form.Label>
							<Form.Control
								type="number"
								placeholder={t("Enterrequiredamount")}
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
							companyPhotos={
								target !== "createCompany"
									? [{ id: 1, blob: state.mainPhotoUrl }]
									: []
							}
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
