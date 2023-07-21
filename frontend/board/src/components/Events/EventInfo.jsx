import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventDetail } from "../../services/eventService";
import Form from "../common/form";

class Info extends Form {
  state = {
    data: {
      title: "",
      descibtion: "",
      member: [],
      stage: "",
      // startDate: "",
    },
  };

  async componentDidMount() {
    const { id } = this.props;
    console.log(id);
    const event = await getEventDetail(id);
    console.log(event);
    this.setState({ data: event });
    // console.log(event);
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md mx-auto">
            <form onSubmit={this.handleSubmit}>
              <h1> {data.title}</h1>
              <h3> {data.describtion}</h3>
              <h3> {data.member}</h3>
              <h3> {data.stage} </h3>
              {/* <h3> {data.startDate} </h3> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// export default EventInfo;

const EventInfo = () => {
  const { id } = useParams();
  console.log(id);
  return <Info id={id}></Info>;
};

export default EventInfo;
