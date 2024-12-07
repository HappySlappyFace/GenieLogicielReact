/* eslint-disable no-unused-vars */
// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/v1"; // Replace with your backend URL
// const API_BASE_URL = "http://192.168.1.49:8081/api/v1"; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Placeholder for createRequest
export const createRequest = async (endpoint, data) => {
  // Replace with actual API call
  // Example:
  // return await api.post(endpoint, data);
  // For now, return a resolved promise with mock data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === "/auth/authenticate") {
        if (data.username === "admin" && data.password === "password") {
          resolve({ data: { token: "fake-jwt-token", role: "admin" } });
        } else {
          reject(new Error("Invalid credentials"));
        }
      } else {
        resolve({ data: [] }); // Adjust based on endpoint
      }
    }, 1000);
  });
};

// Placeholder for getRequests
export const getRequests = async (endpoint) => {
  // Replace with actual API call
  // Example:
  // return await api.get(endpoint);
  // For now, return a resolved promise with mock data
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      switch (endpoint) {
        case "/repair-requests":
          resolve({
            data: [
              {
                id: 1,
                clientName: "John Doe",
                deviceBrand: "HP",
                deviceModel: "LaserJet Pro",
                depositDate: "2024-11-01",
                status: "In Progress",
              },
              // Add more mock repair requests
            ],
          });
          break;
        case "/clients":
          resolve({
            data: [
              {
                id: 1,
                name: "John Doe",
                address: "123 Main St",
                phoneNumber: "555-1234",
              },
              // Add more mock clients
            ],
          });
          break;
        case "/devices":
          resolve({
            data: [
              {
                id: 1,
                brand: "HP",
                model: "LaserJet Pro",
                serialNumber: "SN123456",
              },
              // Add more mock devices
            ],
          });
          break;
        default:
          resolve({ data: [] });
      }
    }, 1000);
  });
};
