const users = require("../routes/users.routes");
const auth = require("../routes/auth.routes");
const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
};
