// src/pages/Admin/index.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Clients from "./Clients";
import Requests from "./Requests";
import Invoices from "./Invoices";

function Admin() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="clients" element={<Clients />} />
      <Route path="requests" element={<Requests />} />
      <Route path="invoices" element={<Invoices />} />
      {/* Redirect to dashboard if no sub-route is provided */}
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}

export default Admin;
