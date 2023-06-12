const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/users.models");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
// const auth = require("../middleware/auth");

// get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

// register a user
router.post("/", async (req, res) => {
  console.log("calling register");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("email has taken.");

  const salt = await bcrypt.genSalt(10);
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  // res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
  res.send(token);
});

module.exports = router;
