import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import axios from 'axios';

export default function Global() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const formatData = data => {
    console.log('Data format', data);
  };

  useEffect(() => {
    const getCovidData = () => {
      axios
        .get(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`)
        .then(response => {
          console.log('DATA COVID', response.data);
          formatData(response.data);
        })
        .catch(() => {
          alert(`Request to API failed, Please try again !!!`);
        });
    };

    getCovidData();
    setTimeout(() => {}, 2000);
  }, []);

  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => {
        console.log('fetch data failed', error);
      });
  };
  var config = {
    data: data,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat((v / 1000000000).toFixed(1), ' B');
        }
      }
    },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000
      }
    }
  };
  return (
    <div className="container-line">
      {console.log('data', data)}
      <Line {...config} />
    </div>
  );
}
