import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:8080",
})

//Attach Token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (
    token &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/signup")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;