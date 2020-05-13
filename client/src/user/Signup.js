import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      role: "Normal_User",
      error: "",
      open: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
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
    console.log(user);
    signup(user).then((data) => {
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
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Sign up
      </button>
    </form>
  );

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container d-flex justify-content-center">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>

        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          New account is successfully created. Please{" "}
          <Link to="/">sign in</Link>.
        </div>

        {this.signUpForm(name, email, password)}
      </div>
    );
  }
}

export default Signup;
