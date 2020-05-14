import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import { listByUser } from "../trip/apiTrip";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: isAuthenticated().user.role === "Admin",
      isUserManager: isAuthenticated().user.role === "User_Manager",
      error: "",
      user: isAuthenticated().user,
      trips: [],
    };
  }
  render() {
    const { isAdmin, isUserManager } = this.state;

    if (isAdmin) {
      return <Redirect to={`/admin/${isAuthenticated().user._id}`} />;
    }

    if (isUserManager) {
      return <Redirect to={`/user_manager/${isAuthenticated().user._id}`} />;
    }

    return (
      <div className="d-flex">
        <h2 className="mt-5 mb-5">Trips</h2>
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
