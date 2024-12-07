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
  // Placeholder logic
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (endpoint) {
        case "/repair-requests":
          resolve({
            data: [
              // Add or remove data to test empty states
              {
                id: 1,
                clientName: "John Doe",
                deviceBrand: "HP",
                deviceModel: "LaserJet Pro",
                depositDate: "2024-11-01",
                status: "In Progress",
              },
            ],
          });
          break;
        case "/clients":
          resolve({
            data: [
              {
                id: 1,
                name: "Alice Smith",
                address: "123 Elm St",
                phoneNumber: "555-1234",
              },
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
            ],
          });
          break;
        default:
          resolve({ data: [] });
      }
    }, 500);
  });
};
