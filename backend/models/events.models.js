const mongoose = require("mongoose");
const Joi = require("joi");

const shortUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    max: 50,
    required: true,
  },
  member: {
    type: [shortUserSchema],
  },
  admin: {
    type: shortUserSchema,
  },
  describtion: {
    type: String,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  stage: {
    type: String,
    default: "Backlog",
  },
});

const Event = mongoose.model("Event", eventSchema);

function validateEvent(event) {
  const schema = Joi.object({
    title: Joi.string().max(50).required(),
    member: Joi.array().items(Joi.string()),
    describtion: Joi.string().max(1024),
    company: Joi.string(),
    stage: Joi.string(),
    startDate: Joi.date(),
  });
  return schema.validate(event);
}

exports.Event = Event;
exports.validate = validateEvent;
exports.eventSchema = eventSchema;
