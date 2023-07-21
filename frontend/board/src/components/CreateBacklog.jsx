import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/authService";
import { createEvent } from "../services/eventService";
import { Navigate, Link } from "react-router-dom";

class CreateBacklog extends Form {
  state = {
    data: {
      title: "",
      detail: "",
    },
    errors: {},
  };
  doSubmit = async () => {
    const { data } = this.state;
    const user = auth.getCurrentUser();
    // console.log(user);
    const newEvent = {
      title: data.title,
      describtion: data.detail,
      company: user.company,
      admin: {
        name: user.name,
        _id: user._id,
      },
    };

    try {
      await createEvent(newEvent);
      window.location = "/";
    } catch (ex) {
      console.log(ex);
    }
    // console.log(data);
  };

  schema = {
    title: Joi.string().required().min(5).max(50).label("title"),
    detail: Joi.string().required().max(1024).label("detail"),
    // password: Joi.string().required().label("Password"),
  };
  render() {
    if (!auth.getCurrentUser()) return <Navigate to="/" />;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 mx-auto">
            <h1>Create A BackLog</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Title")}
              {this.renderTextArea("detail", "Detail")}
              {this.renderButton("Confirm")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBacklog;
