/* global google */
import React, { Component } from 'react';
import Map from './component/Map.js';
import './App.css';
import FourSquare from './api/Foursquare.js';
import ListView from './component/ListView.js';

class App extends Component {
  constructor(){
    super();
    this.state={
      venues:[],
      markers:[],
      isOnline:true,
      googleMapError:false,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }
  //update internet connection status for error-handling
  ComponentWillMount(){
  window.addEventListener('online', this.updateConnectionStatus);
  window.addEventListener('offline', this.updateConnectionStatus);
  }

  updateConnnectionStatus=(e)=>{
    e.type==='online'?this.setState({isOnline: true}):this.setState({isOnline: false})
  };

  //close all the markers
  closeMarkers=() => {
    const markers=this.state.markers.map((marker) => {
      marker.isClicked=false;
      marker.animation=null;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)});
  };
  //update the corresponding venues with the detail the information when a marker is clicked
  markerOnClick=(marker)=>{
    this.closeMarkers();
    marker.isClicked=true;
    marker.animation=google.maps.Animation.BOUNCE;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    const venue=this.state.venues.find(venue=>venue.id===marker.id);
    FourSquare.getVenueDetails(marker.id).then(res => {
      const newVenue=Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue)});
      console.log(venue);
    }).catch(e => alert("Errors in fetching information! Check your network connection or foursquare app limits!"));
  }
  //show infowindow when the venue on the list is clicked
  listItemOnClick=(venue)=>{
    const marker=this.state.markers.find(marker => marker.id === venue.id);
    this.markerOnClick(marker);
  }
  //obtain data from foursquare and set state
  componentDidMount(){
    window.gm_authFailure=()=>{
      this.setState({googleMapError: true})
    };
    FourSquare.search({
      near: "sunnyvale, CA",
      query:"chinese restaurant",
      limit: 20
    }).then(results => {
      const { venues }=results.response;
      console.log(venues);
      const markers=venues.map(venue=>{
        return {
          lat:venue.location.lat,
          lng:venue.location.lng,
          isClicked:false,
          isVisible:true,
          id: venue.id,
          animation: null
        }
      });
      this.setState({venues, markers});
    }).catch(e => alert("Errors in fetching information! Check your network connection or foursquare app limits!"));
  }
  //render map and listview
  render() {
    return (
      <div className="mapApp">
        <h1 className="title"> Chinese Restaurant near Sunnyvale </h1>
          <div className="App">
            <ListView {...this.state} listItemOnClick={this.listItemOnClick}/>
            {(this.state.isOnline && !this.state.googleMapError)?
            <Map role="application" aria-label="map" {...this.state} markerOnClick={this.markerOnClick}/>:
          <h1> Error in goolge map loading </h1> }
         </div>
      </div>
    );
  }
}

export default App;
