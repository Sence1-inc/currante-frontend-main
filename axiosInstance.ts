import axios, { AxiosInstance } from "axios";
import { getEmail } from "./src/utils/getEmail";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
  },
});

let lastRefreshTime = Date.now();

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const currentTime = Date.now();
    const elapsedTimeSinceLastRefresh = currentTime - lastRefreshTime;

    const isLoginRequest = error.config.url.includes("/api/v1/login");
    const isRegisterRequest = error.config.url.includes("/api/v1/register");

    if (isLoginRequest || isRegisterRequest) {
      return Promise.reject(error);
    }

    if (
      elapsedTimeSinceLastRefresh >= 4 * 60 * 1000 ||
      (error.response && error.response.status === 498)
    ) {
      const data = {};
      try {
        await axios.post(`${baseURL}/api/v1/refresh`, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });

        lastRefreshTime = currentTime;

        return api.request(error.config);
      } catch (refreshError: any) {
        console.error("Failed to refresh token", refreshError);
      }
    }

    if (error.response && error.response.status === 403) {
      const email = getEmail();

      await api.post("/api/v1/logout", {
        email: email,
      });
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  }
);

export default api;
