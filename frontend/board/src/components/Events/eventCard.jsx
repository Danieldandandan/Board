import React, { Component } from "react";
import { Link } from "react-router-dom";

const buttonStyle = {
  position: "relative",
  button: "80px",
};

const EventCard = ({ data }) => {
  return (
    <div>
      <div className="card m-2" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{data.title}</h5>
          {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
          <p className="card-text">{data.describtion}</p>
          {data.admin && <p className="card-text">{data.admin.name}</p>}
          <div>
            <Link style={{ ...buttonStyle, left: "10px" }} to={"/event/Info/" + data._id}>
              <button type="button" class="btn btn-outline-info btn-sm">
                Info
              </button>
            </Link>
            <button
              style={{ ...buttonStyle, left: "100px" }}
              type="button"
              class="btn btn-outline-success btn-sm"
            >
              Next Stage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
