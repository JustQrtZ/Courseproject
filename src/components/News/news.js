import React, { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Row, Container, Col, Button } from "react-bootstrap";
import { getAllNews } from "../../redux/news/newsthunks";
import "./style.css";

export default function News(companyId) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.account);
  const news = useSelector((state) => state.news);

	const { t } = useTranslation();

	useEffect(() => {
		dispatch(getAllNews(companyId));
	}, [dispatch, companyId]);

  if(news.data === undefined)
  {
    return (
      <Container className="text-center">
        <h1>No news to display</h1>
      </Container>
    )
  }
	return (
		<Container>
      TUK
		</Container>
	);
}
