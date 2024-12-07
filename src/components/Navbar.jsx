// src/components/Navbar.jsx
import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link as RouterLink } from "react-router-dom";
import { ThemeContext } from "../theme/ThemeContext";

function Navbar() {
  const { toggleTheme, mode } = useContext(ThemeContext);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IT Management System
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/admin/dashboard">
            Admin
          </Button>
          <FormControlLabel
            control={
              <Switch
                checked={mode === "dark"}
                onChange={toggleTheme}
                color="secondary"
              />
            }
            label="Dark Mode"
            sx={{ ml: 2 }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
