const jwtDecode = require("jwt-decode");
// const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { User } = require("../models/users.models");
const { Company, validate } = require("../models/company.models");
const _ = require("lodash");

const privateKey = "MyPrivateKey"; // NEEDS TO BE HIDDEN

/**
 * Register a Company
 *
 * @param {jwt} jwt user's Jwt
 * @param {String} companyName the new Company name
 *
 */

router.post("/", async (req, res) => {
  let user;
  try {
    user = jwtDecode(req.body.jwt);
  } catch (e) {
    return res.status(400).send(e.message);
  }

  const shortUserObj = {
    name: user.name,
    _id: user._id,
  };
  const newCompany = {
    name: req.body.companyName,
    admin: shortUserObj,
    member: [shortUserObj],
  };

  const { error } = validate(newCompany);
  if (error) {
    console.log("error here");
    return res.status(400).send(error.message);
  }
  let company = await Company.findOne({ "admin._id": user._id });
  if (company) {
    return res.status(400).send("we already find a company under your Id");
  }
  let checkedUser = await User.findById(user._id);
  checkedUser.companyName = req.companyName;
  //   console.log(checkedUser);
  await checkedUser.save();
  const comapny = new Company(newCompany);
  await comapny.save();
  res.status(200).send("success");
});

module.exports = router;
