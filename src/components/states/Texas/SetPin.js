import React, { useEffect, useState } from 'react';
import { Marker, InfoWindow } from 'google-maps-react';
import Axios from 'axios';
import _ from 'lodash';

const mapKey = `${process.env.REACT_APP_MAP_API_KEY}`;

const SetPin = (props) => {
  const [lat, setLat] = useState(props.lat);
  const [lng, setLng] = useState(props.lng);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState();
  const [selectedPlace, setSelectedPlace] = useState();
  console.log('props???', props);

  const {
    map,
    google,
    mapCenter,
    address,
    name,
    time
  } = props;


  useEffect(() => {
    const getMarker = async () => {
      let addressQ = address ? (address).split(' ').join('+') : '';
      const reqUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressQ}&key=${mapKey}`;
      const res = await Axios.get(reqUrl);
      console.log('res', res);
      console.log('lat lng?', _.get(res, 'data.results[0].geometry.location.lat'), _.get(res, 'data.results[0].geometry.location.lng'));
      setLat(_.get(res, 'data.results[0].geometry.location.lat'));
      setLng(_.get(res, 'data.results[0].geometry.location.lng'));
      console.log(lat, lng);
    }
    getMarker();
  }, [address, lat, lng])

  const onMarkerClick = (props, marker, e) => {
    console.log('onMarkerClick', props, marker, e);
    setSelectedPlace(name);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  }

const onClose = props => {
  if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
  }
};

  return (
    <>
      <Marker map={map} google={google} mapCenter={mapCenter} position={{lat, lng}} name={name} onClick={onMarkerClick}/>
      <InfoWindow map={map} google={google} mapCenter={mapCenter} marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}>
            <div>
            <h4>{name}</h4>
            <p>{address}</p>
            <p>{time}</p>
          </div>
      </InfoWindow>
    </>
  );
};

export default SetPin;