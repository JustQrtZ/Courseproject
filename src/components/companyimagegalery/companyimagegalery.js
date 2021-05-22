import React from "react";
import { Carousel } from "react-bootstrap";
import "./style.css"

export default function CompanyPhotos({ images }) {
	return (
		<Carousel style={{height:550}}> 
			{images.map((i) => {
				return (
					<Carousel.Item key={i.id} className="h-100">
						<img className="d-block w-100 h-100" src={i.photoUrl} alt="ti nakosyachol"/>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
}
