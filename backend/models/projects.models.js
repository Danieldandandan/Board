const mongoose = require("mongoose");
const { shortEventSchema } = require("./events.models");
const { shortUserSchema } = require("./users.models");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    max: 50,
    required: true,
  },
  events: {
    type: [shortEventSchema],
  },
  company: {},
  member: {
    type: [shortUserSchema],
  },
  manager: {
    shortUserSchema,
  },
});
