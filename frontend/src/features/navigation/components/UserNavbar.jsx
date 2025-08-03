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
      setIsScrolled(scrollTop > 10);
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
  const setHoverTimeout = (key, callback, delay = 200) => {
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
    const footer = document.querySelector("#footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
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

  // Category helpers - Fixed logic from SecondNav
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

  // Hover handlers - exactly like SecondNav
  const handleCategoriesMouseEnter = (e) => {
    clearHoverTimeout('categories');
    setCategoriesAnchor(e.currentTarget);
  };

  const handleCategoriesMouseLeave = () => {
    // Don't set timeout here - let menu handle it
  };

  const handleBrandsMouseEnter = (e) => {
    clearHoverTimeout('brands');
    setBrandsAnchor(e.currentTarget);
  };

  const handleBrandsMouseLeave = () => {
    setHoverTimeout('brands', () => {
      setBrandsAnchor(null);
    }, 200);
  };

  const handlePagesMouseEnter = (e) => {
    clearHoverTimeout('pages');
    setPagesAnchor(e.currentTarget);
  };

  const handlePagesMouseLeave = () => {
    setHoverTimeout('pages', () => {
      setPagesAnchor(null);
    }, 200);
  };

  const handleMenuMouseEnter = (menuType) => {
    clearHoverTimeout(menuType);
  };

  const handleMenuMouseLeave = (menuType) => {
    if (menuType === 'categories') {
      // Don't close categories menu automatically
    } else {
      setHoverTimeout(menuType, () => {
        if (menuType === 'brands') {
          setBrandsAnchor(null);
        } else if (menuType === 'pages') {
          setPagesAnchor(null);
        }
      }, 200);
    }
  };

  const handleCompleteMouseLeave = () => {
    setCategoriesAnchor(null);
    setHoveredCategory(null);
    setSubmenuAnchor(null);
    clearHoverTimeout('categories');
  };

  const handleSubmenuEnter = (e, category) => {
    clearHoverTimeout('categories');
    setSubmenuAnchor(e.currentTarget);
    setHoveredCategory(category);
  };

  const handleSubmenuLeave = () => {
    // Don't close immediately - let main menu handle it
  };

  // User menu settings
  const userMenuSettings = [
    { name: "Profile", path: "/profile" },
    { name: "Orders", path: "/orders" },
    { name: "Logout", path: "/logout" },
  ];

  // Desktop Navigation Links Component
  const DesktopNavLinks = () => {
    const linkColor = "black";
    const hoverBg = "rgba(0, 0, 0, 0.1)";

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Home */}
        <Button
          onClick={handleHomeClick}
          sx={{
            color: linkColor,
            textTransform: "none",
            "&:hover": { backgroundColor: hoverBg },
            px: 2,
            transition: "color 0.3s ease-in-out",
          }}
        >
          Home
        </Button>

        {/* Categories */}
        <Box
          onMouseEnter={handleCategoriesMouseEnter}
          onMouseLeave={handleCategoriesMouseLeave}
          sx={{ 
            position: "relative",
            display: "inline-block"
          }}
        >
          <Button
            endIcon={<ExpandMoreIcon />}
            sx={{
              color: linkColor,
              textTransform: "none",
              "&:hover": { backgroundColor: hoverBg },
              px: 2,
              transition: "color 0.3s ease-in-out",
            }}
          >
            Categories
          </Button>
        </Box>

        {/* Pages */}
        <Box
          onMouseEnter={handlePagesMouseEnter}
          onMouseLeave={handlePagesMouseLeave}
          sx={{ 
            position: "relative",
            display: "inline-block"
          }}
        >
          <Button
            endIcon={<ExpandMoreIcon />}
            sx={{
              color: linkColor,
              textTransform: "none",
              "&:hover": { backgroundColor: hoverBg },
              px: 2,
              transition: "color 0.3s ease-in-out",
            }}
          >
            Pages
          </Button>
        </Box>

        {/* Shop */}
        <Button
          onClick={handleShopClick}
          sx={{
            color: linkColor,
            textTransform: "none",
            "&:hover": { backgroundColor: hoverBg },
            px: 2,
            transition: "color 0.3s ease-in-out",
          }}
        >
          Shop
        </Button>

        {/* Brands */}
        <Box
          onMouseEnter={handleBrandsMouseEnter}
          onMouseLeave={handleBrandsMouseLeave}
          sx={{ 
            position: "relative",
            display: "inline-block"
          }}
        >
          <Button
            endIcon={<ExpandMoreIcon />}
            sx={{
              color: linkColor,
              textTransform: "none",
              "&:hover": { backgroundColor: hoverBg },
              px: 2,
              transition: "color 0.3s ease-in-out",
            }}
          >
            Brands
          </Button>
        </Box>

        {/* Contact */}
        <Button
          onClick={handleContactClick}
          sx={{
            color: linkColor,
            textTransform: "none",
            "&:hover": { backgroundColor: hoverBg },
            px: 2,
            transition: "color 0.3s ease-in-out",
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
        <Box sx={{ px: 2, pb: 2, borderBottom: "1px solid #eee" }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={userInfo?.name} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {userInfo?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Welcome back!
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      <List>
        {/* Home */}
        <ListItem button onClick={handleHomeClick}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {/* Categories */}
        <ListItem
          button
          onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
          {mobileCategoriesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={mobileCategoriesOpen}>
          <List component="div" disablePadding>
            {parentCategories.map((category) => (
              <ListItem
                key={category._id || category.id}
                button
                sx={{ pl: 4 }}
                onClick={() => handleSubcategoryClick(category)}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/* Pages */}
        <ListItem button onClick={() => setMobilePagesOpen(!mobilePagesOpen)}>
          <ListItemIcon>
            <PagesIcon />
          </ListItemIcon>
          <ListItemText primary="Pages" />
          {mobilePagesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={mobilePagesOpen}>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => {
                navigate("/about-us");
                setMobileDrawerOpen(false);
              }}
            >
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => {
                navigate("/terms-conditions");
                setMobileDrawerOpen(false);
              }}
            >
              <ListItemText primary="Terms & Conditions" />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => {
                navigate("/privacy-policy");
                setMobileDrawerOpen(false);
              }}
            >
              <ListItemText primary="Privacy Policy" />
            </ListItem>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => {
                navigate("/return-policy");
                setMobileDrawerOpen(false);
              }}
            >
              <ListItemText primary="Return Policy" />
            </ListItem>
          </List>
        </Collapse>

        {/* Shop */}
        <ListItem button onClick={handleShopClick}>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Shop" />
        </ListItem>

        {/* Brands */}
        <ListItem button onClick={() => setMobileBrandsOpen(!mobileBrandsOpen)}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Brands" />
          {mobileBrandsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={mobileBrandsOpen}>
          <List component="div" disablePadding>
            {brands?.slice(0, 10).map((brand) => (
              <ListItem
                key={brand._id || brand.id}
                button
                sx={{ pl: 4 }}
                onClick={() => {
                  navigate(`/products?brand=${brand._id || brand.id}`);
                  setMobileDrawerOpen(false);
                }}
              >
                <ListItemText primary={brand.name} />
              </ListItem>
            ))}
            {brands?.length > 10 && (
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => {
                  navigate("/brands");
                  setMobileDrawerOpen(false);
                }}
              >
                <ListItemText primary="View All Brands..." />
              </ListItem>
            )}
          </List>
        </Collapse>

        {/* Contact */}
        <ListItem button onClick={handleContactClick}>
          <ListItemIcon>
            <ContactIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>

        <Divider sx={{ my: 2 }} />

        {/* User Menu Items in Mobile */}
        {userMenuSettings.map((setting) => (
          <ListItem
            key={setting.name}
            button
            onClick={() => {
              navigate(setting.path);
              setMobileDrawerOpen(false);
            }}
          >
            <ListItemText primary={setting.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: 1,
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: "64px" }}>
          {/* Left: MDS Brand */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "black",
              letterSpacing: 1,
            }}
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
              sx={{ color: "black" }}
            >
              <Badge badgeContent={cartItems?.length || 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Wishlist */}
            <IconButton
              onClick={() => navigate("/wishlist")}
              sx={{ color: "black" }}
            >
              <Badge badgeContent={wishlistItems?.length || 0} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            {/* User Menu (Desktop) or Mobile Menu */}
            {isMobile ? (
              <IconButton
                onClick={() => setMobileDrawerOpen(true)}
                sx={{ color: "black" }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                {/* Desktop User Menu */}
                {!isSmall && userInfo && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "black",
                      mr: 1,
                    }}
                  >
                    Hi, {userInfo.name}!
                  </Typography>
                )}
                <Tooltip title="User Menu">
                  <IconButton
                    onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                    sx={{ p: 0 }}
                  >
                    <Avatar alt={userInfo?.name} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setMobileDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <MobileDrawerContent />
      </Drawer>

      {/* Desktop Menus */}
      {/* Categories Menu */}
      <Menu
        anchorEl={categoriesAnchor}
        open={Boolean(categoriesAnchor)}
        onClose={handleCompleteMouseLeave}
        MenuListProps={{
          onMouseEnter: () => handleMenuMouseEnter('categories'),
          onMouseLeave: () => handleMenuMouseLeave('categories'),
          onMouseMove: () => handleMenuMouseEnter('categories'),
          sx: { padding: 0, maxHeight: "400px", overflowY: "auto" },
        }}
        PaperProps={{
          onMouseEnter: () => handleMenuMouseEnter('categories'),
          onMouseLeave: () => handleMenuMouseLeave('categories'),
          onMouseMove: () => handleMenuMouseEnter('categories'),
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
              onClick={() => {
                if (!hasSubcategories) {
                  handleSubcategoryClick(category);
                } else {
                  navigate(`/category/${categoryId}`);
                  handleCompleteMouseLeave();
                }
              }}
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
                <ExpandMoreIcon sx={{ fontSize: "20px", marginLeft: "8px" }} />
              )}
            </MenuItem>
          );
        })}
      </Menu>

      {/* Subcategories Submenu */}
      <Menu
        anchorEl={submenuAnchor}
        open={Boolean(submenuAnchor && hoveredCategory)}
        onClose={() => {
          setSubmenuAnchor(null);
          setHoveredCategory(null);
        }}
        MenuListProps={{
          onMouseEnter: () => handleMenuMouseEnter('categories'),
          onMouseLeave: () => handleMenuMouseLeave('categories'),
          onMouseMove: () => handleMenuMouseEnter('categories'),
          sx: { padding: 0, maxHeight: "300px", overflowY: "auto" },
        }}
        PaperProps={{
          onMouseEnter: () => handleMenuMouseEnter('categories'),
          onMouseLeave: () => handleMenuMouseLeave('categories'),
          onMouseMove: () => handleMenuMouseEnter('categories'),
          style: {
            backgroundColor: "#1A2E4D",
            color: "white",
            minWidth: "200px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            maxHeight: "300px",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        {hoveredCategory &&
          getSubcategories(hoveredCategory._id || hoveredCategory.id).map(
            (subcategory) => (
              <MenuItem
                key={subcategory._id || subcategory.id}
                onClick={() => handleSubcategoryClick(subcategory)}
                sx={{
                  color: "white",
                  "&:hover": { 
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    cursor: "pointer",
                  },
                  padding: "12px 16px",
                  minHeight: "48px",
                }}
              >
                {subcategory.name}
              </MenuItem>
            )
          )}
      </Menu>

      {/* Brands Menu */}
      <Menu
        anchorEl={brandsAnchor}
        open={Boolean(brandsAnchor)}
        onClose={() => setBrandsAnchor(null)}
        MenuListProps={{
          onMouseEnter: () => handleMenuMouseEnter('brands'),
          onMouseLeave: () => handleMenuMouseLeave('brands'),
          onMouseMove: () => handleMenuMouseEnter('brands'),
          sx: { padding: 0, maxHeight: "400px", overflowY: "auto" },
        }}
        PaperProps={{
          onMouseEnter: () => handleMenuMouseEnter('brands'),
          onMouseLeave: () => handleMenuMouseLeave('brands'),
          onMouseMove: () => handleMenuMouseEnter('brands'),
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
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        {brands?.slice(0, 10).map((brand) => (
          <MenuItem
            key={brand._id || brand.id}
            onClick={() => {
              navigate(`/products?brand=${brand._id || brand.id}`);
              setBrandsAnchor(null);
            }}
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              padding: "12px 16px",
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
              setBrandsAnchor(null);
            }}
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              padding: "12px 16px",
              minHeight: "48px",
              fontStyle: "italic",
            }}
          >
            View All Brands...
          </MenuItem>
        )}
      </Menu>

      {/* Pages Menu */}
      <Menu
        anchorEl={pagesAnchor}
        open={Boolean(pagesAnchor)}
        onClose={() => setPagesAnchor(null)}
        MenuListProps={{
          onMouseEnter: () => handleMenuMouseEnter('pages'),
          onMouseLeave: () => handleMenuMouseLeave('pages'),
          onMouseMove: () => handleMenuMouseEnter('pages'),
          sx: { padding: 0, minWidth: "200px" },
        }}
        PaperProps={{
          onMouseEnter: () => handleMenuMouseEnter('pages'),
          onMouseLeave: () => handleMenuMouseLeave('pages'),
          onMouseMove: () => handleMenuMouseEnter('pages'),
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
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
      >
        <MenuItem
          onClick={() => {
            navigate("/about-us");
            setPagesAnchor(null);
          }}
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            padding: "12px 16px",
            minHeight: "48px",
          }}
        >
          About Us
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/terms-conditions");
            setPagesAnchor(null);
          }}
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            padding: "12px 16px",
            minHeight: "48px",
          }}
        >
          Terms & Conditions
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/privacy-policy");
            setPagesAnchor(null);
          }}
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            padding: "12px 16px",
            minHeight: "48px",
          }}
        >
          Privacy Policy
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/return-policy");
            setPagesAnchor(null);
          }}
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            padding: "12px 16px",
            minHeight: "48px",
          }}
        >
          Return Policy
        </MenuItem>
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
        sx={{ mt: "45px" }}
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
          >
            {setting.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserNavbar;