import http from "./httpService";
import config from "../config.json";
import { getCurrentUser } from "./authService";
const endPoint = config.apiEndpoint + "events";

export async function getAsyncEvents() {
  const { data: eventss } = await http.get(endPoint);
  // console.log(eventss);
  return eventss;
}

export async function getEventDetail(id) {
  // console.log(id);
  const user = getCurrentUser();
  const url = endPoint + "/" + id;
  console.log(user);
  // console.log(url);
  const { data: event } = await http.get(url);
  // console.log(event);
  return event;
}

export async function createEvent(event) {
  console.log(event);

  const { data: events } = await http.post(endPoint, event);

  return events;
}

export default {
  getAsyncEvents,
  createEvent,
};
