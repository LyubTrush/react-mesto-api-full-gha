// базовый URL
const BASE_AUTH_URL = "http://localhost:3000";

const handleRes = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка: ${response.status}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_AUTH_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email, password),
  }).then(handleRes);
};

export const signin = (email, password) => {
  return fetch(`${BASE_AUTH_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleRes);
};

export const checkAuth = (token) => {
  return fetch(`${BASE_AUTH_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  }).then(handleRes);
};
