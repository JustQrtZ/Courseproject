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
import ReactStars from "react-rating-stars-component";
import Dayjs from "dayjs";

export default function CompanyBenefits() {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile);
	const { t } = useTranslation();
	useEffect(() => {
		dispatch(getUserCompanies());
	}, [dispatch]);

	return (
		<>
			<Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<h1>{t("Your companies")}</h1>
			</Container>
			<Row className="d-flex flex-wrap">
				{profile.userCompanies !== undefined
					? profile.userCompanies.map((item) => {
						return (
							<Col
								key={item.id}
								className="col-lg-4 col-md-4 col-sm-6 col-12 d-flex align-items-stretch my-3"
							>
								<Link
									to={{ pathname: "/company/" + item.id }}
									style={{ textDecoration: "none" }}
								>
									<Card as={Button} variant="light" className="d-flex h-100">
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
											<Card.Title className="w-100">{item.title}</Card.Title>
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
												${item.??ollectedNow} {t("USD raised")}
											</Card.Text>
											<Card.Text className="mb-0 px-1">
												{item.??ompletionPercentage}%
											</Card.Text>
										</Container>
										<ProgressBar
											now={item.??ompletionPercentage}
											className="w-100"
										/>
										<Card.Footer className="w-100">
											{t("End date")}{" "}
											{Dayjs(item.endCompanyDate).format("DD/MM/YYYY")}
										</Card.Footer>
									</Card>
								</Link>
							</Col>
						);
					})
					: "Doesn't have benefits"}
			</Row>
		</>
	);
}
