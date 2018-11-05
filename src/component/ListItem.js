import React, { Component } from 'react';



export default class ListItem extends Component {
  render() {
    return (
      <li className='listItem'>
       <button onClick={() => this.props.listItemOnClick(this.props)}> {this.props.name} </button>
      </li>
    )
  }
}
