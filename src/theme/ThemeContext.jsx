// src/theme/ThemeContext.js
import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

export const ThemeProviderCustom = ({ children }) => {
  const [mode, setMode] = useState("light"); // Default to light mode

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#DC143C", // Crimson Red
          },
          secondary: {
            main: "#ffffff", // White for contrast
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
