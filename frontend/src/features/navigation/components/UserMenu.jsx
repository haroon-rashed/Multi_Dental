import React, { useState } from 'react';
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Box
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Orders", path: "/orders" },
  { name: "Wishlist", path: "/wishlist" },
  { name: "Logout", path: "/logout" }
];

export const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userInfo = useSelector(selectUserInfo);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginClick = () => {
    navigate('/login', { state: { from: window.location.pathname } });
  };

  if (!loggedInUser) {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={handleLoginClick}
        sx={{
          ml: 2,
          minWidth: '100px',
          height: '36px'
        }}
      >
        Login
      </Button>
    );
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton 
          onClick={handleOpenUserMenu} 
          sx={{ p: 0, ml: 1 }}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
        >
          <Avatar 
            alt={userInfo?.name || 'User'} 
            src={userInfo?.avatar} 
            sx={{ 
              width: 36, 
              height: 36,
              bgcolor: 'primary.dark',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 500
            }}
          >
            {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Box px={2} py={1} borderBottom={1} borderColor="divider">
          <Typography variant="subtitle2" color="text.secondary">
            {userInfo?.name || 'User'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {userInfo?.email || ''}
          </Typography>
        </Box>
        
        {loggedInUser?.isAdmin && (
          <MenuItem onClick={handleCloseUserMenu} component={Link} to="/admin/dashboard">
            <Typography textAlign="center">Admin Dashboard</Typography>
          </MenuItem>
        )}
        
        {settings.map((setting) => (
          <MenuItem 
            key={setting.name} 
            onClick={handleCloseUserMenu}
            component={Link}
            to={setting.path}
          >
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
