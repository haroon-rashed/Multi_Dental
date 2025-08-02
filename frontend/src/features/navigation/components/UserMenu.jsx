import React, { useState } from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Orders", path: "/orders" },
  { name: "Logout", path: "/logout" }
];

export const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userInfo = useSelector(selectUserInfo);
  const loggedInUser = useSelector(selectLoggedInUser);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={userInfo?.name} src="null" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {loggedInUser?.isAdmin && (
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography
              component={Link}
              color={"text.primary"}
              sx={{ textDecoration: "none" }}
              to="/admin/add-product"
              textAlign="center"
            >
              Add new Product
            </Typography>
          </MenuItem>
        )}
        {settings.map((setting) => (
          <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
            <Typography
              component={Link}
              color={"text.primary"}
              sx={{ textDecoration: "none" }}
              to={setting.path}
              textAlign="center"
            >
              {setting.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
