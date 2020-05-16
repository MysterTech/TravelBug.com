import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { getUser, updateUser } from "./apiUser";

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      role: "",
      error: "",
      open: false,
      redirectToRenderer: false,
    };
  }

  componentDidMount = () => {
    var userId = this.props.location.pathname.split("/")[3];
    var token = JSON.parse(localStorage.getItem("jwt")).token;
    getUser(userId, token).then((data) => {
      this.setState({
        name: data.name,
        role: data.role,
        email: data.email,
      });
    });
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };

  clickBack = (event) => {
    this.setState({ redirectToRenderer: true });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, role } = this.state;
    const user = {
      name,
      email,
      password,
      role,
    };
    var userId = this.props.location.pathname.split("/")[3];
    var token = JSON.parse(localStorage.getItem("jwt")).token;
    updateUser(userId, token, user).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          error: "",
          name: "",
          email: "",
          password: "",
          role: "Normal_User",
          open: true,
        });
    });
  };

  signUpForm = (name, email, password, role) => (
    <div>
      <h2 className="mt-5">" "</h2>
      <h2 className="mt-5">Edit user</h2>
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={this.handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
        <label className="text-muted">Role &nbsp;&nbsp;</label>
        <select
          class="mdb-select md-form"
          type="role"
          onChange={this.handleChange("role")}
          value={role}
        >
          <option value="Normal_User">Normal user</option>
          <option value="User_Manager">User manager</option>
          <option value="Admin">Administrator</option>
        </select>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={this.handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Submit
        </button>
        <button
          onClick={this.clickBack}
          className="btn btn-raised btn-primary mr-5"
        >
          Back to all users
        </button>
      </form>
    </div>
  );

  render() {
    const {
      name,
      email,
      role,
      password,
      error,
      open,
      redirectToRenderer,
    } = this.state;
    var userId = isAuthenticated().user._id;
    var redirectLink = `/user_manager/${userId}`;
    if (redirectToRenderer) {
      return <Redirect to={redirectLink} />;
    }
    return (
      <div className="container d-flex justify-content-center">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div
          className="alert alert-info mt-5"
          style={{ display: open ? "" : "none" }}
        >
          <h2 className="mt-5">" Result"</h2>
          User account is successfully updated.
        </div>

        {this.signUpForm(name, email, password, role)}
      </div>
    );
  }
}

export default EditUser;
