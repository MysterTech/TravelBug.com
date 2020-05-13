import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      isUserManager: false,
      error: "",
      user: isAuthenticated().user,
    };
  }
  render() {
    const { isAdmin, isUserManager } = this.state;

    /* if (isAdmin) {
      return <Redirect to={`/admin/${user._id}`} />;
    }

    if (isUserManager) {
      return <Redirect to={`//${user._id}`} />;
    } */

    return (
      <div className="d-flex">
        <h2 className="mt-5 mb-5">Create a new post</h2>
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

export default LoginView;
