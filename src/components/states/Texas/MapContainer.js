import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '70vw',
  height: '70vh'
};

export const MapContainer = (props) =>{
    return (
      <Map
        google={props.google}
        zoom={6}
        style={mapStyles}
        initialCenter={{
         lat: 31.5686,
         lng: -99.9018
        }}
      />
    );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAKJ36jILtvpS9OGV7WrB25m2aAwzW7Uuc'
})(MapContainer);