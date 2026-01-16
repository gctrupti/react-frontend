import axios from "axios";

const API = axios.create({
  baseURL: "https://node-backend-api-9iw2.onrender.com",
});

// ✅ Attach token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
