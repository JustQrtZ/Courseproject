import React, { useEffect } from "react";
import { Card, Row, Container, Col, ProgressBar, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllCompanies } from "../../redux/company/companythunks";
import ReactStars from "react-rating-stars-component";
import Dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function Main() {
	const { data } = useSelector((state) => state.companies);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllCompanies());
	}, [dispatch]);

	const { t } = useTranslation();

	function siteSelectedCallback() {
		console.log("tuk");
	}


	return (
		<Container>
			<Row className="mx-5 my-5 d-flex">
				{data.map((item) => (
					<Col
						key={item.id}
						className="col-lg-3 d-flex align-items-stretch my-3"
					>
						<a
							style={{ cursor: "pointer" }}
							key={item.id}
							onClick={siteSelectedCallback}
							href="www.google.com"
						>
							<Card>
								<Card.Img
									variant="top"
									src={item.mainPhotoUrl}
									style={{ height: 250, objectFit: "cover" }}
								/>
								<Card.Header>{t(item.theme)}</Card.Header>
								<Card.Body className="mb-0 px-1">
									<Card.Title>{item.title}</Card.Title>
									{item.description}
									<br />
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
								<ProgressBar now={item.сompletionPercentage} />
								<Card.Footer>
									{t("End date")}{" "}
									{Dayjs(item.endCompanyDate).format("DD/MM/YYYY")}
								</Card.Footer>
							</Card>
						</a>
					</Col>
				))}
			</Row>
		</Container>
	);
}
