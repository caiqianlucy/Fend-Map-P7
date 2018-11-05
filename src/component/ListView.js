import React, { Component } from 'react';
import VenueList from './VenueList.js';


export default class ListView extends Component {
  constructor(){
    super();
    this.state={
      query:"",
      venues:[]
    };
  }
  //update the venueList according to the search results without changing to the original venues
  handleFilterVenues=()=>{
    if(this.state.query.trim() !== ""){
      const venues=this.props.venues.filter(venue =>
         venue.name.toLowerCase().includes(
           this.state.query.toLowerCase()
         ));
    return venues;
    }
    return this.props.venues;
  };
  //only show markers that are filtered
  handleChange = e => {
    this.setState({query: e.target.value});
    const markers = this.props.venues.map(venue =>{
      const isMatched= venue.name.toLowerCase().includes(e.target.value.toLowerCase());
      const marker =this.props.markers.find(marker => marker.id===venue.id);
      marker.animation=null;
      marker.isClicked=false;
      if (isMatched){
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({markers});
  };
  render() {
    return (
      <div className="listView">
        <input type={"search"} id= {"search"} placeholder={"filter restaurants"} onChange={this.handleChange} />
        <VenueList {...this.props} venues={this.handleFilterVenues()} listItemOnClick={this.props.listItemOnClick} />
      </div>
    )
  }
}
