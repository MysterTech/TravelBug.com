import React, { Component } from "react";
import { list, remove } from "./apiTrip";
import { Link, Redirect } from "react-router-dom";

class AllTrips extends Component {
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
    list(page, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ trips: data });
      }
    });
  };

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

  renderTrips = (trips) => {
    return (
      <div className="row">
        {trips.map((trip, i) => {
          const tripRef = "/trip/" + trip._id;
          const isDefined = () => {
            return trip.createdBy !== undefined;
          };
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
                {isDefined() ? <h6>Created by : {trip.createdBy.name}</h6> : ""}
                <h6>Start : {trip.startDate.split("T")[0]}</h6>
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

export default AllTrips;
