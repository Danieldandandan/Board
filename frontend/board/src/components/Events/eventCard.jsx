import React, { Component } from "react";
import { getNextStage } from "../../services/stageService";
import { updateEvent } from "../../services/eventService";
import { Link } from "react-router-dom";

const buttonStyle = {
  position: "relative",
  button: "80px",
};
async function handleNextStage(data) {
  console.log(data.stage);
  const nextStage = getNextStage(data.stage);
  if (!nextStage) return alert("can not go to next stage");
  console.log(nextStage);
  data.stage = nextStage;
  try {
    const newData = await updateEvent(data);
    window.location.reload(false);
  } catch (e) {}
}
const EventCard = ({ data }) => {
  return (
    <div>
      <div className="card m-2" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{data.title}</h5>
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
              onClick={() => handleNextStage(data)}
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
