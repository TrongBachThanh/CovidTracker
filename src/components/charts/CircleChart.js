import React from 'react';
import { Pie } from '@ant-design/charts';
import _ from 'lodash';

function CircleChart(props) {
  //   console.log('Props CircleChart', props);
  const { report } = props;
  let dataChart = [
    {
      type: 'Cases',
      value: _.sum(report?.cases && Object.values(report?.cases))
    },
    {
      type: 'Deaths',
      value: _.sum(report?.cases && Object.values(report?.deaths))
    },
    {
      type: 'Recovered',
      value: _.sum(report?.cases && Object.values(report?.recovered))
    }
  ];
  var config = {
    appendPadding: 10,
    data: dataChart,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    autoFit: true,
    label: {
      type: 'outer',
      content: '{percentage}'
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }]
  };
  return <Pie {...config} />;
}
export default CircleChart;
