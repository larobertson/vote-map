import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import Axios from 'axios';
import _ from 'lodash';

import SetPin from './SetPin';

const mapKey = `${process.env.REACT_APP_MAP_API_KEY}`;

const mapStyles = {
  width: '70vw',
  height: '70vh',
};

export const MapContainer = (props) =>{
  const {
    voterAddress,
    earlyVotingLocations,
    electionDayLocations,
    showEarlyVotingLocations
  } = props;

  const [lat, setLat] = useState(31.5686);
  const [lng, setLng] = useState(-99.9018);
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    if (voterAddress) {
      const getGeocode = async () => {
        let addressQ = (voterAddress).split(' ').join('+')
        const reqUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressQ}&key=${mapKey}`;
        const res = await Axios.get(reqUrl);
        console.log('res', res);
        console.log('lat lng?', _.get(res, 'data.results[0].geometry.location.lat'), _.get(res, 'data.results[0].geometry.location.lng'));
        setLat(_.get(res, 'data.results[0].geometry.location.lat'));
        setLng(_.get(res, 'data.results[0].geometry.location.lng'));
        setZoom(12);
        console.log(lat, lng);
      }
      getGeocode();
    }
  }, [voterAddress, lat, lng])

    return (
      <Map
        google={props.google}
        zoom={zoom}
        style={mapStyles}
        center = {{lat, lng}}
        initialCenter={{
         lat: 31.5686,
         lng: -99.9018
        }}
      >
        {voterAddress ? <SetPin address={voterAddress} origin={true} name={'My Address'} /> : null}
        {earlyVotingLocations.length && earlyVotingLocations[0].address && showEarlyVotingLocations ? _.map(earlyVotingLocations, (loc) => {
          return <SetPin address={loc.address} name={loc.name} time={loc.time} lat={lat} lng={lng} />
        }) : null}
        {electionDayLocations.length && electionDayLocations[0].address && !showEarlyVotingLocations ? _.map(electionDayLocations, (loc) => {
          return <SetPin address={loc.address} name={loc.name} time={loc.time} lat={lat} lng={lng} />
        }) : null}
        <InfoWindow/>
      </Map>
    );
}

export default GoogleApiWrapper({
  apiKey: `${mapKey}`
})(MapContainer);