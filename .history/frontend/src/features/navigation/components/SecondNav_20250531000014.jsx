import React from 'react';
import { Button, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { selectCategories } from '../path_to_your_slice'; // Replace with actual path

const SecondNav = () => {
  const categories = useSelector(selectCategories);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1A2E4D',
        padding: '8px 16px',
      }}
    >
      {/* Categories Menu Button */}
      <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Button
          startIcon={<MenuIcon />}
          endIcon={<ExpandMoreIcon />}
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
          onClose={handleMouseLeave}
          MenuListProps={{
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
          }}
          PaperProps={{
            style: {
              backgroundColor: '#1A2E4D',
              color: 'white',
            },
          }}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              onClick={handleMouseLeave}
              sx={{ color: 'white' }}
            >
              {category.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Static Links */}
      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Button
          sx={{
            color: 'white',
            textTransform: 'none',
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          Home
        </Button>
        <Button
          sx={{
            color: 'white',
            textTransform: 'none',
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          Shop
        </Button>
        <Button
          endIcon={<ExpandMoreIcon />}
          sx={{
            color: 'white',
            textTransform: 'none',
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          Brand
        </Button>
        <Button
          endIcon={<ExpandMoreIcon />}
          sx={{
            color: 'white',
            textTransform: 'none',
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          Pages
        </Button>
        <Button
          sx={{
            color: 'white',
            textTransform: 'none',
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          Contact
        </Button>
      </Box>
    </Box>
  );
};

export default SecondNav;
