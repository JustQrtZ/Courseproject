import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Card, Container } from "react-bootstrap";
import { getAllNews } from "../../redux/news/newsthunks";
import "./style.css";
import moment from 'moment';

export default function News(companyId) {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllNews(companyId));
  }, [dispatch, companyId]);
  
  if (news.news.length === 0) {
    return (
      <Container className="text-center">
        <h1>{t("ThereAreNoNewsToDisplay")}</h1>
      </Container>
    )
  }

  return (
    news.news.map((item) => {
      return (
        <Container id={item.id}>
          <Card className="my-2">
            <Card.Header>
              {item.title}
            </Card.Header>
            <Card.Body className="text-left">
            <Card.Img
									variant="top"
									src={item.imageUrl}
									style={{ height: 250, objectFit: "cover" }}
									className="mx-0"
								/>
              <Card.Text>
                {item.content}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              {moment(item.creationDate).format('LLL')}
            </Card.Footer>
          </Card>
        </Container>
      )
    }
    )
  )
}
