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
  Menu,
  MenuItem,
  Button,
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
  FaListAlt,
  FaSitemap,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaTags,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, logoutAsync } from "../../auth/AuthSlice";
import { selectUserInfo } from "../../user/UserSlice";

const AdminSidebar = () => {
  const [openSubmenus, setOpenSubmenus] = useState({
    products: false,
    category: false,
    sales: false,
    subcategories: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const loggedInUser = useSelector(selectLoggedInUser);

  const handleToggle = (key) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSignOut = () => {
    dispatch(logoutAsync());
    navigate("/");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleProfileMenuClose();
    navigate("/admin/profile");
  };

  const handleOrdersClick = () => {
    handleProfileMenuClose();
    navigate("/admin/orders");
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
          {/* Dashboard */}
          <ListItem
            button
            component={Link}
            to="/admin/dashboard"
            sx={{ color: "#92400e" }}
          >
            <ListItemIcon sx={{ color: "#92400e" }}>
              <FaHome />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          {/* Customers */}
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
              <ListItem
                button
                component={Link}
                to="/admin/add-product"
                sx={{ color: "#b45309" }}
              >
                <ListItemText primary="Add Product" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/admin/product-table"
                sx={{ color: "#b45309" }}
              >
                <ListItemText primary="View Products" />
              </ListItem>
            </List>
          </Collapse>

          {/* Category Dropdown */}
          <ListItem
            button
            onClick={() => handleToggle("category")}
            sx={{ color: "#92400e" }}
          >
            <ListItemIcon sx={{ color: "#92400e" }}>
              <FaListAlt />
            </ListItemIcon>
            <ListItemText primary="Category" />
            {openSubmenus.category ? (
              <FaChevronUp size={14} />
            ) : (
              <FaChevronDown size={14} />
            )}
          </ListItem>

          <Collapse in={openSubmenus.category} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem
                button
                component={Link}
                to="/admin/add-category"
                sx={{ color: "#b45309" }}
              >
                <ListItemText primary="Add Category" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/admin/view-category"
                sx={{ color: "#b45309" }}
              >
                <ListItemText primary="View Categories" />
              </ListItem>
            </List>
          </Collapse>

          {/* Brands Dropdown */}
          <ListItem
            button
            onClick={() => handleToggle("brands")}
            sx={{ color: "#92400e" }}
          >
            <ListItemIcon sx={{ color: "#92400e" }}>
              <FaTags /> {/* You can use FaTags or another suitable icon */}
            </ListItemIcon>
            <ListItemText primary="Brands" />
            {openSubmenus.brands ? (
              <FaChevronUp size={14} />
            ) : (
              <FaChevronDown size={14} />
            )}
          </ListItem>

          <Collapse in={openSubmenus.brands} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem
                button
                component={Link}
                to="/admin/add-brand"
                sx={{ color: "#b45309" }}
              >
                <ListItemText primary="Add Brand" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/admin/view-brands"
                sx={{ color: "#b45309" }}
              >
                <ListItemText primary="View Brands" />
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
              <ListItem button sx={{ color: "#b45309" }}>
                <ListItemText primary="Overview" />
              </ListItem>
              <ListItem button sx={{ color: "#b45309" }}>
                <ListItemText primary="Breakdown" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/admin/orders"
                sx={{ color: "#b45309" }}
              >
                <ListItemText primary="Orders" />
              </ListItem>
            </List>
          </Collapse>

          {/* Transactions */}
          <ListItem button sx={{ color: "#92400e" }}>
            <ListItemIcon sx={{ color: "#92400e" }}>
              <FaFileAlt />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>

          {/* Admin Settings */}
          <ListItem button sx={{ color: "#92400e" }}>
            <ListItemIcon sx={{ color: "#92400e" }}>
              <FaUserCog />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>

          {/* Logout */}
          <ListItem button onClick={handleSignOut} sx={{ color: "#dc2626" }}>
            <ListItemIcon sx={{ color: "#dc2626" }}>
              <FaSignOutAlt />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>

      {/* Bottom Profile Section */}
      <Box>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1,
            mb: 2,
            cursor: "pointer",
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              borderRadius: 1,
            },
            p: 1,
          }}
          onClick={handleProfileMenuOpen}
        >
          <Avatar
            src={
              loggedInUser?.profilePicture ||
              "https://randomuser.me/api/portraits/women/44.jpg"
            }
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#92400e" }}
            >
              {userInfo?.name || "Admin User"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#b45309" }}>
              Administrator
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <FaUser fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleOrdersClick}>
          <ListItemIcon>
            <FaClipboardList fontSize="small" />
          </ListItemIcon>
          Orders
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <FaSignOutAlt fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Drawer>
  );
};

export default AdminSidebar;
