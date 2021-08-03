import React from 'react';
import { AutoComplete, Avatar } from 'antd';

export default function CountrySelector(props) {
  const { onCountryChange, countries = [] } = props;
  const renderCountryOptions = countries.map(option => ({
    value: option.country,
    label: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Avatar src={option.flag} shape="square" />
        <div style={{ marginLeft: '1rem', fontSize: '16px' }}>{option.country}</div>
      </div>
    )
  }));
  return (
    <div>
      <AutoComplete
        autoFocus
        notFoundContent="No options"
        style={{
          width: '80%',
          margin: '1rem auto',
          display: 'block'
        }}
        onSelect={onCountryChange}
        defaultValue="Vietnam"
        options={renderCountryOptions}
        placeholder="Select country"
        filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    </div>
  );
}
