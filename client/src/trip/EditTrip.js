import React, { Component } from "react";
import { getTrip, updateTrip } from "../trip/apiTrip";

class EditTrip extends Component {
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

  componentDidMount = () => {
    var tripId = this.props.location.pathname.split("/")[2];
    var token = JSON.parse(localStorage.getItem("jwt")).token;
    getTrip(tripId, token).then((data) => {
      this.setState({
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate,
        comment: data.comment,
      });
    });
  };

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
    var tripId = this.props.location.pathname.split("/")[2];
    const token = JSON.parse(localStorage.getItem("jwt")).token;
    updateTrip(tripId, token, trip).then((data) => {
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
      <h2 className="mt-5">Edit trip</h2>
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
          Changes are successfully saved.
        </div>

        {this.tripForm(destination, startDate, endDate, comment)}
      </div>
    );
  }
}

export default EditTrip;
