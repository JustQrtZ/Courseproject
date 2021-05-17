import React from "react";
import "./style.css";
import { useSelector } from "react-redux";

export default function UserInfo(videoUrl) {
	const {singleCompany} = useSelector((state) => state.companies);
	const url = "https://www.youtube.com/embed/"+singleCompany.videoUrl.substring(17).trim();
	return (
		<div className="video-responsive">
			<iframe
				width="100vh"
				height="100vw"
				src={url}
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				title="Embedded youtube"
			/>
		</div>
	);
}