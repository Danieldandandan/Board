import http from "./httpService";
import config from "../config.json";
import { getCurrentUser } from "./authService";
const endPoint = config.apiEndpoint + "events";

export async function getAsyncEvents() {
  const { data: events } = await http.get(endPoint);
  return events;
}

export async function getEventByCompany(company) {
  const { data: eventss } = await http.get(endPoint + "/company" + company);
  return eventss;
}

export async function getEventDetail(id) {
  const user = getCurrentUser();
  const url = endPoint + "/id" + id;
  console.log(user);
  const { data: event } = await http.get(url);
  return event;
}

export async function createEvent(event) {
  const { data: events } = await http.post(endPoint, event);
  return events;
}

export async function updateEvent(event) {
  const { data: newEvent } = await http.put(endPoint, event);
  return newEvent;
}
