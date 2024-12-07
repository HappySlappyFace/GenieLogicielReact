// src/theme/theme.js
import { createTheme } from "@mui/material/styles";
// import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DC143C", // Crimson Red
    },
    secondary: {
      main: "#ffffff", // White for contrast
    },
  },
});

export default theme;
