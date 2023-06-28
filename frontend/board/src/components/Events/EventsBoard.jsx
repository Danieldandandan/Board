import React, { Component } from "react";
import EventCard from "./eventCard";
import { getAsyncEvents, getEvents } from "../../services/eventService";
import { getStages } from "../../services/stageService";
import Table from "../common/table";

const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)", // Set your desired value for grid-template-columns
  gap: "16px", // Set your desired value for gap between tables
};

class EventBoard extends Component {
  state = {
    events: [],
    stages: [],
    display: "card",
  };
  async componentDidMount() {
    // getAsyncEvents();
    const events = await getAsyncEvents();
    // console.log(events);
    const stages = getStages();
    this.setState({ events, stages });
  }
  getData(stage) {
    const data = this.state.events.filter((events) => events.stage === stage);
    return data;
  }
  getDisplay = (event) => {
    // console.log(event);
    if (this.state.display === "card") return <EventCard data={event} />;
    return event.title;
  };

  render() {
    const { events, stages } = this.state;

    return (
      <div className="container" style={containerStyle}>
        {stages.map((stage) => (
          <Table
            columns={[stage]}
            data={this.getData(stage)}
            key={stage}
            display={this.getDisplay}
          />
        ))}
      </div>
    );
  }
}

export default EventBoard;
