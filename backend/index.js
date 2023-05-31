const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const app = new express();
const db = config.get("db");

require("./startup/cors")(app);
require("./startup/routes")(app);

mongoose.connect(db).then(() => console.log(`Connected to ${db}...`));
const server = app.listen(8888, () => console.log("Listening on 8888...."));

module.exports = server;
