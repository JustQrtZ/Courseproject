import React, { useState, useEffect, useCallback } from "react";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import { Row, Container, Col, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
import "./style.css";

export const Comments = ({ token, companyId }) => {
	const [connection, setConnection] = useState(null);

	const [state, setState] = useState({
		accessToken: token ?? "",
		comments: [],
		status: false,
		message: "",
	});

	useEffect(() => {
		console.log(state.accessToken);
		if (state.accessToken !== "") {
			console.log("TUK");
			const connect = new HubConnectionBuilder()
				.withUrl("https://webapp-210513212326.azurewebsites.net/comments", {
					skipNegotiation: true,
					accessTokenFactory: () => state.accessToken,
					transport: HttpTransportType.WebSockets,
				})
				.withAutomaticReconnect()
				.build();
			setConnection(connect);
		} else {
			const connect = new HubConnectionBuilder()
				.withUrl("https://webapp-210513212326.azurewebsites.net/comments", {
					skipNegotiation: true,
					transport: HttpTransportType.WebSockets,
				})
				.withAutomaticReconnect()
				.build();
			setConnection(connect);
		}
	}, [state.accessToken]);

	useEffect(() => {
		if (connection) {
			connection.start().then(() => {
				connection.invoke("JoinGroup", companyId);
				connection.on("allComments", (data) => {
					setState((state) => ({ ...state, comments: data }));
				});
				connection.on("addCommentSuccess", (data) => {
					setState((state) => ({ ...state, comments: data }));
				});
				connection.on("likeOrDislike", (data) => {
					setState((state) => ({ ...state, comments: data }));
				});
			});
		}
	}, [connection, companyId, state.accessToken]);

	const user = useSelector((state) => state.account);

	const { t } = useTranslation();

	const onChange = (field) => (event) => {
		setState((state) => ({ ...state, [field]: event.target.value }));
	};

	const sendMessageClick = useCallback(() => {
		connection.invoke("CreateComment", {
			User: user.id,
			Content: state.message,
			Company: companyId,
		});
	}, [companyId, state.message, user.id, connection]);

	const likeOrDislikeClick = useCallback(
		(isLike, comment) => {
			connection.invoke("CreateLikeOrDislike", {
				User: user.id,
				Comment: comment,
				LikeOrDislike: isLike,
				Company: companyId,
			});
		},
		[companyId, user.id, connection]
	);

	return (
		<>
			<Container className="d-flex flex-column justify-content-center">
				{state.comments.map((item) => (
					<Container
						key={item.id}
						className="thingC col-lg-10 col-md-10 col-sm-10 col-12 my-2"
					>
						<Row key={item.content} className="d-flex justify-content-between">
							<Col>{item.content}</Col>
							<Col className="d-flex align-items-center justify-content-end">
								Like count: {item.likeCount}
								{user.isLogIn && (
									<>
										<Button
											className="ml-1"
											onClick={() => likeOrDislikeClick(true, item.id)}
										>
											<HandThumbsUp />
										</Button>
										<Button
											className="ml-1"
											onClick={() => likeOrDislikeClick(false, item.id)}
										>
											<HandThumbsDown />
										</Button>
									</>
								)}
							</Col>
						</Row>
						<Row className="d-flex justify-content-between">
							<Col key={item.user}>User: {item.user}</Col>
							<Col
								key={item.creationDate}
								className="d-flex justify-content-end"
							>
								<p>Creation date:</p> {item.creationDate}
							</Col>
						</Row>
					</Container>
				))}
			</Container>
			{user.isLogIn && (
				<Container className="col-lg-10 col-md-10 col-sm-10 col-12 mt-4">
					<Form.Control
						type="text"
						placeholder="Enter message"
						value={state.message}
						onChange={onChange("message")}
					/>
					<Button
						variant="outline-primary"
						className="w-100"
						onClick={sendMessageClick}
					>
						{t("Submit")}
					</Button>
				</Container>
			)}
		</>
	);
};
