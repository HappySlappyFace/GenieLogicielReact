// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api/v1", // Update with your backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const createRequest = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data); // Send POST request to the endpoint with data
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "An error occurred"
    );
  }
};

export const getRequests = async (endpoint) => {
  try {
    const response = await api.get(endpoint); // Send POST request to the endpoint with data
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "An error occurred"
    );
  }
};

export const updateRequest = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data); // Send POST request to the endpoint with data
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "An error occurred"
    );
  }
};

export const deleteRequest = async (endpoint) => {
  try {
    const response = await api.delete(endpoint); // Send DELETE request to the endpoint
    return response.data; // Return the response data
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "An error occurred"
    );
  }
};
