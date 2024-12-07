import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProviderCustom } from "./theme/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProviderCustom>
      {/* <CssBaseline /> Provides a consistent baseline */}
      <App />
    </ThemeProviderCustom>
  </StrictMode>
);
