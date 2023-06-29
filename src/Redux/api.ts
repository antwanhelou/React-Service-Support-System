import axios from "axios";
import { store } from "./store";

export const api = axios.create({
  baseURL: "https://wosh-test.herokuapp.com/api/",
});
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const { token } = state.auth;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
