import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';

import { help } from '../../utils/help';

function LineChart(props) {
  const [dataChart, setDataChart] = useState([]);
  const { report } = props;
  useEffect(() => {
    if (report) {
      const cases = help.formatCases(report.cases);
      const deaths = help.formatDeaths(report.deaths);
      const recovered = help.formatRecovered(report.recovered);
      const data = cases.concat(deaths, recovered);
      setDataChart(data);
    }
  }, [report]);
  const config = {
    data: dataChart,
    xField: 'time',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat((v / 1000).toFixed(0), 'N');
        }
      }
    },
    color: ['#1979C9', '#D62A0D', '#33fa19'],
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 10000
      }
    }
  };

  return <Line className="linechart" {...config} />;
}
export default LineChart;
