import axios, { AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api: AxiosInstance = axios.create({
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

let lastRefreshTime = Date.now();

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const currentTime = Date.now();
    const elapsedTimeSinceLastRefresh = currentTime - lastRefreshTime;

    if (
      elapsedTimeSinceLastRefresh >= 4 * 60 * 1000 ||
      (error.response && error.response.status === 401)
    ) {
      axios.post(`${baseURL}/api/v1/refresh`);
      console.log("Unauthorized, triggering /refresh endpoint");
      lastRefreshTime = currentTime;
    }

    return Promise.reject(error);
  }
);

export default api;
