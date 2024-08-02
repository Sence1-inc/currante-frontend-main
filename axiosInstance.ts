import axios, { AxiosInstance } from "axios";
import { initializeIsLoading } from "./src/redux/reducers/IsLoadingReducer";
import store from "./src/redux/store";
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
var numberOfPendingRequests = 0;

api.interceptors.request.use(
  function (config) {
    console.log("orig", numberOfPendingRequests);
    console.log(config.baseURL);
    numberOfPendingRequests++;
    store.dispatch(initializeIsLoading(true));
    console.log("after true dispatch", numberOfPendingRequests);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    numberOfPendingRequests--;
    console.log("after --", numberOfPendingRequests);
    if (numberOfPendingRequests === 0) {
      store.dispatch(initializeIsLoading(false));
    }
    return response;
  },
  async (error) => {
    numberOfPendingRequests--;
    if (error) {
      store.dispatch(initializeIsLoading(false));
    }

    const currentTime = Date.now();
    const elapsedTimeSinceLastRefresh = currentTime - lastRefreshTime;

    const isLoginRequest = error.config.url.includes("/api/v1/login");
    const isRegisterRequest = error.config.url.includes("/api/v1/register");

    if (isLoginRequest || isRegisterRequest) {
      return Promise.reject(error);
    }

    if (
      elapsedTimeSinceLastRefresh >= 4 * 60 * 1000 ||
      (error.response && error.response.status === 498) ||
      (error.response && error.response.status === 401)
    ) {
      store.dispatch(initializeIsLoading(false));
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
        store.dispatch(initializeIsLoading(false));
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
    store.dispatch(initializeIsLoading(false));
    return Promise.reject(error);
  }
);

export default api;
