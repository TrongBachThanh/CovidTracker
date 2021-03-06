import React, { useRef, useState, useEffect } from 'react';

import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import 'mapbox-gl/dist/mapbox-gl.css';

import { help } from '../../utils/help';
import './OverviewMap.scss';

mapboxgl.accessToken = `pk.eyJ1Ijoic3Vuc3RyaWtlMTEyIiwiYSI6ImNrcXV4OTY2djA2bDIydXBjNHZobTBtbzMifQ.BYCyLBgyOMbG7eycxXX_6A`;

function OverviewMap() {
  const covidMap = useRef(null);
  const [map, setMap] = useState(null);
  const [loadMap, setLoadMap] = useState(false);

  const { data } = useSWR('https://disease.sh/v3/covid-19/jhucsse', help.getDataMap);

  useEffect(() => {
    if (data && covidMap.current && !map) {
      const overviewMap = help.declareMap(covidMap);
      setMap(covidMap);
      const popup = help.declarePopup();
      help.configMap(overviewMap, popup, data);
    }
  }, [data, covidMap, map]);
  console.log(covidMap);

  return (
    <div className="container">
      <div className="overviewmap">
        <div ref={covidMap}></div>
      </div>
    </div>
  );
}

export default OverviewMap;

// import React, { useRef, useState, useEffect } from 'react';

// import { Skeleton } from 'antd';
// import mapboxgl from 'mapbox-gl';
// import useSWR from 'swr';
// import 'mapbox-gl/dist/mapbox-gl.css';

// import './OverviewMap.scss';
// import { help } from '../../utils/help';

// mapboxgl.accessToken = `pk.eyJ1Ijoic3Vuc3RyaWtlMTEyIiwiYSI6ImNrcXV4OTY2djA2bDIydXBjNHZobTBtbzMifQ.BYCyLBgyOMbG7eycxXX_6A`;

// function OverviewMap() {
//   const covidMap = useRef(null);
//   const [loadMap, setLoadMap] = useState(false);
//   const getDataMap = url =>
//     fetch(url)
//       .then(response => response.json())
//       .then(data =>
//         data.map((point, index) => ({
//           type: 'Feature',
//           geometry: {
//             type: 'Point',
//             coordinates: [point.coordinates.longitude, point.coordinates.latitude]
//           },
//           properties: {
//             id: index,
//             country: point.country,
//             province: point.province,
//             cases: point.stats.confirmed,
//             deaths: point.stats.deaths,
//             recovered: point.stats.recovered
//           }
//         }))
//       );

//   const { data } = useSWR('https://disease.sh/v3/covid-19/jhucsse', getDataMap);

//   useEffect(() => {
//     setTimeout(() => {
//       if (data) {
//         const map = help.declareMap(covidMap);
//         const popup = help.declarePopup();
//         help.configMap(map, popup, data);
//       }
//       setLoadMap(true);
//     }, 2000);
//   }, [data]);

//   return (
//     <div className="container">
//       {loadMap == false ? (
//         <Skeleton className="mapskeleton" paragraph={{ rows: 18 }} active />
//       ) : (
//         <div className="overviewmap">
//           <div ref={covidMap}></div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default OverviewMap;
