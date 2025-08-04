import React, { useState, useEffect } from "react";
import { Button, Menu, MenuItem, Box, Popper, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCategories } from "../../categories/CategoriesSlice";
import { selectBrands, fetchAllBrandsAsync } from "../../brands/BrandSlice";

const SecondNav = () => {
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [brandAnchorEl, setBrandAnchorEl] = useState(null);
  const [brandHoverTimeout, setBrandHoverTimeout] = useState(null);
  const [pagesAnchorEl, setPagesAnchorEl] = useState(null);

  // Fetch brands on component mount
  useEffect(() => {
    if (brands.length === 0) {
      dispatch(fetchAllBrandsAsync());
    }
  }, [dispatch, brands.length]);

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
    // Don't close the menu automatically - let user click to close
    // const timeout = setTimeout(() => {
    //   setAnchorEl(null);
    //   setHoveredCategory(null);
    //   setSubmenuAnchorEl(null);
    // }, 500);
    // setHoverTimeout(timeout);
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
    // Don't close the submenu automatically
    // const timeout = setTimeout(() => {
    //   setHoveredCategory(null);
    //   setSubmenuAnchorEl(null);
    // }, 500);
    // setHoverTimeout(timeout);
  };

  const handleCompleteMouseLeave = () => {
    setAnchorEl(null);
    setHoveredCategory(null);
    setSubmenuAnchorEl(null);
    clearHoverTimeout();
  };

  // Brand hover handlers
  const handleBrandMouseEnter = (event) => {
    if (brandHoverTimeout) {
      clearTimeout(brandHoverTimeout);
      setBrandHoverTimeout(null);
    }
    setBrandAnchorEl(event.currentTarget);
  };

  const handleBrandMouseLeave = () => {
    const timeout = setTimeout(() => {
      setBrandAnchorEl(null);
    }, 200);
    setBrandHoverTimeout(timeout);
  };

  const handleBrandMenuMouseEnter = () => {
    if (brandHoverTimeout) {
      clearTimeout(brandHoverTimeout);
      setBrandHoverTimeout(null);
    }
  };

  const handleBrandMenuMouseLeave = () => {
    const timeout = setTimeout(() => {
      setBrandAnchorEl(null);
    }, 200);
    setBrandHoverTimeout(timeout);
  };

  // Contact scroll handler
  const handleContactClick = () => {
    const footer = document.querySelector("#footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Home navigation handler
  const handleHomeClick = () => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home page
      navigate("/");
      // Scroll to top after navigation
      window.scrollTo(0, 0);
    }
  };

  // Shop navigation handler
  const handleShopClick = () => {
    navigate("/products");
  };

  // Category navigation handler
  const handleCategoryClick = (category) => {
    const categoryId = category._id || category.id;
    const subcategories = getSubcategories(categoryId);
    
    if (subcategories.length > 0) {
      // If has subcategories, navigate to the first subcategory
      navigate(`/subcategory/${subcategories[0]._id || subcategories[0].id}`);
    } else {
      // If no subcategories, navigate to category page
      navigate(`/category/${categoryId}`);
    }
    
    // Close all menus
    setAnchorEl(null);
    setHoveredCategory(null);
    setSubmenuAnchorEl(null);
    clearHoverTimeout();
  };

  // Subcategory navigation handler
  const handleSubcategoryClick = (subcategory) => {
    const subcategoryId = subcategory._id || subcategory.id;
    navigate(`/subcategory/${subcategoryId}`);
    // Close all menus
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
    // Don't close the menu automatically
    // const timeout = setTimeout(() => {
    //   setAnchorEl(null);
    //   setHoveredCategory(null);
    //   setSubmenuAnchorEl(null);
    // }, 500);
    // setHoverTimeout(timeout);
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
            onMouseMove: handleMenuMouseEnter, // Additional event to keep menu open
            sx: { padding: 0, maxHeight: "400px", overflowY: "auto" },
          }}
          PaperProps={{
            onMouseEnter: handleMenuMouseEnter,
            onMouseLeave: handleMenuMouseLeave,
            onMouseMove: handleMenuMouseEnter, // Additional event to keep menu open
            style: {
              backgroundColor: "#1A2E4D",
              color: "white",
              minWidth: "250px",
              overflow: "visible",
              marginTop: "8px",
              maxHeight: "400px",
            },
          }}
          // Keep menu open until manually closed
          disableAutoFocus
          disableEnforceFocus
          disableRestoreFocus
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {/* Close button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <Button
              onClick={handleCompleteMouseLeave}
              sx={{
                color: "white",
                minWidth: "auto",
                p: 0.5,
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <ClearIcon fontSize="small" />
            </Button>
          </Box>
          {parentCategories.map((category) => {
            const categoryId = category._id || category.id;
            const subcategories = getSubcategories(categoryId);
            const hasSubcategories = subcategories.length > 0;

            return (
              <MenuItem
                key={categoryId}
                onClick={() => handleCategoryClick(category)}
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
                  cursor: 'pointer',
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
              {
                name: "preventOverflow",
                options: {
                  boundary: "viewport",
                },
              },
            ]}
          >
            <Paper
              onMouseEnter={handleSubmenuMouseEnter}
              onMouseLeave={handleSubmenuMouseLeave}
              onMouseMove={handleSubmenuMouseEnter} // Additional event to keep menu open
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
                    onClick={() => handleSubcategoryClick(sub)}
                    sx={{
                      color: "white",
                      padding: "12px 16px",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        cursor: "pointer",
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
        <Button
          onClick={handleHomeClick}
          sx={{
            color: "white",
            textTransform: "none",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Home
        </Button>

        <Button
          onClick={handleShopClick}
          sx={{
            color: "white",
            textTransform: "none",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Shop
        </Button>

        {/* Brand with hover dropdown */}
        <Box
          onMouseEnter={handleBrandMouseEnter}
          onMouseLeave={handleBrandMouseLeave}
          sx={{ position: "relative" }}
        >
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              padding: "8px 16px",
              borderRadius: "4px",
            }}
            endIcon={<ExpandMoreIcon />}
          >
            Brand
          </Button>

          {/* Brand Dropdown Menu */}
          <Menu
            anchorEl={brandAnchorEl}
            open={Boolean(brandAnchorEl)}
            onClose={() => setBrandAnchorEl(null)}
            MenuListProps={{
              onMouseEnter: handleBrandMenuMouseEnter,
              onMouseLeave: handleBrandMenuMouseLeave,
              sx: { padding: 0, maxHeight: "400px", overflowY: "auto" },
            }}
            PaperProps={{
              onMouseEnter: handleBrandMenuMouseEnter,
              onMouseLeave: handleBrandMenuMouseLeave,
              style: {
                backgroundColor: "#1A2E4D",
                color: "white",
                minWidth: "200px",
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
            {brands?.slice(0, 10).map((brand) => (
              <MenuItem
                key={brand._id || brand.id}
                onClick={() => {
                  navigate(`/products?brand=${brand._id || brand.id}`);
                  setBrandAnchorEl(null);
                }}
                sx={{
                  color: "white",
                  padding: "12px 16px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  minHeight: "48px",
                }}
              >
                {brand.name}
              </MenuItem>
            ))}
            {brands?.length > 10 && (
              <MenuItem
                onClick={() => {
                  navigate("/brands");
                  setBrandAnchorEl(null);
                }}
                sx={{
                  color: "white",
                  padding: "12px 16px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  minHeight: "48px",
                  fontStyle: "italic",
                }}
              >
                View All Brands...
              </MenuItem>
            )}
          </Menu>
        </Box>

        {/* Pages with dropdown */}
        <Box
          onMouseEnter={(e) => {
            if (brandHoverTimeout) {
              clearTimeout(brandHoverTimeout);
              setBrandHoverTimeout(null);
            }
            setPagesAnchorEl(e.currentTarget);
          }}
          onMouseLeave={() => {
            const timeout = setTimeout(() => {
              setPagesAnchorEl(null);
            }, 200);
            setBrandHoverTimeout(timeout);
          }}
          sx={{ position: "relative" }}
        >
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              padding: "8px 16px",
              borderRadius: "4px",
            }}
            endIcon={<ExpandMoreIcon />}
          >
            Pages
          </Button>

          {/* Pages Dropdown Menu */}
          <Menu
            anchorEl={pagesAnchorEl}
            open={Boolean(pagesAnchorEl)}
            onClose={() => setPagesAnchorEl(null)}
            MenuListProps={{
              onMouseEnter: () => {
                if (brandHoverTimeout) {
                  clearTimeout(brandHoverTimeout);
                  setBrandHoverTimeout(null);
                }
              },
              onMouseLeave: () => {
                const timeout = setTimeout(() => {
                  setPagesAnchorEl(null);
                }, 200);
                setBrandHoverTimeout(timeout);
              },
              sx: { padding: 0, minWidth: "200px" },
            }}
            PaperProps={{
              onMouseEnter: () => {
                if (brandHoverTimeout) {
                  clearTimeout(brandHoverTimeout);
                  setBrandHoverTimeout(null);
                }
              },
              onMouseLeave: () => {
                const timeout = setTimeout(() => {
                  setPagesAnchorEl(null);
                }, 200);
                setBrandHoverTimeout(timeout);
              },
              style: {
                backgroundColor: "#1A2E4D",
                color: "white",
                marginTop: "8px",
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
            <MenuItem
              onClick={() => {
                navigate("/about-us");
                setPagesAnchorEl(null);
              }}
              sx={{
                color: "white",
                padding: "12px 16px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                minHeight: "48px",
              }}
            >
              About Us
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/terms-conditions");
                setPagesAnchorEl(null);
              }}
              sx={{
                color: "white",
                padding: "12px 16px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                minHeight: "48px",
              }}
            >
              Terms & Conditions
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/privacy-policy");
                setPagesAnchorEl(null);
              }}
              sx={{
                color: "white",
                padding: "12px 16px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                minHeight: "48px",
              }}
            >
              Privacy Policy
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/return-policy");
                setPagesAnchorEl(null);
              }}
              sx={{
                color: "white",
                padding: "12px 16px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                minHeight: "48px",
              }}
            >
              Return Policy
            </MenuItem>
          </Menu>
        </Box>

        {/* Contact */}
        <Button
          onClick={handleContactClick}
          sx={{
            color: "white",
            textTransform: "none",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Contact
        </Button>
      </Box>
    </Box>
  );
};

export default SecondNav;
