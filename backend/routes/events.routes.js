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

// get events by company name
router.get("/company:company", async (req, res) => {
  const company = req.params.company;
  const event = await Event.find({ company: company });
  return res.status(200).send(event);
});

//Get get an event with full detail
router.get("/id:id", async (req, res) => {
  const eventId = req.params.id;
  const event = await Event.findById(eventId);
  if (!event) return res.status(400).send("Event not found");

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
  const { error } = validate(event);
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

router.put("/", async (req, res) => {
  const event = req.body;
  let e = await Event.findById(event._id);
  if (!e) return res.status(404).send("Event not found");
  for (const key in event) {
    if (e[key]) e[key] = event[key];
  }
  e = await e.save();
  return res.send(event);
});

module.exports = router;
