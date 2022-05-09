import React, { useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
	Container,
	Row,
	ProgressBar,
	Badge,
	Col,
	Tabs,
	Tab,
	Spinner,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getSingleCompany,
	createCompanyRating,
	getUserCompanyRating,
} from "../../redux/company/companythunks";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import Dayjs from "dayjs";
import CompanyGalery from "../../components/companyGalery/companyGalery";
import EditCompany from "../../components/editcompany/editcompany";
import Benefits from "../../components/Benefits/benefits";
import CreateCompanyBenefit from "../../components/CreateCompanyBenefit/createCompanyBenefit";
import {Comments} from "../../components/comments/comments"
import News from "../../components/News/news"

import "./style.css";

export default function Company() {
	const user = useSelector((state) => state.account);
	let { id } = useParams();
	const dispatch = useDispatch();
	const { singleCompany, loading, singleCompanyRating } = useSelector(
		(state) => state.companies
	);

	const { t } = useTranslation();
	useEffect(() => {
		dispatch(getSingleCompany(id));
		if (user.isLogIn === true) {
			dispatch(getUserCompanyRating(id));
		}
	}, [dispatch, id, user.isLogIn]);

	const RatingStartClick = useCallback(
		(item) => {
			dispatch(createCompanyRating(item, singleCompany.id));
		},
		[dispatch, singleCompany.id]
	);

	if (loading || singleCompanyRating.ratingLoad) {
		return (
			<Container className="position-absolute">
				<Spinner animation="border" role="status">
					<span className="sr-only" />
				</Spinner>
			</Container>
		);
	}

	return (
		<Container className="mt-5 mb-5">
			<Row className="justify-content-between">
				<Col className="col-md-7 col-lg-7 col-12 px-0">
					<Container className="text-center px-0">
						<CompanyGalery
							images={singleCompany.photos}
							videoUrl={singleCompany.videoUrl}
						/>
					</Container>
				</Col>
				<Col className="col-md-4 col-lg-4 col-12">
					{/* <Image src={singleCompany.mainPhotoUrl} style={{height:350, width:250}} /> */}
					<Row>
						<h1>{singleCompany.title}</h1>
					</Row>
					<Row>
						{t("Company theme")}
						{" : "}
						{t(singleCompany.theme)}
					</Row>
					<Row>
						{t("Need tocollect")}
						{" : "}
						{singleCompany.requiredAmount}
					</Row>
					<Row>
						{t("Company endDate")}
						{" : "}
						{Dayjs(singleCompany.endCompanyDate).format("DD/MM/YYYY")}
					</Row>
					<Row>
						{t("Collected")}
						{" : "}
						{singleCompany.сollectedNow}$
					</Row>
					<ProgressBar
						animated
						now={singleCompany.сompletionPercentage}
						className="row w-100"
					/>
					<Row>
						<ReactStars
							count={5}
							edit={false}
							value={singleCompany.rating}
							size={25}
						/>
					</Row>
					<Row className="d-flex justify-content-start bd-highlight">
						<Row>
							<Col>Tags: </Col>
							{singleCompany.tags.length !== 0 &&
								singleCompany.tags.map((i) => (
									<Col className="pl-0 pr-0 ml-1" key={i}>
										<Badge key={i.value} variant="secondary">
											{i}
										</Badge>
									</Col>
								))}
						</Row>
					</Row>
					{(user.role === "Admin" || user.id === singleCompany.owner) &&
						user.isLogIn === true && (
							<>
								<Row>
									<EditCompany company={singleCompany} title="Edit company"/>
								</Row>
								<Row>
									<CreateCompanyBenefit company={singleCompany} title="Create benefit"/>
								</Row>
							</>
						)}
				</Col>
			</Row>
			<Row>
				<Col>
					<Tabs className="justify-content-center">
						<Tab
							eventKey="description"
							title={t("Description")}
							className="text-center"
						>
							<ReactMarkdown remarkPlugins={[[gfm, { singleTilde: false }]]}>
								{singleCompany.description}
							</ReactMarkdown>
							{user.isLogIn === true && (
								<>
									<h2>You can rate the company:</h2>
									<ReactStars
										size={60}
										isHalf={false}
										activeColor={"red"}
										value={singleCompanyRating.userRating}
										onChange={RatingStartClick}
										classNames="d-flex justify-content-center w-100"
									/>
								</>
							)}
						</Tab>
						<Tab
							eventKey="benefits"
							title={t("Benefits")}
							className="justify-content-center"
						>
							<Benefits />
						</Tab>
						<Tab eventKey="news" title={t("News")}>
							<News companyId={singleCompany.id}/>
						</Tab>
						<Tab eventKey="comments" title={t("Comments")}>
							<Comments token = {localStorage.getItem("accessToken")} companyId={singleCompany.id}/>
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</Container>
	);
}
