// src/components/AdminLayout.jsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Import Home Icon

const drawerWidth = 240;

const AdminLayout = () => {
  const navigate = useNavigate(); // Use React Router's useNavigate hook for navigation

  // Handle Log Out
  const handleLogout = () => {
    // Perform log out logic here (e.g., clearing user session, token, etc.)
    console.log("Logging out...");
    // Redirect to login page or another page after logout
    navigate("/login"); // Adjust the redirect route as needed
  };

  // Handle navigation to the home page
  const handleHome = () => {
    navigate("/"); // Adjust according to your home route
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>

          {/* Home Button */}
          <Tooltip title="Home">
            <IconButton edge="end" color="inherit" onClick={handleHome}>
              <HomeIcon />
            </IconButton>
          </Tooltip>

          {/* Log Out Button */}
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/admin/repair-requests">
            <ListItemText primary="Repair Requests" />
          </ListItem>
          <ListItem button component={Link} to="/admin/clients">
            <ListItemText primary="Clients" />
          </ListItem>
          <ListItem button component={Link} to="/admin/devices">
            <ListItemText primary="Devices" />
          </ListItem>
          {/* Add more admin links as needed */}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
