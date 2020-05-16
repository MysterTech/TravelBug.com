import React, { Component } from "react";
import Users from "../user/Users";

class AdminUsersView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>""</h1>
        <div className="jumbotron">
          <Users />
        </div>
      </div>
    );
  }
}

export default AdminUsersView;
