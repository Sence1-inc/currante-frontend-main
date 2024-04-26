import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": ["application/json", "*/*"],
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": " true",
  },
});

export default api;
