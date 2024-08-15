import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import NullImage from "../../components/Images/nullImage.png";
import { useDispatch, useSelector } from "react-redux";
import { searchArticle } from "../../store/action";
import { useParams } from "react-router-dom";
import { Col, Row, Form } from "react-bootstrap";
import { header, noFound, searching } from "../../utils/util";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [totalArticles, setTotalArticle] = useState(0);
  const [selectedSource, setSelectedSource] = useState("newsapi");
  const { articles, loading } = useSelector((state) => state.search);
  const { query } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchArticle(searchQuery, selectedSource));
    }
  }, [searchQuery, selectedSource, dispatch]);

  useEffect(() => {
    setTotalArticle(articles.totalArticles);
  }, [articles]);

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title =
    totalArticles === 0
      ? noFound
      : loading
      ? searching
      : `${capitaLize(searchQuery)} - News`;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="header">
            {totalArticles === 0 ? noFound : header(capitaLize(searchQuery))}
          </h1>
          <div className="container">
            <Row className="mb-4">
              <Col sm={4}>
                <Form.Group controlId="sourceSelect">
                  <Form.Label className="fieldLabel">Select Source</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                  >
                    <option value="newsapi">NewsAPI</option>
                    <option value="guardianapis">The Guardian</option>
                    <option value="nyt">The New York Times</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {articles?.map((element) => {
                return (
                  <Col sm={12} md={6} lg={4} xl={3} key={uuidv4()}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      published={element.publishedAt}
                      channel={element.source.name}
                      alt="News image"
                      publishedAt={element.publishedAt}
                      imageUrl={
                        element.imageUrl === null ? NullImage : element.imageUrl
                      }
                      urlNews={element.url}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </>
      )}
    </>
  );
}

export default Search;
