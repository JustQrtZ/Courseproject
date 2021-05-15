import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotosForCompany } from "../../redux/company/companythunks";
import { Carousel } from "react-bootstrap";

export default function CompanyPhotos({ companyId }) {
	const dispatch = useDispatch();
	const { companyPhotos } = useSelector((state) => state.companies);
	useEffect(() => {
		dispatch(getPhotosForCompany(companyId));
	},[dispatch, companyId]);

	return (
		<Carousel>
			{companyPhotos.map((i) => {
				return (
					<Carousel.Item key={i.id}>
						<img className="d-block w-100" src={i.photoUrl} alt="ti nakosyachol"/>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
}
