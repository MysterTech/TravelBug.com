import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import Trips from "../trip/Trips";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: isAuthenticated().user.role === "Admin",
      isUserManager: isAuthenticated().user.role === "User_Manager",
      error: "",
      user: isAuthenticated().user,
    };
  }

  render() {
    const { isAdmin, isUserManager, error } = this.state;

    if (isAdmin) {
      return <Redirect to={`/admin/${isAuthenticated().user._id}`} />;
    }

    if (isUserManager) {
      return <Redirect to={`/user_manager/${isAuthenticated().user._id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5">""</h2>
        <h2 className="mt-5">Trips</h2>
        <Trips />
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    );
  }
}

export default LoginView;
