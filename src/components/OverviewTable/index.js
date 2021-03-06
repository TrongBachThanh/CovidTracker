import React, { useState, useEffect } from 'react';

import 'antd/dist/antd.css';
import useSWR from 'swr';

import { help } from '../../utils/help';
import Table from './Table';
import './OverviewTable.scss';

function OverviewTable(props) {
  const handleCovidData = url =>
    fetch(url)
      .then(response => response.json())
      .then(data =>
        data.map((country, index) => ({
          key: country.countryInfo._id,
          country: country.country,
          flag: country.countryInfo.flag,
          continent: country.continent,
          cases: country.cases,
          todayCases: country.todayCases,
          deaths: country.deaths,
          todayDeaths: country.todayDeaths,
          active: country.active,
          recovered: country.recovered,
          todayRecovered: country.todayRecovered
        }))
      );

  const { data } = useSWR('https://disease.sh/v3/covid-19/countries', handleCovidData);

  const columns = [
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      width: 50,
      sorter: { compare: help.sortAlphabetic, multiple: 8 },
      render: (text, record) => {
        return (
          <div>
            <div>{record.country}</div>
            <img src={record.flag} width="30" height="20" />
          </div>
        );
      }
    },
    {
      title: 'Continent',
      dataIndex: 'continent',
      key: 'continent',
      filters: [
        {
          text: 'Asia',
          value: 'Asia'
        },
        {
          text: 'Africa',
          value: 'Arica'
        },
        {
          text: 'Australia',
          value: 'Australia-Oceania'
        },
        ,
        {
          text: 'North America',
          value: 'North America'
        },
        ,
        {
          text: 'South America',
          value: 'South America'
        },
        ,
        {
          text: 'Europe',
          value: 'Europe'
        }
      ],
      onFilter: (value, record) => record.continent.indexOf(value) === 0,
      responsive: ['sm']
    },
    {
      title: 'Cases',
      dataIndex: 'cases',
      key: 'cases',
      sorter: { compare: help.sortNumber, multiple: 7 }
    },
    {
      title: 'Today Cases',
      dataIndex: 'todayCases',
      key: 'todayCases',
      sorter: { compare: help.sortNumber, multiple: 6 }
    },
    {
      title: 'Deaths',
      dataIndex: 'deaths',
      key: 'deaths',
      sorter: { compare: help.sortNumber, multiple: 5 }
    },
    {
      title: 'Today Deaths',
      dataIndex: 'todayDeaths',
      key: 'todayDeaths',
      sorter: { compare: help.sortNumber, multiple: 4 }
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      responsive: ['sm'],
      sorter: { compare: help.sortNumber, multiple: 3 }
    },
    {
      title: 'Recovered',
      dataIndex: 'recovered',
      key: 'recovered',
      sorter: { compare: help.sortNumber, multiple: 2 }
    },
    {
      title: 'Today Recovered',
      dataIndex: 'todayRecovered',
      key: 'todayRecovered',
      sorter: { compare: help.sortNumber, multiple: 1 }
    }
  ];

  return (
    <div className="overviewtable">
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default OverviewTable;
