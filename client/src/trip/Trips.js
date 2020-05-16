import React, { Component } from "react";
import { getAllTrips, listByUser, remove } from "./apiTrip";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";

class Trips extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      selected: [],
      page: 1,
      redirectToCreate: false,
    };
  }

  loadTrips = (page) => {
    const token = JSON.parse(localStorage.getItem("jwt")).token;
    listByUser(isAuthenticated().user._id, token, page).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ trips: data });
      }
    });
  };

  async createSchedule() {
    const token = JSON.parse(localStorage.getItem("jwt")).token;
    const userId = isAuthenticated().user._id;
    const response = await getAllTrips(userId, token);
    const trips = response.trips;
    const filteredTrips = trips.filter(function (trip) {
      var now = new Date();
      var nextMonth;
      var year;
      if (now.getMonth() !== 11) {
        nextMonth = now.getMonth() + 1;
        year = now.getFullYear();
      } else {
        nextMonth = 0;
        year = now.getFullYear() + 1;
      }
      var startDate = new Date(trip.startDate);
      return (
        startDate.getFullYear() === year && startDate.getMonth() === nextMonth
      );
    });
    const fileData = JSON.stringify(filteredTrips);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "filename.json";
    link.href = url;
    link.click();
  }

  componentDidMount() {
    this.loadTrips(this.state.page);
  }

  loadMore = (number) => {
    this.setState({ page: this.state.page + number });
    this.loadTrips(this.state.page + number);
  };

  loadLess = (number) => {
    this.setState({ page: this.state.page - number });
    this.loadTrips(this.state.page - number);
  };

  addRemoveSelected = (tripId) => {
    var selected = this.state.selected;
    var checkboxes = document.getElementsByName("isSelected");
    var numberOfCheckedItems = 0;

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) numberOfCheckedItems++;
    }

    if (numberOfCheckedItems > selected.length) selected.push(tripId);
    else {
      var index = selected.indexOf(tripId);
      if (index !== -1) {
        selected.splice(index, 1);
      }
    }

    this.setState({ selected: selected });
  };

  redirectToCreate = () => {
    this.setState({ redirectToCreate: true });
  };

  deleteSelected = () => {
    const token = JSON.parse(localStorage.getItem("jwt")).token;
    var selected = this.state.selected;
    var trips = this.state.trips;
    selected.forEach((tripId) => remove(tripId, token));
    this.loadTrips(this.state.page);
    var cards = document.getElementsByName("isSelected");
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].type === "checkbox") cards[i].checked = false;
    }
    this.setState({ selected: [], trips: trips });
  };

  getDays = (startDate) => {
    const now = Date.now();
    const daysToGo = Math.floor((startDate - now) / (1000 * 3600 * 24));
    if (daysToGo > 0) {
      return daysToGo;
    }
    return -1;
  };

  renderTrips = (trips) => {
    return (
      <div className="row">
        {trips.map((trip, i) => {
          const startDate = Date.parse(trip.startDate);
          const daysToTrip = Math.floor(this.getDays(startDate));
          const tripRef = "/trip/" + trip._id;
          return (
            <div className="card col-md-4" key={i}>
              <div className="card-body">
                <h5 className="card-title">
                  <input
                    type="checkbox"
                    name="isSelected"
                    onClick={(e) => this.addRemoveSelected(trip._id)}
                  />
                  &nbsp;&nbsp;
                  {trip.destination}
                </h5>
                <h6>Start : {trip.startDate.split("T")[0]}</h6>
                {daysToTrip !== -1 ? <h6>{daysToTrip} days to go</h6> : ""}
                <h6>Ending : {trip.endDate.split("T")[0]}</h6>
                <h6>Comments : </h6>
                <p className="card-text">{trip.comment.substring(0, 100)}</p>
                <br />
                <Link to={tripRef}>Edit</Link>.
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { trips, page, redirectToCreate } = this.state;
    if (redirectToCreate) {
      return <Redirect to={`/trip/new`} />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{!trips.length ? "No more trips!" : ""}</h2>
        <button
          className="btn btn-raised btn-warning mt-5 mb-5"
          onClick={() => this.createSchedule()}
        >
          Generate next month's schedule
        </button>
        {this.renderTrips(trips)}

        {page > 1 ? (
          <button
            className="btn btn-raised btn-warning mt-5 mb-5"
            onClick={() => this.loadLess(1)}
          >
            Previous ({this.state.page - 1})&nbsp;
          </button>
        ) : (
          ""
        )}
        <button
          className="btn btn-raised btn-outline-secondary mt-5 mb-5"
          onClick={() => {}}
        >
          {page}&nbsp;
        </button>
        {trips.length ? (
          <button
            className="btn btn-raised btn-success mt-5 mb-5"
            onClick={() => this.loadMore(1)}
          >
            Next ({page + 1})
          </button>
        ) : (
          ""
        )}

        <button
          className="btn btn-raised btn-outline-primary mt-5 mb-5"
          onClick={() => this.redirectToCreate()}
        >
          Create Trip
        </button>

        <button
          className="btn btn-raised btn-danger mt-5 mb-5"
          onClick={() => this.deleteSelected()}
        >
          Delete Selected
        </button>
      </div>
    );
  }
}

export default Trips;
