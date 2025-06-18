import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Divider,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  FaHome,
  FaUsers,
  FaShoppingCart,
  FaFileAlt,
  FaChartBar,
  FaChartPie,
  FaCog,
  FaUserCog,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const AdminSidebar = () => {
  // State for submenu toggles
  const [openSubmenus, setOpenSubmenus] = useState({
    products: false,
    sales: false,
  });

  const handleToggle = (key) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f9fafb",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
        },
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#d97706",
            mb: 4,
          }}
        >
          ADMIN MARKET
        </Typography>

        <List>
          {/* Static Menu Items */}
          <ListItem button sx={{ color: "#92400e" }}>
            <ListItemIcon sx={{ color: "#92400e" }}>
              <FaHome />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button sx={{ color: "#92400e" }}>
            <ListItemIcon sx={{ color: "#92400e" }}>
              <FaUsers />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>

          {/* Products Dropdown */}
          <ListItem
            button
            onClick={() => handleToggle("products")}
            sx={{ color: "#92400e" }}
          >
            <ListItemIcon sx={{ color: "#92400e" }}>
              <FaShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {openSubmenus.products ? (
              <FaChevronUp size={14} />
            ) : (
              <FaChevronDown size={14} />
            )}
          </ListItem>

          <Collapse in={openSubmenus.products} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem button sx={{ color: "#b45309", fontSize: "0.875rem" }}>
                <ListItemText primary="Add Product" />
              </ListItem>
              <ListItem button sx={{ color: "#b45309", fontSize: "0.875rem" }}>
              <ListItem button component={Link} to="/product-table">
                <ListItemText primary="View Products" />
              </ListItem>
              </ListItem>
            </List>
          </Collapse>

          {/* Sales Dropdown */}
          <ListItem
            button
            onClick={() => handleToggle("sales")}
            sx={{ color: "#92400e" }}
          >
            <ListItemIcon sx={{ color: "#92400e" }}>
              <FaChartBar />
            </ListItemIcon>
            <ListItemText primary="Sales" />
            {openSubmenus.sales ? (
              <FaChevronUp size={14} />
            ) : (
              <FaChevronDown size={14} />
            )}
          </ListItem>

          <Collapse in={openSubmenus.sales} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem button sx={{ color: "#b45309", fontSize: "0.875rem" }}>
                <ListItemText primary="Overview" />
              </ListItem>
              <ListItem button sx={{ color: "#b45309", fontSize: "0.875rem" }}>
                <ListItemText primary="Breakdown" />
              </ListItem>
            </List>
          </Collapse>

          {/* More Items */}
          <ListItem button sx={{ color: "#92400e" }}>
            <ListItemIcon sx={{ color: "#92400e" }}>
              <FaFileAlt />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>

          <ListItem button sx={{ color: "#92400e" }}>
            <ListItemIcon sx={{ color: "#92400e" }}>
              <FaUserCog />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
        </List>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          mb: 2,
        }}
      >
        <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" />
        <IconButton>
          <FaCog color="#92400e" />
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
