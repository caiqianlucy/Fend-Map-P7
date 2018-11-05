
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap(props =>
  (<GoogleMap
    zoom={10}
    center={{ lat: 37.36883, lng: -122.03635 }}
  >

    {props.markers && props.markers.filter(marker=>marker.isVisible).map((marker, idx)=>{
      const venue=props.venues.find(venue => venue.id===marker.id);
      return (
        <Marker key={idx}
        position={{lat: marker.lat, lng: marker.lng}}
        onClick={()=>{props.markerOnClick(marker)}}
        animation={marker.animation}
        >

          {marker.isClicked && (
            <InfoWindow>
              <React.Fragment>

                {venue.bestPhoto &&
                 <img
                 src={`${venue.bestPhoto.prefix}200x200${venue.bestPhoto.suffix}`}
                 alt={`imgae for ${venue.name}`}
                 />}
                 <p>{venue.name}</p>
              </React.Fragment>
           </InfoWindow> )}
        </Marker>
      )}
    )}
  </GoogleMap>
))
);
export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
    {...this.props}
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyCX9ZDxXN_a2bXK-97MvYdY5Qi36qasqJk"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100%`, width:`100%`}} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
 );
 }
}
