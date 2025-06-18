import React from "react";
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
} from "react-icons/fa";

const menu = [
  { label: "Dashboard", icon: <FaHome />, path: "/dashboard" },
  { label: "Client Facing", path: "/client-facing" },
  { label: "Products", icon: <FaShoppingCart />, path: "/products" },
  { label: "Customers", icon: <FaUsers />, path: "/customers" },
  { label: "Transactions", icon: <FaFileAlt />, path: "/transactions" },
  {
    label: "Sales",
    children: [
      { label: "Overview", icon: <FaChartBar />, path: "/sales/overview" },
      { label: "Breakdown", icon: <FaChartPie />, path: "/sales/breakdown" },
    ],
  },
  { label: "Management", path: "/management" },
  { label: "Admin", icon: <FaUserCog />, path: "/admin" },
];

export default function AdminSidebar() {
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
          backgroundColor: "#f9fafb", // Light gray
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
            color: "#d97706", // Yellow-700
            mb: 4,
          }}
        >
          ADMIN MARKET
        </Typography>

        <List>
          {menu.map((item, i) => (
            <Box key={i}>
              <ListItem button sx={{ color: "#92400e" /* Yellow-800 */ }}>
                {item.icon && <ListItemIcon sx={{ color: "#92400e" }}>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.label} />
              </ListItem>

              {item.children && (
                <Collapse in={true} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    {item.children.map((child, j) => (
                      <ListItem
                        key={j}
                        button
                        sx={{
                          color: "#b45309", // Slightly lighter yellow
                          fontSize: "0.875rem",
                        }}
                      >
                        {child.icon && <ListItemIcon sx={{ color: "#b45309" }}>{child.icon}</ListItemIcon>}
                        <ListItemText primary={child.label} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1, mb: 2 }}>
        <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" />
        <IconButton>
          <FaCog color="#92400e" />
        </IconButton>
      </Box>
    </Drawer>
  );
}
