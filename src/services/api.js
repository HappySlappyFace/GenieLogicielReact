// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/v1"; // Replace with your backend URL
// const API_BASE_URL = "http://192.168.1.49:8081/api/v1"; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getRequests = () => api.get("/requests");

export const createRequest = (url, data) =>
  api.post(url, data, {
    headers: {
      "Content-Type": "application/json", // Ensure correct content type is set
    },
  });

export const updateRequestStatus = (id, status) =>
  api.put(`/requests/${id}/status`, { status });

// Export other API methods as needed
