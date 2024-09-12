import axios from "axios";

export function login({ email, password }) {
  const data = {
    email,
    password,
  };
  return axios.post(`/api/v1/users/login`, data);
}

export function register({ fullname, email, password }) {
  const data = {
    fullname,
    email,
    password,
  };
  return axios.post(`/api/v1/users/create`, data);
}

export function createPost({ title, body }) {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("auth_token") },
    "Content-Type": "application/json",
  };

  const data = {
    title,
    body,
  };
  return axios.post(`/api/v1/posts`, data, config);
}
export function getSinglePost(uid) {
  const config = {
    headers: { Authorization: "Bearer " + localStorage.getItem("auth_token") },
    "Content-Type": "application/json",
  };
  return axios.get(`/api/v1/posts/${uid}`, config);
}
