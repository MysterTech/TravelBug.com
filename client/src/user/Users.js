import React, { Component } from "react";
import { list, remove } from "./apiUser";
import { Link, Redirect } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      selected: [],
      page: 1,
      redirectToCreate: false,
    };
  }

  loadUsers = (page) => {
    const token = JSON.parse(localStorage.getItem("jwt")).token;
    list(token, page).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  };

  componentDidMount() {
    this.loadUsers(this.state.page);
  }

  loadMore = (number) => {
    this.setState({ page: this.state.page + number });
    this.loadUsers(this.state.page + number);
  };

  loadLess = (number) => {
    this.setState({ page: this.state.page - number });
    this.loadUsers(this.state.page - number);
  };

  addRemoveSelected = (userId) => {
    var selected = this.state.selected;
    var checkboxes = document.getElementsByName("isSelected");
    var numberOfCheckedItems = 0;

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) numberOfCheckedItems++;
    }

    if (numberOfCheckedItems > selected.length) selected.push(userId);
    else {
      var index = selected.indexOf(userId);
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
    var users = this.state.users;
    selected.forEach((userId) => remove(userId, token));
    this.loadUsers(this.state.page);
    var cards = document.getElementsByName("isSelected");
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].type === "checkbox") cards[i].checked = false;
    }
    this.setState({ selected: [], users: users });
  };

  renderTable = (users) => {
    return (
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        {this.renderUsers(users)}
      </table>
    );
  };

  renderUsers = (users) => {
    return (
      <tbody>
        {users.map((user, i) => {
          const userRef = "/user/edit/" + user._id;
          return (
            <tr>
              <th scope="row">
                <input
                  type="checkbox"
                  name="isSelected"
                  onClick={(e) => this.addRemoveSelected(user._id)}
                />
              </th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={userRef}>Edit</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  render() {
    const { users, page, redirectToCreate } = this.state;
    if (redirectToCreate) {
      console.log("redirecting now");
      return <Redirect to="/user_manager/user/new/" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{!users.length ? "No more users!" : ""}</h2>

        {this.renderTable(users)}

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
        {users.length ? (
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
          Create User
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

export default Users;
