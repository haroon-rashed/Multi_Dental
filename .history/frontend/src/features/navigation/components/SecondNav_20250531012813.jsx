import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Box,
  Popper,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { selectCategories } from '../redux/slices/CategorySlice'; // update the path

const SecondNav = () => {
  const categories = useSelector(selectCategories);

  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setHoveredCategory(null);
  };

  const handleSubmenuEnter = (event, category) => {
    setSubmenuAnchorEl(event.currentTarget);
    setHoveredCategory(category);
  };

  const handleSubmenuLeave = () => {
    setHoveredCategory(null);
  };

  const parentCategories = categories.filter((cat) => !cat.parent_id);
  const getSubcategories = (parentId) =>
    categories.filter((cat) => cat.parent_id === parentId);

  const open = Boolean(anchorEl);
  const submenuOpen = Boolean(
    hoveredCategory && getSubcategories(hoveredCategory._id).length > 0
  );

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1A2E4D',
        padding: '8px 16px',
      }}
    >
      {/* Categories Button */}
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

        {/* Parent Categories Menu */}
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
              minWidth: '250px',
            },
          }}
        >
          {parentCategories.map((category) => (
            <MenuItem
              key={category._id}
              onMouseEnter={(e) => handleSubmenuEnter(e, category)}
              onMouseLeave={handleSubmenuLeave}
              sx={{
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {category.name}
              {getSubcategories(category._id).length > 0 && <ExpandMoreIcon />}
            </MenuItem>
          ))}
        </Menu>

        {/* Subcategories as Popper */}
        {submenuOpen && (
          <Popper
            open={submenuOpen}
            anchorEl={submenuAnchorEl}
            placement="right-start"
            style={{ zIndex: 1302 }}
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={handleSubmenuLeave}
          >
            <Paper
              sx={{
                backgroundColor: '#1A2E4D',
                color: 'white',
                minWidth: '250px',
              }}
            >
              {getSubcategories(hoveredCategory._id).map((sub) => (
                <MenuItem key={sub._id} sx={{ color: 'white' }}>
                  {sub.name}
                </MenuItem>
              ))}
            </Paper>
          </Popper>
        )}
      </Box>

      {/* Other Nav Items */}
      <Box sx={{ display: 'flex', gap: '16px' }}>
        {['Home', 'Shop', 'Brand', 'Pages', 'Contact'].map((item) => (
          <Button
            key={item}
            sx={{
              color: 'white',
              textTransform: 'none',
              '&:hover': { backgroundColor: 'transparent' },
            }}
            endIcon={['Brand', 'Pages'].includes(item) ? <ExpandMoreIcon /> : null}
          >
            {item}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SecondNav;
