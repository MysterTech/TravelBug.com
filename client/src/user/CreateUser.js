import React, { Component } from "react";
import { Link } from "react-router-dom";
import { create } from "../user/apiUser";
import { isAuthenticated } from "../auth";

class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      startDate: "",
      endDate: "",
      comment: "",
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
    const { destination, startDate, endDate, comment } = this.state;
    const trip = {
      destination,
      startDate,
      endDate,
      comment,
    };
    const userId = isAuthenticated().user._id;
    const token = JSON.parse(localStorage.getItem("jwt")).token;
    create(userId, token, trip).then((data) => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          destination: "",
          startDate: "",
          endDate: "",
          comment: "",
          error: "",
          open: true,
        });
    });
  };

  tripForm = (destination, startDate, endDate, comment) => (
    <div>
      <h2 className="mt-5">" "</h2>
      <h2 className="mt-5">Create trip</h2>
      <form>
        <div className="form-group">
          <label className="text-muted">Destination</label>
          <input
            onChange={this.handleChange("destination")}
            type="text"
            className="form-control"
            value={destination}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Start date</label>
          <input
            onChange={this.handleChange("startDate")}
            type="date"
            id="fname"
            name="fname"
            value={startDate}
          ></input>
        </div>
        <div className="form-group">
          <label className="text-muted">End date</label>
          <input
            onChange={this.handleChange("endDate")}
            type="date"
            id="fname"
            name="fname"
            value={endDate}
          ></input>
        </div>
        <div className="form-group">
          <label className="text-muted">Comment</label>
          <input
            onChange={this.handleChange("comment")}
            type="text"
            className="form-control"
            value={comment}
          />
        </div>
        <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );

  render() {
    const {
      destination,
      startDate,
      endDate,
      comment,
      error,
      open,
    } = this.state;
    var userId = isAuthenticated().user._id;
    var baseLink = "/user/";
    const userLink = baseLink.concat(userId);
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
          New trip is successfully created. You can continue creating new trips
          or review <Link to={userLink}>trips</Link>.
        </div>

        {this.tripForm(destination, startDate, endDate, comment)}
      </div>
    );
  }
}

export default CreateTrip;
