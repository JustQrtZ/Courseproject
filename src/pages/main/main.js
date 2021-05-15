import React, { useEffect } from "react";
import { Card, Row, Container, Col, ProgressBar, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllCompanies } from "../../redux/company/companythunks";
import ReactStars from "react-rating-stars-component";
import Dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom"

export default function Main() {
	const { data } = useSelector((state) => state.companies);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllCompanies());
	}, [dispatch]);

	const { t } = useTranslation();

	return (
		<Container className="container-fluid">
			<Row className="d-flex flex-wrap">
				{data.map((item) => (
					<Col
						key={item.id}
						className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex align-items-stretch my-3"
					>
							<Card>
								<Card.Img
									variant="top"
									src={item.mainPhotoUrl}
									style={{ height: 250, objectFit: "cover" }}
								/>
								<Card.Header>{t(item.theme)}</Card.Header>
								<Card.Body className="mb-0 px-1">
									<Link to={{pathname: "/company/"+item.id}}><Card.Title>{item.title}</Card.Title></Link>
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
					</Col>
				))}
			</Row>
		</Container>
	);
}
