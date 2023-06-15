import React, { Component } from "react";

const EventCard = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="card m-2" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{data.title}</h5>
          {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
          <p className="card-text">{data.describtion}</p>
          {data.admin && <p className="card-text">{data.admin.name}</p>}
          <a href="#" className="card-link">
            Event Details
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
