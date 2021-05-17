import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {} from "../../redux/company/companythunks";
import { Modal, Button, Form } from "react-bootstrap";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import imageToBase64 from "image-to-base64/browser";

export default function EditCompanyImages() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const dispatch = useDispatch();
	const handleShow = () => setShow(true);
	const getUploadParams = ({ meta }) => {
		return { url: "https://httpbin.org/post" };
	};

	// const [state, setState] = useState({
	// 	images: [],
	// });

	const handleChangeStatus = ({ meta }, status) => {
		console.log(status, meta);
	};

	// const company = useSelector((state) => state.companies.singleCompany);
	const handleSubmit = useCallback(
		(files, allFiles) => {
			console.log(files);
			files.forEach((image) => {
				imageToBase64(image.meta.previewUrl).then((response) => {
					dispatch()
				});
			})
				allFiles.forEach((f) => f.remove());
				setShow(false);
		},
		[dispatch]
	);

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Edit company MainImage
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit company</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Company image</Form.Label>
							<Dropzone
								getUploadParams={getUploadParams}
								onChangeStatus={handleChangeStatus}
								onSubmit={handleSubmit}
								maxFiles={2}
								inputContent="Drop 2 Files"
								inputWithFilesContent={(files) => `${2 - files.length} more`}
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
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal.Body>
			</Modal>
		</>
	);
}
