import React, { useEffect } from "react";
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
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCompany } from "../../redux/company/companythunks";
import "react-image-gallery/styles/css/image-gallery.css";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import Dayjs from "dayjs";
import CompanyPhotos from "../../components/companyimagegalery/companyimagegalery";
import YoutubeEmbed from "../../components/youtubevideoforcompany/YoutubeEmbed";

export default function Company() {
	let { id } = useParams();
	const dispatch = useDispatch();
	const { singleCompany, loading } = useSelector((state) => state.companies);
	const { t } = useTranslation();
	useEffect(() => {
		dispatch(getSingleCompany(id));
	}, [dispatch, id]);

	if (loading) {
		return null;
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
						{singleCompany.theme}
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
					<ProgressBar animated now={singleCompany.сompletionPercentage} />
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
							{singleCompany.tags.map((i) => (
								<Col className="pl-0 pr-0 ml-1">
									<Badge
										key={i}
										variant="secondary"
									>
										{i}
									</Badge>
								</Col>
							))}
						</Row>
					</Container>
				</Col>
				<Col className="col-md-6 col-lg-6 col-12">
					<Container>
						<hi>Prewiew video</hi>
						<YoutubeEmbed embedId="rokGy0huYEA" />
					</Container>
					<Container>
						<hi>Image galery</hi>
						<CompanyPhotos companyId={singleCompany.id} />
					</Container>
				</Col>
			</Row>
			<Row className="flex-column mt-lg-4 mt-2 mt-md-3">
				<Tabs className="justify-content-center">
					<Tab
						eventKey="description"
						title="Description"
						className="text-center"
					>
						<ReactMarkdown remarkPlugins={[[gfm, { singleTilde: false }]]}>
							# Hello, *world*!
						</ReactMarkdown>
					</Tab>
					<Tab
						eventKey="benefits"
						title="Benefits"
						className="justify-content-center"
					>
						benefits
					</Tab>
					<Tab eventKey="news" title="News">
						news
					</Tab>
				</Tabs>
			</Row>
		</Container>
	);
}
