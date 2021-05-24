import React, { useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {
	Container,
	Row,
	Image,
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
import CompanyPhotos from "../../components/companyimagegalery/companyimagegalery";
import YoutubeEmbed from "../../components/youtubevideoforcompany/YoutubeEmbed";
import EditCompany from "../../components/editcompany/editcompany";
import CompanyImages from "../../components/editCompanyImages/editCompanyImages";
import Benefits from "../../components/Benefits/benefits";
import CreateCompanyBenefit from "../../components/CreateCompanyBenefit/createCompanyBenefit";

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

	console.log(singleCompanyRating.userRating);
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
			<Row>
				<Col className="col-md-6 col-lg-6 col-12">
					<Image
						src={singleCompany.mainPhotoUrl}
						className="mh-50"
						style={{ maxHeight: 350, maxWidth: 250 }}
					/>
					<Container>
						{t("Company name")}
						{" : "}
						{singleCompany.title}
					</Container>
					<Container>
						{t("Company theme")}
						{" : "}
						{t(singleCompany.theme)}
					</Container>
					<Container>
						{t("Need tocollect")}
						{" : "}
						{singleCompany.requiredAmount}
					</Container>
					<Container>
						{t("Company endDate")}
						{" : "}
						{Dayjs(singleCompany.endCompanyDate).format("DD/MM/YYYY")}
					</Container>
					<Container>
						{t("Collected")}
						{" : "}
						{singleCompany.сollectedNow}$
					</Container>
					<ProgressBar
						animated
						now={singleCompany.сompletionPercentage}
						className="w-50"
					/>
					<Container>
						<ReactStars
							count={5}
							edit={false}
							value={singleCompany.rating}
							size={25}
						/>
					</Container>
					<Container className="d-flex justify-content-start bd-highlight mb-3">
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
					</Container>
					{(user.role === "Admin" || user.id === singleCompany.owner) &&
						user.isLogIn === true && (
							<Container>
								<Row>
									<EditCompany company={singleCompany} />
								</Row>
								<Row>
									<CompanyImages />
								</Row>
								<Row>
									<CreateCompanyBenefit />
								</Row>
							</Container>
						)}
				</Col>
				<Col className="col-md-6 col-lg-6 col-12">
					<Container>
						<h1>{t("Prewiewvideo")}</h1>
						<YoutubeEmbed videoUrl={singleCompany.videoUrl} />
					</Container>
					<Container>
						<h1>{t("Image galery")}</h1>
						<CompanyPhotos images={singleCompany.photos} />
					</Container>
				</Col>
			</Row>
			<Row className="flex-column mt-lg-4 mt-2 mt-md-3">
				<Tabs className="justify-content-center">
					<Tab
						eventKey="description"
						title={t("Description")}
						className="text-center"
					>
						<ReactMarkdown remarkPlugins={[[gfm, { singleTilde: false }]]}>
							{singleCompany.description}
						</ReactMarkdown>
						{user.isLogIn === true &&(
									<ReactStars
										size={60}
										isHalf={false}
										activeColor={"red"}
										value={singleCompanyRating.userRating}
										onChange={RatingStartClick}
										classNames="d-flex justify-content-center w-100"
									/>
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
						news
					</Tab>
				</Tabs>
			</Row>
		</Container>
	);
}
