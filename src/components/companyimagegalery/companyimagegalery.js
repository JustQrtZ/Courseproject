import React from "react";
import { Carousel } from "react-bootstrap";

export default function CompanyPhotos({ images }) {
	return (
		<Carousel>
			{images.map((i) => {
				return (
					<Carousel.Item key={i.id}>
						<img className="d-block w-100" src={i.photoUrl} alt="ti nakosyachol"/>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
}
