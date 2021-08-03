import React from 'react';
import { Row, Col, Typography } from 'antd';

import OverviewCard from '../../components/OverviewCard';
import OverviewLineChart from '../../components/OverviewLineChart';
import OverviewMap from '../../components/OverviewMap';
import OverviewPieChart from '../../components/OverviewPieChart';
import OverViewTable from '../../components/OverviewTable';
import TableStatistics from '../../components/TableStatistics';
import './Dashboard.scss';
const { Title } = Typography;

export default function Dashboard() {
  return (
    <div className="home">
      <Title level={2} className="home__title" type="success">
        COVID-19 WORLDWIDE
      </Title>
      <OverviewCard />
      <Title level={2} className="home__title" type="success">
        World covid map
      </Title>
      <OverviewMap />

      <Title level={2} className="home__title" type="success">
        World covid graph
      </Title>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} md={12} lg={16}>
          <OverviewLineChart />
        </Col>
        <Col className="gutter-row" xs={24} md={12} lg={8}>
          <OverviewPieChart />
        </Col>
      </Row>
      {/* <OverViewTable /> */}
      <Title level={2} className="home__title" type="success">
        Covid statistics by country
      </Title>

      <TableStatistics />
    </div>
  );
}
