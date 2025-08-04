import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Avatar,
  Badge,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Divider,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  Store as StoreIcon,
  Business as BusinessIcon,
  Pages as PagesIcon,
  ContactMail as ContactIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
  FavoriteBorder as FavoriteIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { selectCategories } from "../../categories/CategoriesSlice";
import { selectBrands, fetchAllBrandsAsync } from "../../brands/BrandSlice";
import { selectUserInfo } from "../../user/UserSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { selectCartItems } from "../../cart/CartSlice";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";

const UserNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isHomePage = window.location.pathname === "/";

  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const userInfo = useSelector(selectUserInfo);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for menus and drawers
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [categoriesAnchor, setCategoriesAnchor] = useState(null);
  const [brandsAnchor, setBrandsAnchor] = useState(null);
  const [pagesAnchor, setPagesAnchor] = useState(null);
  const [submenuAnchor, setSubmenuAnchor] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Mobile drawer states
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);

  // Scroll state for dynamic background
  const [isScrolled, setIsScrolled] = useState(false);

  // Hover timeouts for better dropdown control
  const [hoverTimeouts, setHoverTimeouts] = useState({});

  // Fetch brands on component mount
  useEffect(() => {
    if (brands.length === 0) {
      dispatch(fetchAllBrandsAsync());
    }
  }, [dispatch, brands.length]);

  // Scroll event listener for dynamic background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to clear hover timeouts
  const clearHoverTimeout = (key) => {
    if (hoverTimeouts[key]) {
      clearTimeout(hoverTimeouts[key]);
      setHoverTimeouts((prev) => ({ ...prev, [key]: null }));
    }
  };

  // Helper function to set hover timeout
  const setHoverTimeout = (key, callback, delay = 300) => {
    clearHoverTimeout(key);
    const timeout = setTimeout(callback, delay);
    setHoverTimeouts((prev) => ({ ...prev, [key]: timeout }));
  };

  // Navigation handlers
  const handleHomeClick = () => {
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    setMobileDrawerOpen(false);
  };

  const handleShopClick = () => {
    navigate("/products");
    setMobileDrawerOpen(false);
  };

  const handleContactClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const footer = document.querySelector("#footer");
        if (footer) {
          footer.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const footer = document.querySelector("#footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileDrawerOpen(false);
  };

  const handleSubcategoryClick = (subcategory) => {
    const subcategoryId = subcategory._id || subcategory.id;
    navigate(`/subcategory/${subcategoryId}`);
    setCategoriesAnchor(null);
    setSubmenuAnchor(null);
    setHoveredCategory(null);
    setMobileDrawerOpen(false);
  };

  // Category helpers
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

  const parentCategories = categories.filter((cat) => {
    let parentId = cat.parent_id;
    if (parentId && typeof parentId === "object" && parentId._id) {
      parentId = parentId._id;
    }
    return !parentId || parentId === null || parentId === undefined;
  });

  // Enhanced hover handlers for better UX
  const handleMenuMouseEnter = (menuType, event) => {
    clearHoverTimeout(menuType);

    switch (menuType) {
      case "categories":
        setCategoriesAnchor(event.currentTarget);
        break;
      case "brands":
        setBrandsAnchor(event.currentTarget);
        break;
      case "pages":
        setPagesAnchor(event.currentTarget);
        break;
    }
  };

  const handleMenuMouseLeave = (menuType) => {
    // Remove automatic closing on mouse leave
    // setHoverTimeout(menuType, () => {
    //   switch(menuType) {
    //     case 'categories':
    //       setCategoriesAnchor(null);
    //       setSubmenuAnchor(null);
    //       setHoveredCategory(null);
    //       break;
    //     case 'brands':
    //       setBrandsAnchor(null);
    //       break;
    //     case 'pages':
    //       setPagesAnchor(null);
    //       break;
    //   }
    // }, 300);
  };

  const handleDropdownMouseEnter = (menuType) => {
    clearHoverTimeout(menuType);
  };

  const handleDropdownMouseLeave = (menuType) => {
    // Remove automatic closing on mouse leave
    // setHoverTimeout(menuType, () => {
    //   switch(menuType) {
    //     case 'categories':
    //       setCategoriesAnchor(null);
    //       setSubmenuAnchor(null);
    //       setHoveredCategory(null);
    //       break;
    //     case 'brands':
    //       setBrandsAnchor(null);
    //       break;
    //     case 'pages':
    //       setPagesAnchor(null);
    //       break;
    //   }
    // }, 300);
  };

  const handleSubmenuEnter = (e, category) => {
    clearHoverTimeout("categories");
    setSubmenuAnchor(e.currentTarget);
    setHoveredCategory(category);
  };

  // Handle clicks outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close all dropdowns when clicking outside
      setCategoriesAnchor(null);
      setBrandsAnchor(null);
      setPagesAnchor(null);
      setSubmenuAnchor(null);
      setHoveredCategory(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // User menu settings
  const userMenuSettings = [
    { name: "Profile", path: "/profile" },
    { name: "Orders", path: "/orders" },
    { name: "Logout", path: "/logout" },
  ];

  // Color scheme for dental theme
  const dentalTheme = {
    primary: isScrolled ? "#ffffff" : "#f8fffe", // Clean white/off-white
    secondary: "#00a8cc", // Medical blue
    accent: "#28a745", // Fresh green
    text: "#2c3e50", // Dark blue-gray
    textSecondary: "#5a6c7d", // Medium gray
    hover: "rgba(0, 168, 204, 0.1)", // Light blue hover
    shadow: isScrolled
      ? "0 4px 20px rgba(0, 0, 0, 0.1)"
      : "0 2px 10px rgba(0, 0, 0, 0.05)",
    border: "#e1f4f8", // Very light blue
  };

  // Desktop Navigation Links Component
  const DesktopNavLinks = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {/* Home */}
        <Button
          onClick={handleHomeClick}
          sx={{
            color: dentalTheme.text,
            textTransform: "none",
            fontWeight: 500,
            fontSize: "16px",
            "&:hover": {
              backgroundColor: dentalTheme.hover,
              color: dentalTheme.secondary,
            },
            px: 3,
            py: 1.5,
            borderRadius: "8px",
            transition: "all 0.3s ease-in-out",
          }}
        >
          Home
        </Button>

        {/* Categories */}
        <Box
          onMouseEnter={(e) => handleMenuMouseEnter("categories", e)}
          onMouseLeave={() => handleMenuMouseLeave("categories")}
          sx={{ position: "relative" }}
        >
          <Button
            endIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}
            sx={{
              color: dentalTheme.text,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "16px",
              "&:hover": {
                backgroundColor: dentalTheme.hover,
                color: dentalTheme.secondary,
              },
              px: 3,
              py: 1.5,
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Categories
          </Button>
        </Box>

        {/* Pages */}
        <Box
          onMouseEnter={(e) => handleMenuMouseEnter("pages", e)}
          onMouseLeave={() => handleMenuMouseLeave("pages")}
          sx={{ position: "relative" }}
        >
          <Button
            endIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}
            sx={{
              color: dentalTheme.text,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "16px",
              "&:hover": {
                backgroundColor: dentalTheme.hover,
                color: dentalTheme.secondary,
              },
              px: 3,
              py: 1.5,
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Pages
          </Button>
        </Box>

        {/* Shop */}
        <Button
          onClick={handleShopClick}
          sx={{
            color: dentalTheme.text,
            textTransform: "none",
            fontWeight: 500,
            fontSize: "16px",
            "&:hover": {
              backgroundColor: dentalTheme.hover,
              color: dentalTheme.secondary,
            },
            px: 3,
            py: 1.5,
            borderRadius: "8px",
            transition: "all 0.3s ease-in-out",
          }}
        >
          Shop
        </Button>

        {/* Brands */}
        <Box
          onMouseEnter={(e) => handleMenuMouseEnter("brands", e)}
          onMouseLeave={() => handleMenuMouseLeave("brands")}
          sx={{ position: "relative" }}
        >
          <Button
            endIcon={<ExpandMoreIcon sx={{ fontSize: "18px" }} />}
            sx={{
              color: dentalTheme.text,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "16px",
              "&:hover": {
                backgroundColor: dentalTheme.hover,
                color: dentalTheme.secondary,
              },
              px: 3,
              py: 1.5,
              borderRadius: "8px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Brands
          </Button>
        </Box>

        {/* Contact */}
        <Button
          onClick={handleContactClick}
          sx={{
            color: dentalTheme.text,
            textTransform: "none",
            fontWeight: 500,
            fontSize: "16px",
            "&:hover": {
              backgroundColor: dentalTheme.hover,
              color: dentalTheme.secondary,
            },
            px: 3,
            py: 1.5,
            borderRadius: "8px",
            transition: "all 0.3s ease-in-out",
          }}
        >
          Contact
        </Button>
      </Box>
    );
  };

  // Mobile Drawer Content
  const MobileDrawerContent = () => (
    <Box sx={{ width: 280, pt: 2 }}>
      {/* User Info in Mobile */}
      {userInfo && (
        <Box
          sx={{ px: 2, pb: 2, borderBottom: `1px solid ${dentalTheme.border}` }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={typeof userInfo?.name === "string" ? userInfo.name : "User"}
              sx={{
                bgcolor: dentalTheme.secondary,
                color: "white",
                width: 50,
                height: 50,
              }}
            />
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="600"
                color={dentalTheme.text}
              >
                {typeof userInfo?.name === "string"
                  ? userInfo.name
                  : typeof userInfo?.firstName === "string"
                  ? userInfo.firstName
                  : "User"}
              </Typography>
              <Typography variant="body2" color={dentalTheme.textSecondary}>
                Welcome back!
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      <List sx={{ px: 1 }}>
        {/* Home */}
        <ListItem
          button
          onClick={handleHomeClick}
          sx={{
            borderRadius: "8px",
            mb: 0.5,
            "&:hover": {
              backgroundColor: dentalTheme.hover,
            },
          }}
        >
          <ListItemIcon sx={{ color: dentalTheme.secondary }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            sx={{
              "& .MuiListItemText-primary": {
                color: dentalTheme.text,
                fontWeight: 500,
              },
            }}
          />
        </ListItem>

        {/* Categories */}
        <ListItem
          button
          onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
          sx={{
            borderRadius: "8px",
            mb: 0.5,
            "&:hover": {
              backgroundColor: dentalTheme.hover,
            },
          }}
        >
          <ListItemIcon sx={{ color: dentalTheme.secondary }}>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText
            primary="Categories"
            sx={{
              "& .MuiListItemText-primary": {
                color: dentalTheme.text,
                fontWeight: 500,
              },
            }}
          />
          {mobileCategoriesOpen ? (
            <ExpandLessIcon sx={{ color: dentalTheme.secondary }} />
          ) : (
            <ExpandMoreIcon sx={{ color: dentalTheme.secondary }} />
          )}
        </ListItem>
        <Collapse in={mobileCategoriesOpen}>
          <List component="div" disablePadding>
            {parentCategories.map((category) => (
              <ListItem
                key={category._id || category.id}
                button
                sx={{
                  pl: 4,
                  borderRadius: "8px",
                  mx: 1,
                  "&:hover": {
                    backgroundColor: dentalTheme.hover,
                  },
                }}
                onClick={() => handleSubcategoryClick(category)}
              >
                <ListItemText
                  primary={
                    typeof category.name === "string"
                      ? category.name
                      : category.name?.name || "Category"
                  }
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: dentalTheme.textSecondary,
                      fontSize: "14px",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Pages */}
        <ListItem
          button
          onClick={() => setMobilePagesOpen(!mobilePagesOpen)}
          sx={{
            borderRadius: "8px",
            mb: 0.5,
            "&:hover": {
              backgroundColor: dentalTheme.hover,
            },
          }}
        >
          <ListItemIcon sx={{ color: dentalTheme.secondary }}>
            <PagesIcon />
          </ListItemIcon>
          <ListItemText
            primary="Pages"
            sx={{
              "& .MuiListItemText-primary": {
                color: dentalTheme.text,
                fontWeight: 500,
              },
            }}
          />
          {mobilePagesOpen ? (
            <ExpandLessIcon sx={{ color: dentalTheme.secondary }} />
          ) : (
            <ExpandMoreIcon sx={{ color: dentalTheme.secondary }} />
          )}
        </ListItem>
        <Collapse in={mobilePagesOpen}>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{
                pl: 4,
                borderRadius: "8px",
                mx: 1,
                "&:hover": {
                  backgroundColor: dentalTheme.hover,
                },
              }}
              onClick={() => {
                navigate("/about-us");
                setMobileDrawerOpen(false);
              }}
            >
              <ListItemText
                primary="About Us"
                sx={{
                  "& .MuiListItemText-primary": {
                    color: dentalTheme.textSecondary,
                    fontSize: "14px",
                  },
                }}
              />
            </ListItem>
            <ListItem
              button
              sx={{
                pl: 4,
                borderRadius: "8px",
                mx: 1,
                "&:hover": {
                  backgroundColor: dentalTheme.hover,
                },
              }}
              onClick={() => {
                navigate("/terms-conditions");
                setMobileDrawerOpen(false);
              }}
            >
              <ListItemText
                primary="Terms & Conditions"
                sx={{
                  "& .MuiListItemText-primary": {
                    color: dentalTheme.textSecondary,
                    fontSize: "14px",
                  },
                }}
              />
            </ListItem>
            <ListItem
              button
              sx={{
                pl: 4,
                borderRadius: "8px",
                mx: 1,
                "&:hover": {
                  backgroundColor: dentalTheme.hover,
                },
              }}
              onClick={() => {
                navigate("/privacy-policy");
                setMobileDrawerOpen(false);
              }}
            >
              <ListItemText
                primary="Privacy Policy"
                sx={{
                  "& .MuiListItemText-primary": {
                    color: dentalTheme.textSecondary,
                    fontSize: "14px",
                  },
                }}
              />
            </ListItem>
            <ListItem
              button
              sx={{
                pl: 4,
                borderRadius: "8px",
                mx: 1,
                "&:hover": {
                  backgroundColor: dentalTheme.hover,
                },
              }}
              onClick={() => {
                navigate("/return-policy");
                setMobileDrawerOpen(false);
              }}
            >
              <ListItemText
                primary="Return Policy"
                sx={{
                  "& .MuiListItemText-primary": {
                    color: dentalTheme.textSecondary,
                    fontSize: "14px",
                  },
                }}
              />
            </ListItem>
          </List>
        </Collapse>

        {/* Shop */}
        <ListItem
          button
          onClick={handleShopClick}
          sx={{
            borderRadius: "8px",
            mb: 0.5,
            "&:hover": {
              backgroundColor: dentalTheme.hover,
            },
          }}
        >
          <ListItemIcon sx={{ color: dentalTheme.secondary }}>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText
            primary="Shop"
            sx={{
              "& .MuiListItemText-primary": {
                color: dentalTheme.text,
                fontWeight: 500,
              },
            }}
          />
        </ListItem>

        {/* Brands */}
        <ListItem
          button
          onClick={() => setMobileBrandsOpen(!mobileBrandsOpen)}
          sx={{
            borderRadius: "8px",
            mb: 0.5,
            "&:hover": {
              backgroundColor: dentalTheme.hover,
            },
          }}
        >
          <ListItemIcon sx={{ color: dentalTheme.secondary }}>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText
            primary="Brands"
            sx={{
              "& .MuiListItemText-primary": {
                color: dentalTheme.text,
                fontWeight: 500,
              },
            }}
          />
          {mobileBrandsOpen ? (
            <ExpandLessIcon sx={{ color: dentalTheme.secondary }} />
          ) : (
            <ExpandMoreIcon sx={{ color: dentalTheme.secondary }} />
          )}
        </ListItem>
        <Collapse in={mobileBrandsOpen}>
          <List component="div" disablePadding>
            {brands?.slice(0, 10).map((brand) => (
              <ListItem
                key={brand._id || brand.id}
                button
                sx={{
                  pl: 4,
                  borderRadius: "8px",
                  mx: 1,
                  "&:hover": {
                    backgroundColor: dentalTheme.hover,
                  },
                }}
                onClick={() => {
                  navigate(`/products?brand=${brand._id || brand.id}`);
                  setMobileDrawerOpen(false);
                }}
              >
                <ListItemText
                  primary={
                    typeof brand.name === "string"
                      ? brand.name
                      : brand.name?.name || "Brand"
                  }
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: dentalTheme.textSecondary,
                      fontSize: "14px",
                    },
                  }}
                />
              </ListItem>
            ))}
            {brands?.length > 10 && (
              <ListItem
                button
                sx={{
                  pl: 4,
                  borderRadius: "8px",
                  mx: 1,
                  "&:hover": {
                    backgroundColor: dentalTheme.hover,
                  },
                }}
                onClick={() => {
                  navigate("/brands");
                  setMobileDrawerOpen(false);
                }}
              >
                <ListItemText
                  primary="View All Brands..."
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: dentalTheme.secondary,
                      fontSize: "14px",
                      fontStyle: "italic",
                    },
                  }}
                />
              </ListItem>
            )}
          </List>
        </Collapse>

        {/* Contact */}
        <ListItem
          button
          onClick={handleContactClick}
          sx={{
            borderRadius: "8px",
            mb: 0.5,
            "&:hover": {
              backgroundColor: dentalTheme.hover,
            },
          }}
        >
          <ListItemIcon sx={{ color: dentalTheme.secondary }}>
            <ContactIcon />
          </ListItemIcon>
          <ListItemText
            primary="Contact"
            sx={{
              "& .MuiListItemText-primary": {
                color: dentalTheme.text,
                fontWeight: 500,
              },
            }}
          />
        </ListItem>

        <Divider sx={{ my: 2, backgroundColor: dentalTheme.border }} />

        {/* User Menu Items in Mobile */}
        {userMenuSettings.map((setting) => (
          <ListItem
            key={setting.name}
            button
            sx={{
              borderRadius: "8px",
              mb: 0.5,
              "&:hover": {
                backgroundColor: dentalTheme.hover,
              },
            }}
            onClick={() => {
              navigate(setting.path);
              setMobileDrawerOpen(false);
            }}
          >
            <ListItemText
              primary={setting.name}
              sx={{
                "& .MuiListItemText-primary": {
                  color: dentalTheme.text,
                  fontWeight: 500,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: dentalTheme.primary,
          boxShadow: dentalTheme.shadow,
          zIndex: 1100,
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          borderBottom: `1px solid ${dentalTheme.border}`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: "70px",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Left: MDS Brand */}
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: "700",
              color: dentalTheme.secondary,
              letterSpacing: 2,
              fontSize: { xs: "24px", md: "28px" },
              textShadow: "0 2px 4px rgba(0, 168, 204, 0.1)",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.2s ease-in-out",
              },
            }}
            onClick={handleHomeClick}
          >
            MDS
          </Typography>

          {/* Center: Navigation Links (Desktop) */}
          {!isMobile && (
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <DesktopNavLinks />
            </Box>
          )}

          {/* Right: User Actions */}
          <Stack direction="row" alignItems="center" spacing={isSmall ? 1 : 2}>
            {/* Cart */}
            <IconButton
              onClick={() => navigate("/cart")}
              sx={{
                color: dentalTheme.text,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: dentalTheme.hover,
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease-in-out",
                p: 1.5,
              }}
            >
              <Badge
                badgeContent={cartItems?.length || 0}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: dentalTheme.accent,
                    color: "white",
                    fontWeight: 600,
                  },
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: "24px" }} />
              </Badge>
            </IconButton>

            {/* Wishlist */}
            <IconButton
              onClick={() => navigate("/wishlist")}
              sx={{
                color: dentalTheme.text,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: dentalTheme.hover,
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease-in-out",
                p: 1.5,
              }}
            >
              <Badge
                badgeContent={wishlistItems?.length || 0}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: dentalTheme.accent,
                    color: "white",
                    fontWeight: 600,
                  },
                }}
              >
                <FavoriteIcon sx={{ fontSize: "24px" }} />
              </Badge>
            </IconButton>

            {/* User Menu (Desktop) or Mobile Menu */}
            {isMobile ? (
              <IconButton
                onClick={() => setMobileDrawerOpen(true)}
                sx={{
                  color: dentalTheme.text,
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: dentalTheme.hover,
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease-in-out",
                  p: 1.5,
                }}
              >
                <MenuIcon sx={{ fontSize: "24px" }} />
              </IconButton>
            ) : (
              <>
                {/* Desktop User Menu */}
                {!isSmall && userInfo && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: dentalTheme.text,
                      mr: 2,
                      fontWeight: 500,
                    }}
                  >
                    Hi,{" "}
                    {typeof userInfo?.name === "string"
                      ? userInfo.name
                      : typeof userInfo?.firstName === "string"
                      ? userInfo.firstName
                      : "User"}
                    !
                  </Typography>
                )}
                <Tooltip title="User Menu" arrow>
                  <IconButton
                    onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                    sx={{
                      p: 0.5,
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <Avatar
                      alt={
                        typeof userInfo?.name === "string"
                          ? userInfo.name
                          : typeof userInfo?.firstName === "string"
                          ? userInfo.firstName
                          : "User"
                      }
                      sx={{
                        bgcolor: dentalTheme.secondary,
                        color: "white",
                        width: 40,
                        height: 40,
                        fontWeight: 600,
                        fontSize: "16px",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Spacer to push content below fixed navbar */}
      <Box sx={{ height: "70px" }} />

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 320,
            boxSizing: "border-box",
            backgroundColor: dentalTheme.primary,
            color: dentalTheme.text,
            borderRight: `1px solid ${dentalTheme.border}`,
            "& a": {
              textDecoration: "none",
              color: "inherit",
            },
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: `1px solid ${dentalTheme.border}`,
            backgroundColor: dentalTheme.secondary,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "white", fontWeight: 600 }}
          >
            Menu
          </Typography>
          <IconButton
            onClick={() => setMobileDrawerOpen(false)}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ overflowY: "auto", height: "100%" }}>
          <MobileDrawerContent />
        </Box>
      </Drawer>

      {/* Desktop Menus */}
      {/* Categories Menu */}
      <Menu
        anchorEl={categoriesAnchor}
        open={Boolean(categoriesAnchor)}
        onClose={(event) => {
          event.stopPropagation();
          setCategoriesAnchor(null);
          setSubmenuAnchor(null);
          setHoveredCategory(null);
        }}
        MenuListProps={{
          onMouseEnter: () => handleDropdownMouseEnter("categories"),
          onMouseLeave: () => handleDropdownMouseLeave("categories"),
          sx: { padding: 1, maxHeight: "400px", overflowY: "auto" },
          onClick: (event) => event.stopPropagation(),
        }}
        PaperProps={{
          onMouseEnter: () => handleDropdownMouseEnter("categories"),
          onMouseLeave: () => handleDropdownMouseLeave("categories"),
          onClick: (event) => event.stopPropagation(),
          style: {
            backgroundColor: "white",
            color: dentalTheme.text,
            minWidth: "280px",
            overflow: "visible",
            maxHeight: "400px",
            border: `1px solid ${dentalTheme.border}`,
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            position: "fixed",
            top: "65px",
            left: "265px",
            transform: "none",
          },
        }}
        anchorReference="none"
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        {parentCategories.map((category) => {
          const categoryId = category._id || category.id;
          const subcategories = getSubcategories(categoryId);
          const hasSubcategories = subcategories.length > 0;

          return (
            <MenuItem
              key={categoryId}
              onMouseEnter={(e) => {
                if (hasSubcategories) {
                  handleSubmenuEnter(e, category);
                }
              }}
              onClick={(event) => {
                event.stopPropagation();
                if (!hasSubcategories) {
                  handleSubcategoryClick(category);
                } else {
                  navigate(`/category/${categoryId}`);
                  setCategoriesAnchor(null);
                  setSubmenuAnchor(null);
                  setHoveredCategory(null);
                }
              }}
              sx={{
                color: dentalTheme.text,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 20px",
                borderRadius: "8px",
                margin: "2px 4px",
                "&:hover": {
                  backgroundColor: dentalTheme.hover,
                  color: dentalTheme.secondary,
                },
                minHeight: "48px",
                fontWeight: 500,
                transition: "all 0.2s ease-in-out",
              }}
            >
              <span>
                {typeof category.name === "string"
                  ? category.name
                  : category.name?.name || "Category"}
              </span>
              {hasSubcategories && (
                <ExpandMoreIcon
                  sx={{
                    fontSize: "20px",
                    marginLeft: "8px",
                    color: dentalTheme.secondary,
                  }}
                />
              )}
            </MenuItem>
          );
        })}
      </Menu>

      {/* Subcategories Submenu */}
      <Menu
        anchorEl={submenuAnchor}
        open={Boolean(submenuAnchor && hoveredCategory)}
        onClose={(event) => {
          event.stopPropagation();
          setSubmenuAnchor(null);
          setHoveredCategory(null);
        }}
        MenuListProps={{
          onMouseEnter: () => handleDropdownMouseEnter("categories"),
          onMouseLeave: () => handleDropdownMouseLeave("categories"),
          sx: { padding: 1, maxHeight: "300px", overflowY: "auto" },
          onClick: (event) => event.stopPropagation(),
        }}
        PaperProps={{
          onMouseEnter: () => handleDropdownMouseEnter("categories"),
          onMouseLeave: () => handleDropdownMouseLeave("categories"),
          onClick: (event) => event.stopPropagation(),
          style: {
            backgroundColor: "white",
            color: dentalTheme.text,
            minWidth: "220px",
            border: `1px solid ${dentalTheme.border}`,
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            maxHeight: "300px",
            position: "fixed",
            top: "65px",
            left: "545px", // 265 + 280 = 545px (categories width + offset)
            transform: "none",
          },
        }}
        anchorReference="none"
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        {hoveredCategory &&
          getSubcategories(hoveredCategory._id || hoveredCategory.id).map(
            (subcategory) => (
              <MenuItem
                key={subcategory._id || subcategory.id}
                onClick={(event) => {
                  event.stopPropagation();
                  handleSubcategoryClick(subcategory);
                }}
                sx={{
                  color: dentalTheme.text,
                  "&:hover": {
                    backgroundColor: dentalTheme.hover,
                    color: dentalTheme.secondary,
                    cursor: "pointer",
                  },
                  padding: "12px 20px",
                  borderRadius: "8px",
                  margin: "2px 4px",
                  minHeight: "48px",
                  fontWeight: 500,
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {typeof subcategory.name === "string"
                  ? subcategory.name
                  : subcategory.name?.name || "Subcategory"}
              </MenuItem>
            )
          )}
      </Menu>

      {/* Pages Menu */}
      <Menu
        anchorEl={pagesAnchor}
        open={Boolean(pagesAnchor)}
        onClose={(event) => {
          event.stopPropagation();
          setPagesAnchor(null);
        }}
        MenuListProps={{
          onMouseEnter: () => handleDropdownMouseEnter("pages"),
          onMouseLeave: () => handleDropdownMouseLeave("pages"),
          sx: { padding: 1, minWidth: "220px" },
          onClick: (event) => event.stopPropagation(),
        }}
        PaperProps={{
          onMouseEnter: () => handleDropdownMouseEnter("pages"),
          onMouseLeave: () => handleDropdownMouseLeave("pages"),
          onClick: (event) => event.stopPropagation(),
          style: {
            backgroundColor: "white",
            color: dentalTheme.text,
            border: `1px solid ${dentalTheme.border}`,
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            position: "fixed",
            top: "65px",
            left: "370px", // 265 + 105 = 370px (adjusted for pages position)
            transform: "none",
          },
        }}
        anchorReference="none"
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            navigate("/about-us");
            setPagesAnchor(null);
          }}
          sx={{
            color: dentalTheme.text,
            "&:hover": {
              backgroundColor: dentalTheme.hover,
              color: dentalTheme.secondary,
            },
            padding: "12px 20px",
            borderRadius: "8px",
            margin: "2px 4px",
            minHeight: "48px",
            fontWeight: 500,
            transition: "all 0.2s ease-in-out",
          }}
        >
          About Us
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            navigate("/terms-conditions");
            setPagesAnchor(null);
          }}
          sx={{
            color: dentalTheme.text,
            "&:hover": {
              backgroundColor: dentalTheme.hover,
              color: dentalTheme.secondary,
            },
            padding: "12px 20px",
            borderRadius: "8px",
            margin: "2px 4px",
            minHeight: "48px",
            fontWeight: 500,
            transition: "all 0.2s ease-in-out",
          }}
        >
          Terms & Conditions
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            navigate("/privacy-policy");
            setPagesAnchor(null);
          }}
          sx={{
            color: dentalTheme.text,
            "&:hover": {
              backgroundColor: dentalTheme.hover,
              color: dentalTheme.secondary,
            },
            padding: "12px 20px",
            borderRadius: "8px",
            margin: "2px 4px",
            minHeight: "48px",
            fontWeight: 500,
            transition: "all 0.2s ease-in-out",
          }}
        >
          Privacy Policy
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            navigate("/return-policy");
            setPagesAnchor(null);
          }}
          sx={{
            color: dentalTheme.text,
            "&:hover": {
              backgroundColor: dentalTheme.hover,
              color: dentalTheme.secondary,
            },
            padding: "12px 20px",
            borderRadius: "8px",
            margin: "2px 4px",
            minHeight: "48px",
            fontWeight: 500,
            transition: "all 0.2s ease-in-out",
          }}
        >
          Return Policy
        </MenuItem>
      </Menu>

      {/* Brands Menu */}
      <Menu
        anchorEl={brandsAnchor}
        open={Boolean(brandsAnchor)}
        onClose={(event) => {
          event.stopPropagation();
          setBrandsAnchor(null);
        }}
        MenuListProps={{
          onMouseEnter: () => handleDropdownMouseEnter("brands"),
          onMouseLeave: () => handleDropdownMouseLeave("brands"),
          sx: { padding: 1, maxHeight: "400px", overflowY: "auto" },
          onClick: (event) => event.stopPropagation(),
        }}
        PaperProps={{
          onMouseEnter: () => handleDropdownMouseEnter("brands"),
          onMouseLeave: () => handleDropdownMouseLeave("brands"),
          onClick: (event) => event.stopPropagation(),
          style: {
            backgroundColor: "white",
            color: dentalTheme.text,
            minWidth: "220px",
            maxHeight: "400px",
            border: `1px solid ${dentalTheme.border}`,
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            position: "fixed",
            top: "65px",
            left: "530px", // 265 + 265 = 530px (adjusted for brands position)
            transform: "none",
          },
        }}
        anchorReference="none"
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        {brands?.slice(0, 10).map((brand) => (
          <MenuItem
            key={brand._id || brand.id}
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/products?brand=${brand._id || brand.id}`);
              setBrandsAnchor(null);
            }}
            sx={{
              color: dentalTheme.text,
              "&:hover": {
                backgroundColor: dentalTheme.hover,
                color: dentalTheme.secondary,
              },
              padding: "12px 20px",
              borderRadius: "8px",
              margin: "2px 4px",
              minHeight: "48px",
              fontWeight: 500,
              transition: "all 0.2s ease-in-out",
            }}
          >
            {typeof brand.name === "string"
              ? brand.name
              : brand.name?.name || "Brand"}
          </MenuItem>
        ))}
        {brands?.length > 10 && (
          <MenuItem
            onClick={(event) => {
              event.stopPropagation();
              navigate("/brands");
              setBrandsAnchor(null);
            }}
            sx={{
              color: dentalTheme.secondary,
              "&:hover": {
                backgroundColor: dentalTheme.hover,
                color: dentalTheme.secondary,
              },
              padding: "12px 20px",
              borderRadius: "8px",
              margin: "2px 4px",
              minHeight: "48px",
              fontStyle: "italic",
              fontWeight: 500,
              transition: "all 0.2s ease-in-out",
            }}
          >
            View All Brands...
          </MenuItem>
        )}
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
        sx={{ mt: "45px" }}
        PaperProps={{
          style: {
            backgroundColor: "white",
            color: dentalTheme.text,
            border: `1px solid ${dentalTheme.border}`,
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            minWidth: "180px",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {loggedInUser?.isAdmin && (
          <MenuItem
            onClick={() => {
              navigate("/admin/add-product");
              setUserMenuAnchor(null);
            }}
            sx={{
              color: dentalTheme.text,
              "&:hover": {
                backgroundColor: dentalTheme.hover,
                color: dentalTheme.secondary,
              },
              padding: "12px 20px",
              borderRadius: "8px",
              margin: "2px 4px",
              fontWeight: 500,
              transition: "all 0.2s ease-in-out",
            }}
          >
            Add new Product
          </MenuItem>
        )}
        {userMenuSettings.map((setting) => (
          <MenuItem
            key={setting.name}
            onClick={() => {
              navigate(setting.path);
              setUserMenuAnchor(null);
            }}
            sx={{
              color: dentalTheme.text,
              "&:hover": {
                backgroundColor: dentalTheme.hover,
                color: dentalTheme.secondary,
              },
              padding: "12px 20px",
              borderRadius: "8px",
              margin: "2px 4px",
              fontWeight: 500,
              transition: "all 0.2s ease-in-out",
            }}
          >
            {setting.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserNavbar;
