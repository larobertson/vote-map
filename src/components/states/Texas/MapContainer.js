import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import _ from 'lodash';

import SetPin from './SetPin';

const mapStyles = {
  width: '70vw',
  height: '70vh'
};

export const MapContainer = (props) =>{
  // we can add a change in zoom and lat, lng when voterAddress is present
  // TODO: add useEffect to alter zoom
  // hit the geolocation API for voterAddress

  const {
    voterAddress,
    earlyVotingLocations,
    electionDayLocations,
  } = props;

    return (
      <Map
        google={props.google}
        zoom={6}
        style={mapStyles}
        initialCenter={{
         lat: 31.5686,
         lng: -99.9018
        }}
      >
        {voterAddress ? <SetPin address={voterAddress} /> : null}
        {earlyVotingLocations.length ? _.map(earlyVotingLocations, (loc) => {
          return <SetPin address={loc.address} />
        }) : null}
        {/* <SetPin voterAddress={voterAddress} earlyVotingLocations={earlyVotingLocations} electionDayLocations={electionDayLocations}/> */}
      </Map>
    );
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_MAP_API_KEY}`
})(MapContainer);