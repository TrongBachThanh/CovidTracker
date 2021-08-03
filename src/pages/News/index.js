import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Skeleton } from 'antd';
import axios from 'axios';

import { GlobalActions } from '../../redux/slices/globalSlice';
import { useDispatch } from 'react-redux';

import newApi from '../../apis/newsApi';
import NewsList from './NewsList';
import './News.scss';

const { Meta } = Card;

function News() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getAllNews = async () => {
    const res = await newApi.getAllNews();
    setNews(res);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        getAllNews();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }, 2000);
  }, []);
  return (
    <div className="news">
      <Row>
        <Col span={24}>
          {isLoading ? (
            <Skeleton className="lineskeleton" paragraph={{ rows: 16 }} active />
          ) : (
            <NewsList allNews={news} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default News;
