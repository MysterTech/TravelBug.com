import React, { Component } from "react";
import Users from "../user/Users";

class UserManagerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }
  render() {
    return (
      <div className="container">
        <h2 className="mt-5">""</h2>
        <h2 className="mt-5">Users</h2>
        <Users />
        {/* <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )} */}
      </div>
    );
  }
}

export default UserManagerView;
