import axios from "axios";
import { jwtDecode } from "jwt-decode";
const TOKEN_KEY = "token";
export async function registerUser(details) {
  return axios.post(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
    details
  );
}

export async function login(values) {
  const response = await axios.post(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
    values
  );

  localStorage.setItem(TOKEN_KEY, response.data);

  refreshTokenHeader();
  return response;
}

export function setCommonHeader(headerName, headerValue) {
  axios.defaults.headers.common[headerName] = headerValue;
}
export function refreshTokenHeader() {
  setCommonHeader("x-auth-token", getJWT());
}
export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

export async function getUser() {
  try {
    const token = getJWT();
    const deCoded = jwtDecode(token);
    const response = await axios.get(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${deCoded._id}`
    );
   
    return response.data;
  } catch {
    return null;
  }
}
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  refreshTokenHeader();
}

const usersService = {
  registerUser,
  login,
  logout,
  getUser,
  getJWT,
};

export default usersService;
