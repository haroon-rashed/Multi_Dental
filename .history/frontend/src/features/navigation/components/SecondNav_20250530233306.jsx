import React from 'react';
import { Button, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SecondNav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#1A2E4D', padding: '8px 16px' }}>
      <Button
        startIcon={<MenuIcon />}
        endIcon={<ExpandMoreIcon />}
        onClick={handleClick}
        sx={{
          color: 'white',
          textTransform: 'none',
          fontWeight: 'bold',
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: 'transparent' },
          marginRight: '16px',
        }}
      >
        Categories
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: '#1A2E4D',
            color: 'white',
          },
        }}
      >
        <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
          Home
          <ExpandMoreIcon sx={{ marginLeft: 'auto' }} />
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
          Shop
          <ExpandMoreIcon sx={{ marginLeft: 'auto' }} />
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
          Brand
          <ExpandMoreIcon sx={{ marginLeft: 'auto' }} />
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
          Pages
          <ExpandMoreIcon sx={{ marginLeft: 'auto' }} />
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: 'white' }}>
          Contact
          <ExpandMoreIcon sx={{ marginLeft: 'auto' }} />
        </MenuItem>
      </Menu>
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Button sx={{ color: 'white', textTransform: 'none', '&:hover': { backgroundColor: 'transparent' } }}>
          Home
        </Button>
        <Button sx={{ color: 'white', textTransform: 'none', '&:hover': { backgroundColor: 'transparent' } }}>
          Shop
        </Button>
        <Button
          endIcon={<ExpandMoreIcon />}
          sx={{ color: 'white', textTransform: 'none', '&:hover': { backgroundColor: 'transparent' } }}
        >
          Brand
        </Button>
        <Button
          endIcon={<ExpandMoreIcon />}
          sx={{ color: 'white', textTransform: 'none', '&:hover': { backgroundColor: 'transparent' } }}
        >
          Pages
        </Button>
        <Button sx={{ color: 'white', textTransform: 'none', '&:hover': { backgroundColor: 'transparent' } }}>
          Contact
        </Button>
      </Box>
    </Box>
  );
};

export default SecondNav;