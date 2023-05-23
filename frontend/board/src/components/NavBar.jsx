import { NavLink, Link } from "react-router-dom";
import React, { Component } from "react";

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          Board
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            {/* <NavLink class="nav-item" to="/signup">
              <a class="nav-link" href="#">
                Features
              </a>
            </NavLink> */}
            {localStorage.JWT && <a>has user</a>}
            {!localStorage.JWT && (
              <NavLink class="nav-item" to="/login">
                <a class="nav-link active" aria-current="page" href="#">
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
