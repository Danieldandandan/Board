import { NavLink, Link } from "react-router-dom";
import React, { Component, useState } from "react";
import { getCurrentUser } from "../services/authService";

const NavBar = () => {
  const [user, setUser] = useState(getCurrentUser());

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
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
            {user && <h2> welcome {user.name}</h2>}
            {user && <button onClick={handleSignOut}> Sign Out </button>}
            {!user && (
              <NavLink className="nav-item" to="/login">
                <a className="nav-link active" aria-current="page" href="#">
                  Login
                </a>
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
