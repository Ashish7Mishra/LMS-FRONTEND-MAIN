 import axios from "axios";

const api = axios.create({
  baseURL: "https://lms-backend-main.onrender.com/api", // make sure backend URL is correct
});

// Add token only if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; // remove header if no token
  }
  return config;
});

export default api;
