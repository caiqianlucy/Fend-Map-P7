import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 37.373680, lng: -122.036568 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 37.373680, lng: -122.036568 }} />}
  </GoogleMap>
))

export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
    isMarkerShown
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCX9ZDxXN_a2bXK-97MvYdY5Qi36qasqJk"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
 );
 }
}
