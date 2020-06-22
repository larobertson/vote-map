import React, { useEffect, useState } from 'react';
import { Marker } from 'google-maps-react';
import Axios from 'axios';
import _ from 'lodash';

const mapKey = `${process.env.REACT_APP_MAP_API_KEY}`;

const SetPin = (props) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  console.log('props???', props);

  const {
    map,
    google,
    mapCenter,
  } = props;


  useEffect(() => {
    const getMarker = async () => {
      let addressQ = (props.address).split(' ').join('+')
      const reqUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressQ}&key=${mapKey}`;
      const res = await Axios.get(reqUrl);
      console.log('res', res);
      console.log('lat lng?', _.get(res, 'data.results[0].geometry.location.lat'), _.get(res, 'data.results[0].geometry.location.lng'));
      setLat(_.get(res, 'data.results[0].geometry.location.lat'));
      setLng(_.get(res, 'data.results[0].geometry.location.lng'));
      console.log(lat, lng);
    }
    getMarker();
  }, [lat, lng])

  return (
      <Marker map={map} google={google} mapCenter={mapCenter} position={{lat, lng}}/>
  );
};

export default SetPin;