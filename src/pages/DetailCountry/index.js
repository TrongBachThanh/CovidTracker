import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CountrySelector from './CountrySelector';
import { Button, Divider, Row, Col, Skeleton, Typography } from 'antd';

import covidApi from '../../apis/covidApi';
import LineChart from '../../components/charts/LineChart';
import CircleChart from '../../components/charts/CircleChart';

import './DetailCountry.scss';
const { Title } = Typography;
function DetailCountry() {
  const history = useHistory();
  const { countryName } = useParams();
  const [countries, setCountries] = useState([]);
  const [countryReport, setCountryReport] = useState({});
  const [countryId, setCountryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(45);

  const handleCountryChange = (value, option) => {
    history.push(`/countries/${value}`);
  };
  useEffect(() => {
    try {
      const handleCountriesData = async () => {
        setIsLoading(true);
        const respond = await covidApi.getSummaryAllCountry();
        const countriesData = respond.map(country => ({
          country: country.country,
          iso2: country.countryInfo.iso2?.toLowerCase(),
          flag: country.countryInfo?.flag
        }));
        setCountries(countriesData);
        setIsLoading(false);
      };
      handleCountriesData();
      console.log('handleCountriesData', countries);
    } catch (error) {
      alert('Get Data countries failed,please try again.........');
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (countryName) {
      setIsLoading(true);
      setTimeout(() => {
        const selectedCountry = countries.find(country => country.country === countryName);
        setCountryId(selectedCountry?.iso2);
        covidApi
          .getSummaryByCountry(countryName, time)
          .then(res => {
            setCountryReport(res);
            setIsLoading(false);
          })
          .catch(error => {
            alert('Get Data failed selectedCountry,please try again??????');
            setIsLoading(false);
          });
      }, 2000);
    }
  }, [countries, time, countryName]);
  return (
    <div className="country">
      <CountrySelector onCountryChange={handleCountryChange} countries={countries} />
      <Title level={3} type="success" className="country__title">
        {' '}
        {countryReport?.country}
      </Title>

      <Divider />
      <Button type={time === 45 ? 'primary' : ''} onClick={() => setTime(45)} className="btn-day ">
        45 days
      </Button>
      <Button type={time === 30 ? 'primary' : ''} onClick={() => setTime(30)} className="btn-day">
        30 days
      </Button>
      <Button type={time === 15 ? 'primary' : ''} onClick={() => setTime(15)} className="btn-day">
        15 days
      </Button>
      <Divider />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} md={12}>
          {isLoading ? (
            <Skeleton className="lineskeleton" paragraph={{ rows: 16 }} active />
          ) : (
            <LineChart report={countryReport?.timeline} />
          )}
        </Col>
        <Col className="gutter-row" xs={24} md={12}>
          {isLoading ? (
            <Skeleton className="lineskeleton" paragraph={{ rows: 16 }} active />
          ) : (
            <CircleChart report={countryReport?.timeline} />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default DetailCountry;
