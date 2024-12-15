// src/pages/Admin.jsx
import { Routes, Route } from "react-router-dom";
import RepairRequests from "./admin/RepairRequests";
import Clients from "./admin/Clients";
import Devices from "./admin/Devices";
import Reparation from "./admin/Reparation";

const Admin = () => {
  return (
    <Routes>
      {/* <Route path="repair-requests" element={<RepairRequests />} />
      <Route path="clients" element={<Clients />} />
      <Route path="devices" element={<Devices />} /> */}
      {/* <Route path="repair" element={<Reparation />} /> */}
    </Routes>
  );
};

export default Admin;
