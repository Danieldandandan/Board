import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const endPoint = config.apiEndpoint + "auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  console.log(endPoint);
  const { data: jwt } = await http.post(endPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
