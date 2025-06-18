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
  useTheme,
} from "@mui/material";
import {
  FaHome,
  FaUsers,
  FaShoppingCart,
  FaFileAlt,
  FaChartBar,
  FaUserCog,
  FaChevronDown,
  FaChevronUp,
  FaCog,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({
    products: location.pathname.includes("/admin/products"),
    sales: false,
  });

  const handleToggle = (key) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Check if current route matches
  const isActive = (path) => {
    return location.pathname === path;
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
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              textAlign: "center",
            }}
          >
            ADMIN MARKET
          </Typography>
        </Box>

        <Divider />

        <List sx={{ p: 1 }}>
          {/* Dashboard */}
          <ListItem
            button
            component={Link}
            to="/admin/dashboard"
            selected={isActive("/admin/dashboard")}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
                "&:hover": {
                  backgroundColor: theme.palette.action.selected,
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <FaHome />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          {/* Customers */}
          <ListItem
            button
            component={Link}
            to="/admin/customers"
            selected={isActive("/admin/customers")}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <FaUsers />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>

          {/* Products Dropdown */}
          <ListItem
            button
            onClick={() => handleToggle("products")}
            sx={{ borderRadius: 1, mb: 0.5 }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
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
            <List component="div" disablePadding>
              {/* Add Product */}
              <ListItem
                button
                component={Link}
                to="/admin/products/add"
                selected={isActive("/admin/products/add")}
                sx={{
                  pl: 4,
                  borderRadius: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                <ListItemText primary="Add Product" />
              </ListItem>

              {/* View Products */}
              <ListItem
                button
                component={Link}
                to="/admin/products"
                selected={isActive("/admin/products") || isActive("/admin/products/edit")}
                sx={{
                  pl: 4,
                  borderRadius: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                <ListItemText primary="View Products" />
              </ListItem>
            </List>
          </Collapse>

          {/* Sales Dropdown */}
          <ListItem
            button
            onClick={() => handleToggle("sales")}
            sx={{ borderRadius: 1, mb: 0.5 }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
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
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/admin/sales/overview"
                selected={isActive("/admin/sales/overview")}
                sx={{
                  pl: 4,
                  borderRadius: 1,
                  mb: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                <ListItemText primary="Overview" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/admin/sales/breakdown"
                selected={isActive("/admin/sales/breakdown")}
                sx={{
                  pl: 4,
                  borderRadius: 1,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                <ListItemText primary="Breakdown" />
              </ListItem>
            </List>
          </Collapse>

          {/* Transactions */}
          <ListItem
            button
            component={Link}
            to="/admin/transactions"
            selected={isActive("/admin/transactions")}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <FaFileAlt />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>

          {/* Admin Settings */}
          <ListItem
            button
            component={Link}
            to="/admin/settings"
            selected={isActive("/admin/settings")}
            sx={{
              borderRadius: 1,
              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <FaUserCog />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
        </List>
      </Box>

      {/* Bottom Avatar + Settings */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" />
            <Typography variant="body2">Admin User</Typography>
          </Box>
          <IconButton component={Link} to="/admin/settings">
            <FaCog />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;