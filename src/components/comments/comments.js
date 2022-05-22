import React, { useState, useEffect, useCallback } from "react";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import { Row, Container, Col, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
import Moment from 'react-moment';
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
		if (state.accessToken !== "") {
			const connect = new HubConnectionBuilder()
				.withUrl('wss://crowdfundingback.azurewebsites.net/comments', {
					skipNegotiation: true,
					accessTokenFactory: () => state.accessToken,
					transport: HttpTransportType.WebSockets,
				})
				.withAutomaticReconnect()
				.build();
			setConnection(connect);
		} else {
			const connect = new HubConnectionBuilder()
				.withUrl('wss://crowdfundingback.azurewebsites.net/comments', {
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
					console.log({data});
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
			UserId: user.id,
			Content: state.message,
			CrowdfundingCompanyId: companyId,
		});
	}, [companyId, state.message, user.id, connection]);

	const likeOrDislikeClick = useCallback(
		(isLike, comment) => {
			connection.invoke("CreateLikeOrDislike", {
				UserId: user.id,
				CommentId: comment,
				LikeOrDislike: isLike,
				CompanyId: companyId,
			});
		},
		[companyId, user.id, connection]
	);

	if (state.comments.length === 0) {
		return (
			<>
				<Container className="text-center">
					<h1>No comments to display</h1>
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
	}

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
								<Moment fromNow utc local>{item.creationDate}</Moment>
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
