const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const _ = require("lodash");

const privateKey = "MyPrivateKey"; // NEEDS TO BE HIDDEN

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  role: {
    type: [String],
  },
  activity: {
    type: [String],
  },
  company: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(_.pick(this, ["_id", "role", "name", "company"]), privateKey);
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    company: Joi.string().required(),
    password: passwordComplexity(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
exports.userSchema = userSchema;
