// src/pages/Admin.jsx
import { Routes, Route } from "react-router-dom";
import RepairRequests from "./admin/RepairRequests";
import Clients from "./admin/Clients";
import Devices from "./admin/Devices";

const Admin = () => {
  return (
    <Routes>
      <Route path="repair-requests" element={<RepairRequests />} />
      <Route path="clients" element={<Clients />} />
      <Route path="devices" element={<Devices />} />
      {/* Add more admin sub-routes as needed */}
    </Routes>
  );
};

export default Admin;
