import axios from "axios";

console.log(import.meta.env.VITE_API_URL);
const API = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
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