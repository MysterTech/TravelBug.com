import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import logo from "../images/logo_plain_200x200.png";
import logoWCap from "../images/logo_200x200.png";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else return { color: "#ffffff" };
};

const Menu = ({ history }) => (
  <div>
    {!isAuthenticated() && (
      <a href="/" className="d-flex justify-content-center">
        <img src={logoWCap} alt="Logo" height="200" width="200" />
      </a>
    )}
    <ul className="nav nav-tabs bg-dark">
      {isAuthenticated() && (
        <>
          <li>
            <a href="/">
              <img src={logo} alt="Logo" height="80" width="80" />
            </a>
          </li>
          <li className="nav-item">
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

          <li className="nav-item">
            <Link
              to={`/user/${isAuthenticated().user._id}`}
              style={isActive(history, `/user/${isAuthenticated().user._id}`)}
              className="nav-link"
            >
              {`${isAuthenticated().user.name}`}
            </Link>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
