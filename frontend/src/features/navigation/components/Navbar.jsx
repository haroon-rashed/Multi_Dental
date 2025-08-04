import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SecondNav from "./SecondNav";
import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Chip,
  Stack,
  useMediaQuery,
  useTheme,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Collapse,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../user/UserSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { selectCartItems } from "../../cart/CartSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TuneIcon from "@mui/icons-material/Tune";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { selectCategories } from "../../categories/CategoriesSlice";
import { selectBrands } from "../../brands/BrandSlice";
import {
  selectProductIsFilterOpen,
  toggleFilters,
} from "../../products/ProductSlice";

export const Navbar = ({ isProductList = false }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = React.useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = React.useState(false);

  const userInfo = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const is900 = useMediaQuery(theme.breakpoints.down(900));

  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  // Toggle mobile drawer
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileDrawerOpen(open);
  };

  // Toggle categories in mobile drawer
  const toggleCategories = () => {
    setMobileCategoriesOpen(!mobileCategoriesOpen);
  };

  // Toggle brands in mobile drawer
  const toggleBrands = () => {
    setMobileBrandsOpen(!mobileBrandsOpen);
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    navigate(`/products/category/${category._id}`);
    setMobileDrawerOpen(false);
  };

  // Handle brand click
  const handleBrandClick = (brand) => {
    navigate(`/products/brand/${brand._id}`);
    setMobileDrawerOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  const settings = [
    { name: "Home", to: "/" },
    {
      name: "Profile",
      to: loggedInUser?.isAdmin ? "/admin/profile" : "/profile",
    },
    {
      name: loggedInUser?.isAdmin ? "Orders" : "My orders",
      to: loggedInUser?.isAdmin ? "/admin/orders" : "/orders",
    },
    { name: "Logout", to: "/logout" },
  ];

  // Mobile drawer content
  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        backgroundColor: "background.paper",
        overflowY: "auto",
      }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#1A2E4D",
          color: "white"
        }}
      >
        <Typography variant="h6" component="div">
          Menu
        </Typography>
        <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Home Link */}
      <ListItem 
        button 
        component={Link} 
        to="/" 
        onClick={toggleDrawer(false)}
        sx={{
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 'medium' }} />
      </ListItem>

      {/* Shop Link */}
      <ListItem 
        button 
        component={Link} 
        to="/products" 
        onClick={toggleDrawer(false)}
        sx={{
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <ListItemText primary="Shop" primaryTypographyProps={{ fontWeight: 'medium' }} />
      </ListItem>

      {/* Categories Section */}
      <Box>
        <ListItem 
          button 
          onClick={toggleCategories}
          sx={{
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            borderBottom: '1px solid #f0f0f0'
          }}
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" primaryTypographyProps={{ fontWeight: 'medium' }} />
          {mobileCategoriesOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={mobileCategoriesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categories.map((category) => (
              <ListItem
                button
                key={category._id}
                sx={{ 
                  pl: 4,
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  borderBottom: '1px solid #f0f0f0'
                }}
                onClick={() => {
                  handleCategoryClick(category);
                  toggleDrawer(false)();
                }}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>

      {/* Brands Section */}
      <Box>
        <ListItem 
          button 
          onClick={toggleBrands}
          sx={{
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            borderBottom: '1px solid #f0f0f0'
          }}
        >
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Brands" primaryTypographyProps={{ fontWeight: 'medium' }} />
          {mobileBrandsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={mobileBrandsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {brands.map((brand) => (
              <ListItem
                button
                key={brand._id}
                sx={{ 
                  pl: 4,
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  borderBottom: '1px solid #f0f0f0'
                }}
                onClick={() => {
                  handleBrandClick(brand);
                  toggleDrawer(false)();
                }}
              >
                <ListItemText primary={brand.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>

      {/* Pages Section */}
      <Box>
        <ListItem 
          button 
          component={Link}
          to="/about"
          onClick={toggleDrawer(false)}
          sx={{
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            borderBottom: '1px solid #f0f0f0'
          }}
        >
          <ListItemText primary="About Us" primaryTypographyProps={{ fontWeight: 'medium' }} />
        </ListItem>
        <ListItem 
          button 
          component={Link}
          to="/contact"
          onClick={toggleDrawer(false)}
          sx={{
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            borderBottom: '1px solid #f0f0f0'
          }}
        >
          <ListItemText primary="Contact Us" primaryTypographyProps={{ fontWeight: 'medium' }} />
        </ListItem>
        <ListItem 
          button 
          component={Link}
          to="/terms-conditions"
          onClick={toggleDrawer(false)}
          sx={{
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            borderBottom: '1px solid #f0f0f0'
          }}
        >
          <ListItemText primary="Terms & Conditions" primaryTypographyProps={{ fontWeight: 'medium' }} />
        </ListItem>
        <ListItem 
          button 
          component={Link}
          to="/privacy-policy"
          onClick={toggleDrawer(false)}
          sx={{
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            borderBottom: '1px solid #f0f0f0'
          }}
        >
          <ListItemText primary="Privacy Policy" primaryTypographyProps={{ fontWeight: 'medium' }} />
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        color: "text.primary",
        overflowX: "hidden", // Prevent horizontal scroll
      }}
    >
      <Toolbar
        sx={{
          p: 1,
          height: "4rem",
          display: "flex",
          justifyContent: { xs: "space-between", md: "space-around" },
          maxWidth: "100%",
          mx: "auto",
          px: { xs: 2, md: 0 },
        }}
      >
        {/* Left side with menu button and logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Menu Button - Only visible on mobile */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ 
              mr: 1, 
              display: { xs: 'flex', md: 'none' },
              color: 'black'
            }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Logo - Shows full text when there's enough space */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
              display: { xs: is900 ? 'none' : 'flex', md: 'flex' },
              alignItems: 'center',
              mr: { md: 2 },
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            MULTI DENTAL SUPPLY
          </Typography>
          
          {/* Mobile Logo - Only shows MDS when menu button is visible */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
              display: { xs: is900 ? 'flex' : 'none', md: 'none' },
              alignItems: 'center',
              mr: 2,
              fontSize: '1rem',
            }}
          >
            MDS
          </Typography>
        </Box>
        
        {/* Spacer to push content to the right */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />

        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          columnGap={2}
        >
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
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  color={"text.primary"}
                  sx={{ textDecoration: "none" }}
                  to={setting.to}
                  textAlign="center"
                >
                  {setting.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          <Typography variant="h6" fontWeight={300}>
            {is480
              ? `${userInfo?.name.toString().split(" ")[0]}`
              : `Hey👋, ${userInfo?.name}`}
          </Typography>
          {loggedInUser.isAdmin && <Button variant="contained">Admin</Button>}
          <Stack
            sx={{
              flexDirection: "row",
              columnGap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cartItems?.length > 0 && (
              <Badge badgeContent={cartItems.length} color="error">
                <IconButton onClick={() => navigate("/cart")}>
                  <ShoppingCartOutlinedIcon />
                </IconButton>
              </Badge>
            )}

            {!loggedInUser?.isAdmin && (
              <Stack>
                <Badge badgeContent={wishlistItems?.length} color="error">
                  <IconButton component={Link} to={"/wishlist"}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Badge>
              </Stack>
            )}
            {isProductList && (
              <IconButton onClick={handleToggleFilters}>
                <TuneIcon sx={{ color: isProductFilterOpen ? "black" : "" }} />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Toolbar>
      {!is900 && <SecondNav />}
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};
