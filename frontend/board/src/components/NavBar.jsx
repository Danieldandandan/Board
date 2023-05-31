import { NavLink, Link } from "react-router-dom";
import React, { Component, useState } from "react";
import { getCurrentUser } from "../services/authService";

const NavBar = () => {
  const [user, setUser] = useState(getCurrentUser());

  const handleSignOut = () => {
    console.log("clicked");
    localStorage.removeItem("token");
    setUser(null);
  };
  console.log(user);
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/">
          Board
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* <NavLink class="nav-item" to="/signup">
              <a class="nav-link" href="#">
                Features
              </a>
            </NavLink> */}
            {localStorage.token && <button onClick={handleSignOut}> Sign Out </button>}
            {!localStorage.token && (
              <NavLink className="nav-item" to="/login">
                <a className="nav-link active" aria-current="page" href="#">
                  Login
                </a>
              </NavLink>
            )}

            {/* <li class="nav-item">
              <a class="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
