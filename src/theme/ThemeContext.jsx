// src/contexts/ThemeContext.jsx
import { createContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeProviderCustom = ({ children }) => {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#dc004e",
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
