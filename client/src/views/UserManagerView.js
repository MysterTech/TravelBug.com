import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class UserManagerView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="jumbotron">
        <h2>Inside User Manager View</h2>
      </div>
    );
  }
}

export default UserManagerView;
