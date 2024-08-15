import React, { useEffect, useState } from "react";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row, Form } from "react-bootstrap";
import { header } from "../../utils/util";
import buildEndpointPath from "../../services/buildEndpointPath";
import fetchArticles from "../../services/fetchArticles";
import categoriesBySource from "../../config/sourceFilters";
import "./news.style.css";
import dateFieldConfig from "../../config/dateFieldConfig";

function News({ newscategory = "general", country = "us" }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState("newsapi");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableCategories, setAvailableCategories] = useState(
    categoriesBySource[selectedSource]
  );
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const category = selectedCategory || newscategory;
  const title = capitaLize(category);
  document.title = `${capitaLize(title)} - News`;

  useEffect(() => {
    const updatenews = async () => {
      setLoading(true);
      try {
        const url = buildEndpointPath({
          source: selectedSource,
          country,
          category: selectedCategory,
          date: fromDate,
          fromDate,
          toDate: dateFieldConfig[selectedSource].showToDate ? toDate : "",
        });
        const response = await fetchArticles(url, selectedSource);
        const parsedData = response;
        setArticles(parsedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    updatenews();
  }, [country, selectedCategory, selectedSource, fromDate, toDate]);

  useEffect(() => {
    setAvailableCategories(categoriesBySource[selectedSource] || []);
    setSelectedCategory("");
    if (!dateFieldConfig[selectedSource].showToDate) {
      setToDate("");
    }
  }, [selectedSource]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="header">{header(capitaLize(category))}</h1>
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
              <Col sm={4}>
                <Form.Group controlId="categorySelect">
                  <Form.Label className="fieldLabel">
                    Select a Category
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    disabled={!availableCategories.length}
                  >
                    {availableCategories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              {dateFieldConfig[selectedSource].showFromDate && (
                <Col sm={4}>
                  <Form.Group controlId="dateSelectFrom">
                    <Form.Label className="fieldLabel">From Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              )}
              {dateFieldConfig[selectedSource].showToDate && (
                <Col sm={4}>
                  <Form.Group controlId="dateSelectTo">
                    <Form.Label className="fieldLabel">To Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>

            <Row>
              {articles.length > 0 ? (
                articles.map((element) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={uuidv4()}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      published={element.publishedAt}
                      channel={element.source}
                      alt="News image"
                      publishedAt={element.publishedAt}
                      imageUrl={
                        element.imageUrl === null ? NullImage : element.imageUrl
                      }
                      urlNews={element.url}
                    />
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="no-results-message">No results found</p>
                </Col>
              )}
            </Row>
          </div>
        </>
      )}
    </>
  );
}

export default News;
