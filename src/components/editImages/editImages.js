import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {} from "../../redux/company/companythunks";
import { Form, Button } from "react-bootstrap";
import "react-dropzone-uploader/dist/styles.css";
import imageToBase64 from "image-to-base64/browser";
import { useDropzone } from "react-dropzone";
import * as S from "./style";
import { actions } from "../../redux/company/consts";
import { TrashFill } from "react-bootstrap-icons";

export default function EditCompanyImages({
	imageCount,
	target,
	title,
	companyPhotos,
}) {
	const dispatch = useDispatch();

	function removeFile(file, e) {
		e.preventDefault();
		const newFiles = [...files];
		const filtered = newFiles.filter(function(value,index,arr){
			return value !==file
		})
		// newFiles.splice(newFiles.indexOf(file), 1);
		setFiles(filtered);
	}

	const [files, setFiles] = useState(companyPhotos)

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			const b64 = [];
			console.log(files)
			for (const image of files) {
				const response = await imageToBase64(image.blob);
				b64.push(response);
			}
			console.log(b64)
			if (target === "mainPhoto") {
				dispatch({
					type: actions.editCompanyMainImage,
					payload: b64[0],
				});
			}
			if (target === "companyPhoto") {
				dispatch({
					type: actions.editCompanyImageGalety,
					payload: b64,
				});
			}
		},
		[dispatch, files, target]
	);

	const onDrop = useCallback((acceptedFiles) => {
		console.log(acceptedFiles, "acceptedFiles");
		setFiles(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
					blob: URL.createObjectURL(file),
				})
			)
		);
	}, []);

	useEffect(() => {
		// Make sure to revoke the data uris to avoid memory leaks
		files.forEach((file) => URL.revokeObjectURL(file.preview));
	}, [files]);

	console.log(files,"files")
	const thumbs = files.map((file) => (
		<S.Thumb key={file.id}>
			<S.ThumbInner key={file.id}>
				<S.Img key={file.blob} src={file.blob} alt="Ты накосячил" />
				<S.RemoveButton onClick={(e) => removeFile(file, e)}>
					<TrashFill />
				</S.RemoveButton>
			</S.ThumbInner>
		</S.Thumb>
	));

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: "image/*",
		maxFiles: imageCount,
	});

	return (
		<Form.Group>
			<Form.Label>Company image</Form.Label>
			<S.DropZone {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<S.DropzoneText>Drop onli one the files here ...</S.DropzoneText>
				) : (
					<S.DropzoneText>
						Drag 'n' drop one {title} here, or click to select file
					</S.DropzoneText>
				)}
			</S.DropZone>
			<S.ThumbsContainer>{thumbs}</S.ThumbsContainer>
			<Button
				className={"w-100"}
				onClick={(e) => {
					handleSubmit(e);
				}}
			>
				Submit
			</Button>
		</Form.Group>
	);
}
