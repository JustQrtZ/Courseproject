import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUserCompanies } from "../../redux/profile/profilethunks";
import {
	Row,
	Container,
	Col,
	Card,
	Button,
	Badge,
	ProgressBar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ReactStars from "react-rating-stars-component";
import Dayjs from "dayjs";
import gfm from "remark-gfm";

export default function CompanyBenefits() {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile);
	const { t } = useTranslation();
	useEffect(() => {
		dispatch(getUserCompanies());
	}, [dispatch]);

	return (
		<Container>
			<Row>
				<h1>Ваши компании</h1>
				{profile.userCompanies !== undefined
					? profile.userCompanies.map((item) => {
							return (
								<Row key={item.id}>
									<Col
										key={item.id}
										className="col-lg-7 col-md-8 col-sm-12 col-12 d-flex align-items-stretch my-3"
									>
										<Link
											to={{ pathname: "/company/" + item.id }}
											style={{ textDecoration: "none" }}
										>
											<Card
												as={Button}
												variant="light"
												className="d-flex h-100"
											>
												<Card.Img
													variant="top"
													src={item.mainPhotoUrl}
													style={{ height: 250, objectFit: "cover" }}
													className="mx-0"
												/>
												<Card.Header className="w-100">
													{t(item.theme)}
												</Card.Header>
												<Card.Body className="mb-0 w-100">
													<Card.Title className="w-100">
														{item.title}
													</Card.Title>
													<ReactMarkdown
														remarkPlugins={[[gfm, { singleTilde: false }]]}
														className="my-0 px-0"
													>
														{item.description}
													</ReactMarkdown>
													{item.tags.map((i) => (
														<Badge key={i} variant="secondary" className="mr-1">
															{i}
														</Badge>
													))}
													<ReactStars
														count={5}
														edit={false}
														value={item.rating}
														size={25}
														classNames="d-flex justify-content-center w-100"
													/>
												</Card.Body>
												<Container className="d-flex mb-0 justify-content-between px-1">
													<Card.Text className="mb-0 px-1">
														${item.сollectedNow} {t("USD raised")}
													</Card.Text>
													<Card.Text className="mb-0 px-1">
														{item.сompletionPercentage}%
													</Card.Text>
												</Container>
												<ProgressBar
													now={item.сompletionPercentage}
													className="w-100"
												/>
												<Card.Footer className="w-100">
													{t("End date")}{" "}
													{Dayjs(item.endCompanyDate).format("DD/MM/YYYY")}
												</Card.Footer>
											</Card>
										</Link>
									</Col>
								</Row>
							);
					  })
					: "Doesn't have benefits"}
			</Row>
		</Container>
	);
}
