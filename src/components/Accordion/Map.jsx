import React, { Component } from 'react'
import GoogleMapReact from "google-map-react";

export default class Map extends Component {
  state = {
    data: null
  }

  componentDidMount() {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.address.split(' ').join('+')}&key=AIzaSyB1JuT9PVQj8xp08fqV-9tCF4tZWjWIYko`)
        .then(resp => resp.json())
        .then(data => this.setState({data}))
  }

  render() {
    console.log(this.state)

    return (
      <div style={{ height: '50vh', width: '100%' }}>
        { this.state.data ?
        <GoogleMapReact
          bootstrapURLKeys={{ key: `AIzaSyB1JuT9PVQj8xp08fqV-9tCF4tZWjWIYko`}}
          defaultCenter={this.state.data.results[0].geometry.location}
          defaultZoom={15}
        />
        :
        'Map loading'
        }
      </div>
    )
  }
}
