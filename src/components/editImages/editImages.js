import React, {
	forwardRef,
	useState,
	useCallback,
	useEffect,
	useImperativeHandle,
} from "react";
import {} from "../../redux/company/companythunks";
import { Form } from "react-bootstrap";
import "react-dropzone-uploader/dist/styles.css";
import imageToBase64 from "image-to-base64/browser";
import { useDropzone } from "react-dropzone";
import * as S from "./style";
import { TrashFill } from "react-bootstrap-icons";

export const EditCompanyImages = forwardRef(
	({ imageCount, target, title, companyPhotos }, ref) => {

		function removeFile(file, e) {
			e.preventDefault();
			const newFiles = [...files];
			const filtered = newFiles.filter(function (value, index, arr) {
				return value !== file;
			});
			setFiles(filtered);
		}

		const [files, setFiles] = useState(companyPhotos);

		useImperativeHandle(ref, () => ({
			handleSubmit: async () => {
				const b64 = [];
				for (const image of files) {
					const response = await imageToBase64(image.blob);
					b64.push(response);
				}
				return b64;
			},
		}),[files]);

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

		console.log(files, "files");
		const thumbs = files.map((file, i) => (
			<S.Thumb key={i}>
				<S.ThumbInner key={i}>
					<S.Img key={file.id} src={file.blob} alt="Ты накосячил" />
					<S.RemoveButton key={file.blob} onClick={(e) => removeFile(file, e)}>
						<TrashFill key={i} />
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
				{/* <Button
				className={"w-100"}
				onClick={(e) => {
					handleSubmit(e);
				}}
			>
				Submit
			</Button> */}
			</Form.Group>
		);
	}
);
