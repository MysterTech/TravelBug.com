import React, { Component } from "react";
import AllTrips from "../trip/AllTrips";

class AdminTripsView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>""</h1>
        <div className="jumbotron">
          <AllTrips />
        </div>
      </div>
    );
  }
}

export default AdminTripsView;
