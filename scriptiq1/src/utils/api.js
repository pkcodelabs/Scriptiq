import axios from "axios";
import { store } from "../redux/store/store";
import { setLoading, clearLoading } from "../redux/slices/uislice";
import { baseUrl } from "./endpoints";

// --- Helpers ---
const API_BASE_URL = baseUrl;

const DEFAULT_TIMEOUT = 30000; // 30s

// --- Axios instance ---
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: DEFAULT_TIMEOUT,
  withCredentials: false, // flip to true if backend uses cookies
});

// --- Request interceptor ---
api.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading());

    // attach token
    const token =
      localStorage.getItem("access_token") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    store.dispatch(clearLoading());
    return Promise.reject(error);
  }
);

// --- Response interceptor ---
api.interceptors.response.use(
  (response) => {
    store.dispatch(clearLoading());

    // optional: auto-store token from login/signup
    if (response.data?.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }

    return response;
  },
  (error) => {
    store.dispatch(clearLoading());

    if (error.response) {
      const status = error.response.status;

      // force logout if unauthorized
      if (status === 401) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }

      // log CORS/network issues
      if (status === 0 || status === 403) {
        console.error("CORS/Forbidden error:", error.response);
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);
// ✅ Default headers builder
const buildHeaders = (headers = {}) => {
  if (headers["Content-Type"]) {
    // if user passed Content-Type, just return as-is
    return headers;
  }

  // else, fallback to JSON
  return { "Content-Type": "application/json", ...headers };
};

// ✅ Helper functions
export const get = (url, headers = {}) => api.get(url, buildHeaders(headers));

export const post = (url, data = {}, headers = {}) =>
  api.post(url, data, buildHeaders(headers));

export const put = (url, data = {}, headers = {}) =>
  api.put(url, data, buildHeaders(headers));

export const del = (url, headers = {}) =>
  api.delete(url, buildHeaders(headers));

export const patch = (url, data = {}, headers = {}) =>
  api.patch(url, data, buildHeaders(headers));

export default api;
