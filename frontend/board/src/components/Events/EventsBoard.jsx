import React, { Component } from "react";
import EventCard from "./eventCard";
import { getAsyncEvents, getEventByCompany, getEvents } from "../../services/eventService";
import { getStages } from "../../services/stageService";
import { Link } from "react-router-dom";
import Table from "../common/table";
import authService from "../../services/authService";

const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)", // Set your desired value for grid-template-columns
  gap: "16px", // Set your desired value for gap between tables
  // width: "80%",
};

class EventBoard extends Component {
  state = {
    events: [],
    stages: [],
    display: "card",
  };
  async componentDidMount() {
    const user = authService.getCurrentUser();
    let events = [];
    if (user) {
      try {
        events = await getEventByCompany(user.company);
      } catch (e) {
        console.log(e);
      }
    }
    const stages = getStages();
    this.setState({ events, stages });
  }
  getData(stage) {
    const data = this.state.events.filter((events) => events.stage === stage);
    return data;
  }
  getDisplay = (event) => {
    if (this.state.display === "card") return <EventCard data={event} />;
    return event.title;
  };

  render() {
    const { events, stages } = this.state;
    const user = authService.getCurrentUser();
    return (
      <div>
        {user && (
          <Link to="/create">
            <button type="button" className="btn btn-success">
              create new Idea
            </button>
          </Link>
        )}
        <div style={containerStyle}>
          {stages.map((stage) => (
            <Table
              columns={[stage]}
              data={this.getData(stage)}
              key={stage}
              display={this.getDisplay}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default EventBoard;
