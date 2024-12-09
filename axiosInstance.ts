import axios, { AxiosInstance } from "axios";
import { initialUserState } from "./src/components/TopNavigation/TopNavigation";
import { initializeIsLoading } from "./src/redux/reducers/IsLoadingReducer";
import { initializeUser } from "./src/redux/reducers/UserReducer";
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

var numberOfPendingRequests = 0;

api.interceptors.request.use(
  function (config) {
    numberOfPendingRequests++;
    store.dispatch(initializeIsLoading(true));
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    numberOfPendingRequests--;
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

    const isLoginRequest = error.config.url.includes("/api/v1/login");
    const isRegisterRequest = error.config.url.includes("/api/v1/register");

    if (isLoginRequest || isRegisterRequest) {
      return Promise.reject(error);
    }

    if (
      (error.response && error.response.status === 498) ||
      (error.response && error.response.status === 401)
    ) {
      store.dispatch(initializeIsLoading(false));
      const data = {};
      try {
        const response = await axios.post(`${baseURL}/api/v1/refresh`, data, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });

        store.dispatch(initializeUser(response.data.user));

        return api.request(error.config);
      } catch (refreshError: any) {
        store.dispatch(initializeIsLoading(false));
        store.dispatch(initializeUser(initialUserState));
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
