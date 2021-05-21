import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../redux/company/companythunks";
import { Form, Button } from "react-bootstrap";
import "react-dropzone-uploader/dist/styles.css";
import imageToBase64 from "image-to-base64/browser";
import { Modal } from "../Modal/modal";
import { useDropzone } from "react-dropzone";
import * as S from "./style";
import { actions } from "../../redux/company/consts";

export default function EditCompanyImages({ imageCount, target, title }) {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const handleShow = () => setShow((state) => !state);
	const [files, setFiles] = useState([]);
	const [base64Files, setBase64Files] = useState([]);
	const companyPhotos = useSelector(
		(state) => state.companies.singleCompany.photos
	);

	useEffect(() => {
		setFiles(companyPhotos);
	}, [companyPhotos]);

	const handleSubmit = useCallback(async () => {
		for (const image of files) {
			const response = await imageToBase64(image.blob);
			const netData = base64Files;
			setBase64Files(netData.push(response));
		}
		dispatch({
			type: actions.editCompanyImageGalety,
			payload: base64Files,
		});
		console.log(base64Files);
		handleShow();
	}, [dispatch, files, base64Files]);

	const onDrop = useCallback((acceptedFiles) => {
		console.log(acceptedFiles);
		setFiles(
			acceptedFiles.map((file) => {
				return Object.assign(file, {
					preview: URL.createObjectURL(file),
					blob: URL.createObjectURL(file),
				});
			})
		);
	}, []);

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	const thumbs = files.map((file) => (
		<S.Thumb key={file.name}>
			<S.ThumbInner>
				<S.Img
					key={file.preview ?? file.photoUrl}
					src={file.preview ?? file.photoUrl}
					alt="Ты накосячил"
				/>
			</S.ThumbInner>
		</S.Thumb>
	));

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: "image/*",
		maxFiles: 1,
	});

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Edit company MainImage
			</Button>
			<Modal
				visible={show}
				handleVisible={handleShow}
				saveChanges={handleSubmit}
				title={"Edit"}
			>
				<Form>
					<Form.Group>
						<Form.Label>Company image</Form.Label>
						<S.DropZone {...getRootProps({ className: "dropzone" })}>
							<input {...getInputProps()} />
							{isDragActive ? (
								<S.DropzoneText>
									Drop onli one the files here ...
								</S.DropzoneText>
							) : (
								<S.DropzoneText>
									Drag 'n' drop one {title} here, or click to select file
								</S.DropzoneText>
							)}
						</S.DropZone>
						<S.ThumbsContainer>{thumbs}</S.ThumbsContainer>
					</Form.Group>
				</Form>
			</Modal>
		</>
	);
}
