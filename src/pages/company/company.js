import React, { useEffect } from "react";
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
		<Container>
			<Row>
				<Col className="col-12 col-md-6">
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
					<Container className="d-flex">
						<p>Tags: </p>
						{singleCompany.tags.map((i) => (
							<Badge key={i} variant="secondary" className="mr-1 mx-2">
								{i}
							</Badge>
						))}
					</Container>
				</Col>
				<Col className="col-12 col-md-6">
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
			<Tabs>
				<Tab eventKey="description" title="Description">
				description
				</Tab>
				<Tab eventKey="benefits" title="Benefits">
				benefits
				</Tab>
				<Tab eventKey="news" title="News">
				news
				</Tab>
			</Tabs>
		</Container>
	);
}
