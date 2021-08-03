import { Col, Divider, Row, Image } from 'antd';
import React from 'react';

import './NewsList.scss';

function NewsList(props) {
  const { allNews } = props;
  const trendNews = allNews.slice(0, 1)[0];
  const subNews = allNews.slice(1, 4);
  const otherNews = allNews.slice(4);
  return allNews ? (
    <div className="newList__root">
      <Divider></Divider>
      <Row>
        <Col md={24} lg={16}>
          <div className="img-trend">
            <Image src={trendNews?.urlToImage} alt="" width="100%" height="auto" />
          </div>
        </Col>

        <Col md={24} lg={8}>
          <div className="trend-content">
            <div>
              <p className="newList__title">{trendNews?.title}</p>
              <p className="newList__description">{trendNews?.description}</p>
            </div>
            <p className="newList__author">{trendNews?.author}</p>
          </div>
        </Col>
      </Row>
      <Divider></Divider>

      <Row>
        {subNews.map((item, index) => (
          <Col md={24} lg={8} key={index}>
            <div className="subNews__paper">
              <div>
                <Image src={item?.urlToImage} alt="not found" width="100%" height="auto" />
                <p className="newList__title">{item?.title}</p>
                <p className="newList__description">{item?.description}</p>
              </div>
              <p className="newList__author">{item?.author}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Divider></Divider>
      <Row>
        {otherNews.map((news, index) => (
          <Col className="otherNews">
            <img className="news__avatar" shape="square" alt="Not found" src={news?.urlToImage} />
            <div className="otherNews__content">
              <p className="news__title">{news.title}</p>
              <p className="news__description">{news.description}</p>
              <p className="news__author">{news.author}</p>
              <Divider></Divider>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  ) : (
    <></>
  );
}

export default NewsList;
