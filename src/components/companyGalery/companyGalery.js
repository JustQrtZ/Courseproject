import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";

export default function companyGalery({ images, videoUrl }) {
	const YoutubeSlide = ({ url }) => (
		<ReactPlayer width="100%" url={url} playing={false} key="0"/>
	);

	const getVideoThumb = (videoId) =>
		`https://img.youtube.com/vi/${videoId}/default.jpg`;

	const customRenderItem = (item, props) => (
		<item.type {...item.props} {...props} />
	);

	const getVideoId = (url) =>
		url.substr("https://www.youtube.com/embed/".length, url.length);

	const customRenderThumb = (children) => {
			const arr1 = children.map((item) => {
				if (item.key === "youtube-1") {
					const videoId = getVideoId(item.props.url);
					return <img src={getVideoThumb(videoId)} alt="ti nakosyachol" key="youtube-1-t" />;
				}
				return null;
			});

		const arr2 = children[1].map((item) => {
			return (
				<img
					src={item.props.children.props.src}
					style={{ height: 52, width: 70 }}
					alt="ti nakosyachol"
					key={item.id}
				/>
			);
		});

		var filtered = arr1.concat(arr2).filter(function (el) {
			return el != null;
		});
		return filtered;
	};

	return (
		<Carousel showArrows={false} renderItem={customRenderItem} renderThumbs={customRenderThumb}>
			<YoutubeSlide
				key="youtube-1"
				url={"https://www.youtube.com/embed/" + videoUrl.substring(17).trim()}
			/>
			{images.map((i) => {
				return (
					<div key={i.id.toString()} className="h-100">
						<img
							src={i.photoUrl}
							alt="ti nakosyachol"
							style={{ height: 350, objectFit: "upset" }}
						/>
					</div>
				);
			})}
		</Carousel>
	);
}
