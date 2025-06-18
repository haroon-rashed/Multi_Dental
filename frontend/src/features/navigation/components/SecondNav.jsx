import React, { useState } from "react";
import { Button, Menu, MenuItem, Box, Popper, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import { selectCategories } from "../../categories/CategoriesSlice";

const SecondNav = () => {
  const categories = useSelector(selectCategories);
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const clearHoverTimeout = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleMouseEnter = (event) => {
    clearHoverTimeout();
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setAnchorEl(null);
      setHoveredCategory(null);
      setSubmenuAnchorEl(null);
    }, 200); // Increased delay
    setHoverTimeout(timeout);
  };

  const handleSubmenuEnter = (event, category) => {
    clearHoverTimeout();
    setSubmenuAnchorEl(event.currentTarget);
    setHoveredCategory(category);
  };

  const handleSubmenuLeave = () => {
    // Don't set timeout here - let the main menu handle it
    // This prevents premature closing when moving between menu items
  };

  const handleSubmenuMouseEnter = () => {
    clearHoverTimeout();
  };

  const handleSubmenuMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCategory(null);
      setSubmenuAnchorEl(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  const handleCompleteMouseLeave = () => {
    setAnchorEl(null);
    setHoveredCategory(null);
    setSubmenuAnchorEl(null);
    clearHoverTimeout();
  };

  // Menu container mouse events
  const handleMenuMouseEnter = () => {
    clearHoverTimeout();
  };

  const handleMenuMouseLeave = () => {
    const timeout = setTimeout(() => {
      setAnchorEl(null);
      setHoveredCategory(null);
      setSubmenuAnchorEl(null);
    }, 200);
    setHoverTimeout(timeout);
  };

  // Fixed subcategory filtering logic
  const getSubcategories = (parentId) => {
    return categories.filter((cat) => {
      let catParentId = cat.parent_id;

      if (catParentId && typeof catParentId === "object" && catParentId._id) {
        catParentId = catParentId._id;
      }

      const parentIdStr = String(parentId);
      const catParentIdStr = String(catParentId);

      return catParentId && catParentIdStr === parentIdStr;
    });
  };

  // Fixed parent category filtering
  const parentCategories = categories.filter((cat) => {
    let parentId = cat.parent_id;

    if (parentId && typeof parentId === "object" && parentId._id) {
      parentId = parentId._id;
    }

    return !parentId || parentId === null || parentId === undefined;
  });

  const open = Boolean(anchorEl);
  const submenuOpen = Boolean(
    hoveredCategory &&
      getSubcategories(hoveredCategory._id || hoveredCategory.id).length > 0
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#1A2E4D",
        padding: "8px 16px",
        position: "relative",
        zIndex: 1300,
      }}
    >
      {/* Categories Button */}
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ position: "relative" }}
      >
        <Button
          startIcon={<MenuIcon />}
          endIcon={<ExpandMoreIcon />}
          sx={{
            color: "white",
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent" },
            marginRight: "16px",
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
            onMouseEnter: handleMenuMouseEnter,
            onMouseLeave: handleMenuMouseLeave,
            sx: { padding: 0, maxHeight: "400px", overflowY: "auto" },
          }}
          PaperProps={{
            onMouseEnter: handleMenuMouseEnter,
            onMouseLeave: handleMenuMouseLeave,
            style: {
              backgroundColor: "#1A2E4D",
              color: "white",
              minWidth: "250px",
              overflow: "visible",
              marginTop: "8px",
              maxHeight: "400px",
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {parentCategories.map((category) => {
            const categoryId = category._id || category.id;
            const subcategories = getSubcategories(categoryId);
            const hasSubcategories = subcategories.length > 0;

            return (
              <MenuItem
                key={categoryId}
                onMouseEnter={(e) => handleSubmenuEnter(e, category)}
                onMouseLeave={handleSubmenuLeave}
                sx={{
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  minHeight: "48px",
                }}
              >
                <span>{category.name}</span>
                {hasSubcategories && (
                  <ChevronRightIcon
                    sx={{ fontSize: "20px", marginLeft: "8px" }}
                  />
                )}
              </MenuItem>
            );
          })}
        </Menu>

        {/* Subcategories Popper */}
        {submenuOpen && hoveredCategory && (
          <Popper
            open={submenuOpen}
            anchorEl={submenuAnchorEl}
            placement="right-start"
            style={{ zIndex: 1302 }}
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 0], // Reduced gap between main menu and submenu
                },
              },
            ]}
          >
            <Paper
              onMouseEnter={handleSubmenuMouseEnter}
              onMouseLeave={handleSubmenuMouseLeave}
              sx={{
                backgroundColor: "#1A2E4D",
                color: "white",
                minWidth: "250px",
                padding: 0,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                maxHeight: "300px",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "3px",
                },
              }}
            >
              {getSubcategories(hoveredCategory._id || hoveredCategory.id).map(
                (sub) => (
                  <MenuItem
                    key={sub._id || sub.id}
                    sx={{
                      color: "white",
                      padding: "12px 16px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                      minHeight: "48px",
                    }}
                  >
                    {sub.name}
                  </MenuItem>
                )
              )}
            </Paper>
          </Popper>
        )}
      </Box>

      {/* Other Nav Items */}
      <Box sx={{ display: "flex", gap: "16px" }}>
        {["Home", "Shop", "Brand", "Pages", "Contact"].map((item) => (
          <Button
            key={item}
            sx={{
              color: "white",
              textTransform: "none",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              padding: "8px 16px",
              borderRadius: "4px",
            }}
            endIcon={
              ["Brand", "Pages"].includes(item) ? <ExpandMoreIcon /> : null
            }
          >
            {item}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SecondNav;
