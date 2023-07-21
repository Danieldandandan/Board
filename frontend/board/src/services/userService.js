import http from "./httpService";
import config from "../config.json";

const endPoint = config.apiEndpoint + "users";
const tokenKey = "token";

export async function signUp({ name, email, password, company }) {
  console.log("Signing up", name, email, password);
  const { data: jwt } = await http.post(endPoint, {
    name,
    email,
    password,
    company,
  });

  localStorage.setItem(tokenKey, jwt);
}

export default {
  signUp,
};
