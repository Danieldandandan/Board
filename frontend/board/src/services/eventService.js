import http from "./httpService";
import config from "../config.json";
const endPoint = config.apiEndpoint + "events";

export async function getAsyncEvents() {
  const { data: eventss } = await http.get(endPoint);
  // console.log(eventss);
  return eventss;
}

export async function createEvent(event) {
  console.log(event);

  const { data: events } = await http.post(endPoint, event);

  return "123";
}

export default {
  getAsyncEvents,
  createEvent,
};
