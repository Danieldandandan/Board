import http from "./httpService";
import config from "../config.json";
const endPoint = config.apiEndpoint + "events";

const events = [
  {
    _id: "1234",
    title: "Idea1",
    members: ["tony", "Jack", "vic"],
    details: "foo bar baz",
    stage: "Backlog",
  },
  {
    _id: "2345",
    title: "WatchBoard",
    members: ["Daniel"],
    details: "foo bar baz",
    stage: "To-Do",
  },
  {
    _id: "8888",
    title: "idea2",
    members: ["Daniel"],
    details: "I want have member shows on the card",
    stage: "Backlog",
  },
  {
    _id: "3030",
    title: "idea3",
    members: ["Daniel"],
    details: "Not Sure",
    stage: "Backlog",
  },
];

export async function getAsyncEvents() {
  const { data: eventss } = await http.get(endPoint);
  // console.log(eventss);
  return eventss;
}

export function getEvents() {
  return events;
}

export default {
  getEvents,
  getAsyncEvents,
};
