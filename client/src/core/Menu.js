import React from "react";
import { withRouter, Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import logo from "../images/logo_plain_200x200.png";
import logoWCap from "../images/logo_200x200.png";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else return { color: "#ffffff" };
};

const isAdmin = () => {
  return isAuthenticated().user.role === "Admin";
};
const Menu = ({ history }) => (
  <div>
    {!isAuthenticated() && (
      <a href="/" className="d-flex justify-content-center">
        <img src={logoWCap} alt="Logo" height="200" width="200" />
      </a>
    )}

    {isAuthenticated() && (
      <ul className="nav nav-tabs bg-dark fixed-top">
        <li>
          <a href="/">
            <img src={logo} alt="Logo" height="80" width="200" />
          </a>
        </li>
        {isAdmin() && (
          <>
            <li className="nav-item float-right">
              <Link
                to={`/admin/users/${isAuthenticated().user._id}`}
                style={isActive(
                  history,
                  `/admin/users/${isAuthenticated().user._id}`
                )}
                className="nav-link"
              >
                Users
              </Link>
            </li>
            <li className="nav-item float-right">
              <Link
                to={`/admin/trips/${isAuthenticated().user._id}`}
                style={isActive(
                  history,
                  `/admin/trips/${isAuthenticated().user._id}`
                )}
                className="nav-link"
              >
                Trips
              </Link>
            </li>
          </>
        )}
        <li className="nav-item float-right">
          <span
            className="nav-link"
            style={
              (isActive(history, "/signup"),
              { cursor: "pointer", color: "#fff" })
            }
            onClick={() => signout(() => history.push("/"))}
          >
            Signout
          </span>
        </li>
      </ul>
    )}
  </div>
);

export default withRouter(Menu);
