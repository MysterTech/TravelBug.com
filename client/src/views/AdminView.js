import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="jumbotron">
        <p>Inside Admin view</p>
      </div>
    );
  }
}

export default AdminView;
