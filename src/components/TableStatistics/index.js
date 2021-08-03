import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';

import covidApi from '../../apis/covidApi';
import { help } from '../../utils/help';
import Table from './Table';

import './TableStatistics.scss';

function TableStatistics(props) {
  const [infoCountries, setInfoCountries] = useState([]);
  const handleMapData = async () => {
    // setIsLoading(true);
    const information = await covidApi.getSummaryAllCountry();
    const informationFilter = information.map((country, index) => ({
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
    }));
    setInfoCountries(informationFilter);
    console.log('informationFilter', informationFilter);

    // setIsLoading(false);
    // setInfoCountries(informationFilter);
  };
  useEffect(() => {
    try {
      handleMapData();
    } catch (error) {
      alert('Get Data failed,please try again');
      // setIsLoading(false);
    }
  }, []);

  const columns = [
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      fixed: 'left',
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
      sorter: { compare: help.sortNumber, multiple: 6 },
      responsive: ['lg']
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
      sorter: { compare: help.sortNumber, multiple: 4 },
      responsive: ['lg']
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      responsive: ['sm'],
      sorter: { compare: help.sortNumber, multiple: 3 },
      responsive: ['lg']
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
      sorter: { compare: help.sortNumber, multiple: 1 },
      responsive: ['lg']
    }
  ];

  return (
    <div className="tablestatistics">
      <Table columns={columns} dataSource={infoCountries} bordered />
    </div>
  );
}

export default TableStatistics;
