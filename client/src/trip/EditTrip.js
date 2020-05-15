import React, { Component } from "react";
import { singleTrip } from "../trip/apiTrip";

class EditTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: undefined,
    };
  }
  render() {
    console.log(singleTrip());
    return (
      <div>
        <h2 className="mt-5">""</h2>
        <div class="card">
          <h3 className="mt-5">Edit your trip</h3>
        </div>
      </div>
    );
  }
}

export default EditTrip;
