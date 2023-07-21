import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import user from "../services/userService";
import { Navigate, Link } from "react-router-dom";
// const passwordComplexity = require("joi-password-complexity");

class SignUp extends Form {
  state = {
    data: { name: "", password: "", email: "", company: "" },
    errors: {},
  };
  doSubmit = async () => {
    const { data } = this.state;
    try {
      await user.signUp(data);
      window.location = "/";
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  schema = {
    name: Joi.string().required().label("name"),
    password: Joi.string().required().label("Password"),
    email: Joi.string().email().required().label("Email"),
    company: Joi.string().required().label("company"),
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 mx-auto">
            <h1>Sign Up</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "Username")}
              {this.renderInput("email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("company", "company")}
              {this.renderButton("Login")}
            </form>
            {/* <Link to="/signUp"> dont have account? click here to sign up</Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
