import React from 'react';
import { useSelector } from 'react-redux';

import loaderGif from '../../assets/images/loader.gif';
import './GlobalLoading.scss';
export default function GlobalLoading() {
  const isLoading = useSelector(state => state.GlobalReducer.isLoading);
  if (!isLoading) return null;
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={loaderGif}></img>
      </div>
    </div>
  );
}
