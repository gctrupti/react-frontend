import axios from "axios";

const API = axios.create({
  baseURL: "https://node-backend-api-9iw2.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
