const { Event, validate } = require("../models/events.models");
const { User } = require("../models/users.models");
const express = require("express");
const _ = require("lodash");

const router = express.Router();

// GET Get a list of events
router.get("/", async (req, res) => {
  /**
   * Get a list of events
   *
   * @return {object[]} - Array of events
   */
  const events = await Event.find().select(["title", "describtion", "stage"]);
  res.status(200).send(events);
});

//Get get an event with full detail
router.get("/:id", async (req, res) => {
  console.log("calling");
  const eventId = req.params.id;
  const event = await Event.findById(eventId);
  // if (ev)
  if (!event) return res.status(400).send("Event not found");

  // console.log(event);
  // if (event.company)
  return res.status(200).send(event);
});

// POST Post a new Evnet
router.post("/", async (req, res) => {
  /**
   * Post a new Evnet
   *
   * @param {object} event - The new Event
   * @return {object} - The created Event
   */
  const event = req.body;
  console.log("gotEvent", event);
  const { error } = validate(event);
  console.log("error: ", error);
  if (error) return res.status(400).send(error.message);

  let savedEvent = new Event(_.pick(event, ["title", "member", "describtion", "company", "stage"]));
  // console.log(savedEvent);
  await savedEvent.save();
  res.send(savedEvent);
});

// POST Add a Member to this event
router.post("/:id/addMember", async (req, res) => {
  /**
   * Add a Member to this event
   *
   * @param {req.body} - member ID
   * @param {:id}  - EventId
   * @return {event} - The updated Event
   */
  const EventId = req.params.id;
  const { id } = req.body;
  // console.log(EventId);
  const user = await User.findById(id);
  if (!user) return res.status(404).send("User not Found");

  let event = await Event.findById(EventId);
  if (!event) return res.status(404).send("Event not Found");

  // const member = console.log(member);
  if (event.member.find((e) => e.memberId == id))
    return res.status(400).send("member is already in event");

  event.member.push({
    name: user.name,
    _id: user.id,
  });

  event = await event.save();
  res.send(event);
});

module.exports = router;
