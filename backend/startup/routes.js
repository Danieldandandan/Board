const users = require("../routes/users.routes");
const auth = require("../routes/auth.routes");
const events = require("../routes/events.routes");
const company = require("../routes/company.routes");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/events", events);
  app.use("/api/company", company);
};
