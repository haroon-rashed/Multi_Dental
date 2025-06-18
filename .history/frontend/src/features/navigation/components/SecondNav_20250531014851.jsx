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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../categories/CategoriesSlice';

const SecondNav = () => {
  const categories = useSelector(selectCategories);
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = (event) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setAnchorEl(null);
      setHoveredCategory(null);
      setSubmenuAnchorEl(null);
    }, 150); // Small delay to allow moving to submenu
    setHoverTimeout(timeout);
  };

  const handleSubmenuEnter = (event, category) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setSubmenuAnchorEl(event.currentTarget);
    setHoveredCategory(category);
  };

  const handleSubmenuLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCategory(null);
      setSubmenuAnchorEl(null);
    }, 150);
    setHoverTimeout(timeout);
  };

  const handleSubmenuMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleCompleteMouseLeave = () => {
    setAnchorEl(null);
    setHoveredCategory(null);
    setSubmenuAnchorEl(null);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  // Filter parent categories (those without parent_id)
  const parentCategories = categories.filter((cat) => !cat.parent_id);
  
  // Get subcategories for a given parent ID
  const getSubcategories = (parentId) =>
    categories.filter((cat) => cat.parent_id && cat.parent_id.toString() === parentId.toString());

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
        position: 'relative',
        zIndex: 1300,
      }}
    >
      {/* Categories Button */}
      <Box 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        sx={{ position: 'relative' }}
      >
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
          onClose={handleCompleteMouseLeave}
          MenuListProps={{
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            sx: { padding: 0 }
          }}
          PaperProps={{
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            style: {
              backgroundColor: '#1A2E4D',
              color: 'white',
              minWidth: '250px',
              overflow: 'visible',
              marginTop: '8px',
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {parentCategories.map((category) => {
            const hasSubcategories = getSubcategories(category._id).length > 0;
            return (
              <MenuItem
                key={category._id}
                onMouseEnter={(e) => handleSubmenuEnter(e, category)}
                onMouseLeave={handleSubmenuLeave}
                sx={{
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  minHeight: '48px',
                }}
              >
                <span>{category.name}</span>
                {hasSubcategories && (
                  <ChevronRightIcon sx={{ fontSize: '20px', marginLeft: '8px' }} />
                )}
              </MenuItem>
            );
          })}
        </Menu>

        {/* Subcategories Popper */}
        {submenuOpen && (
          <Popper
            open={submenuOpen}
            anchorEl={submenuAnchorEl}
            placement="right-start"
            style={{ zIndex: 1302 }}
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [8, 0], // Small gap between menus
                },
              },
            ]}
          >
            <Paper
              onMouseEnter={handleSubmenuMouseEnter}
              onMouseLeave={handleSubmenuLeave}
              sx={{
                backgroundColor: '#1A2E4D',
                color: 'white',
                minWidth: '250px',
                padding: 0,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              {getSubcategories(hoveredCategory._id).map((sub) => (
                <MenuItem 
                  key={sub._id} 
                  sx={{ 
                    color: 'white', 
                    padding: '12px 16px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    minHeight: '48px',
                  }}
                >
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
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              padding: '8px 16px',
              borderRadius: '4px',
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