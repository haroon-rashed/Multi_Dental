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
import { useNavigate } from "react-router-dom";
import { selectCategories } from "../../categories/CategoriesSlice";
import { selectBrands, fetchAllBrandsAsync } from "../../brands/BrandSlice";
import { selectUserInfo } from "../../user/UserSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { selectCartItems } from "../../cart/CartSlice";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import logo from "../../../assets/images/logo.png";

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

  // Mobile drawer states
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const [expandedMobileSubs, setExpandedMobileSubs] = useState({});

  // Scroll state for dynamic background
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleCategoryClick = (category) => {
    const categoryId = category._id || category.id;
    navigate(`/category/${categoryId}`);
    setMobileDrawerOpen(false);
  };

  const handleSubcategoryClick = (subcategory) => {
    const subcategoryId = subcategory._id || subcategory.id;
    navigate(`/subcategory/${subcategoryId}`);
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

  // User menu settings
  let userMenuSettings = [
    { name: "Profile", path: "/profile" },
    { name: "Orders", path: "/orders" },
    { name: "Logout", path: "/logout" },
  ];
  if (loggedInUser?.isAdmin) {
    userMenuSettings.unshift({ name: "Go to Dashboard", path: "/admin" });
  }

  // Color scheme for dental theme
  const dentalTheme = {
    primary: isScrolled ? "#ffffff" : "#f8fffe",
    secondary: "#00a8cc",
    accent: "#28a745",
    text: "#0088aa",
    textSecondary: "#5a6c7d",
    hover: "rgba(0, 168, 204, 0.1)",
    shadow: isScrolled
      ? "0 4px 20px rgba(0, 0, 0, 0.1)"
      : "0 2px 10px rgba(0, 0, 0, 0.05)",
    border: "#e1f4f8",
  };

  // Expose functions for HTML onclick
  useEffect(() => {
    window.handleHomeClick = handleHomeClick;
    window.handleShopClick = handleShopClick;
    window.handleContactClick = handleContactClick;
    window.navigateTo = (path) => {
      navigate(path);
    };
    window.navigateToCategory = (id) => {
      navigate(`/category/${id}`);
    };
    window.navigateToSubcategory = (id) => {
      navigate(`/subcategory/${id}`);
    };
    return () => {
      delete window.handleHomeClick;
      delete window.handleShopClick;
      delete window.handleContactClick;
      delete window.navigateTo;
      delete window.navigateToCategory;
      delete window.navigateToSubcategory;
    };
  }, [navigate]);

  // Generate HTML for desktop nav links with pure CSS hover - ONLY PARENT CATEGORIES
  // Update the desktopNavHtml variable with this new version
  const desktopNavHtml = `
  <style>
    .nav-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      position: relative;
    }
    
    .nav-item {
      position: relative;
      padding: 12px 16px;
      color: ${dentalTheme.text};
      font-size: 16px;
      font-weight: 500;
      font-family: inherit;
      text-transform: none;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      background: transparent;
      border: none;
      white-space: nowrap;
    }
    
    .nav-item:hover {
      color: ${dentalTheme.secondary};
    }

    .caret-icon {
      margin-left: 6px;
      font-size: 12px;
      transition: transform 0.2s ease;
    }

    .nav-item:hover .caret-icon {
      transform: rotate(180deg);
    }
    
    .dropdown {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: white;
      min-width: 220px;
      border: 1px solid ${dentalTheme.border};
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 1200;
      padding: 8px 0;
    }
    
    .nav-item:hover .dropdown {
      display: block;
    }
    
    .dropdown-item {
      padding: 10px 16px;
      color: ${dentalTheme.text};
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    
    .dropdown-item:hover {
      color: ${dentalTheme.secondary};
      background-color: ${dentalTheme.hover};
    }
    
    .sub-dropdown {
      display: none;
      position: absolute;
      top: 0;
      left: 100%;
      background-color: white;
      min-width: 220px;
      border: 1px solid ${dentalTheme.border};
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 1300;
      padding: 8px 0;
    }
    
    .dropdown-item:hover .sub-dropdown {
      display: block;
    }
  </style>
  
  <div class="nav-container">
    <!-- Home -->
    <button class="nav-item" onclick="window.handleHomeClick()">
      Home
    </button>
    
    <!-- Categories -->
    <div class="nav-item">
      Categories
      <span class="caret-icon">▼</span>
      <div class="dropdown">
        ${parentCategories
          .map((category) => {
            const categoryId = category._id || category.id;
            const subcategories = getSubcategories(categoryId);
            const hasSubcategories = subcategories.length > 0;
            const categoryName =
              typeof category.name === "string"
                ? category.name
                : category.name?.name || "Category";
            return `
              <div class="dropdown-item" onclick="window.navigateToCategory('${categoryId}')">
                <span>${categoryName}</span>
                ${
                  hasSubcategories
                    ? `<span>›</span>
                       <div class="sub-dropdown">
                         ${subcategories
                           .map((subcategory) => {
                             const subId = subcategory._id || subcategory.id;
                             const subName =
                               typeof subcategory.name === "string"
                                 ? subcategory.name
                                 : subcategory.name?.name || "Subcategory";
                             return `
                               <div class="dropdown-item" onclick="window.navigateToSubcategory('${subId}'); event.stopPropagation();">
                                 ${subName}
                               </div>
                             `;
                           })
                           .join("")}
                       </div>`
                    : ""
                }
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
    
    <!-- Pages -->
    <div class="nav-item">
      Pages
      <span class="caret-icon">▼</span>
      <div class="dropdown">
        <div class="dropdown-item" onclick="window.navigateTo('/about-us')">
          About Us
        </div>
        <div class="dropdown-item" onclick="window.navigateTo('/terms-conditions')">
          Terms & Conditions
        </div>
        <div class="dropdown-item" onclick="window.navigateTo('/privacy-policy')">
          Privacy Policy
        </div>
        <div class="dropdown-item" onclick="window.navigateTo('/return-policy')">
          Return Policy
        </div>
      </div>
    </div>
    
    <!-- Shop -->
    <button class="nav-item" onclick="window.handleShopClick()">
      Shop
    </button>
    
    <!-- Brands -->
    <div class="nav-item">
      Brands
      <span class="caret-icon">▼</span>
      <div class="dropdown">
        ${brands
          ?.slice(0, 10)
          .map((brand) => {
            const brandId = brand._id || brand.id;
            const brandName =
              typeof brand.name === "string"
                ? brand.name
                : brand.name?.name || "Brand";
            return `
              <div class="dropdown-item" onclick="window.navigateTo('/products?brand=${brandId}')">
                ${brandName}
              </div>
            `;
          })
          .join("")}
        ${
          brands?.length > 10
            ? `<div class="dropdown-item" onclick="window.navigateTo('/brands')" style="color: ${dentalTheme.secondary}; font-style: italic;">
                 View All Brands...
               </div>`
            : ""
        }
      </div>
    </div>
    
    <!-- Contact -->
    <button class="nav-item" onclick="window.handleContactClick()">
      Contact
    </button>
  </div>
`;

  // Mobile Drawer Content
  const MobileDrawerContent = () => (
    <Box sx={{ width: 280, pt: 2 }}>
      {/* User Info in Mobile */}
      {userInfo ? (
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
      ) : (
        <Box
          sx={{ px: 2, pb: 2, borderBottom: `1px solid ${dentalTheme.border}` }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              navigate("/login");
              setMobileDrawerOpen(false);
            }}
            sx={{
              bgcolor: dentalTheme.secondary,
              color: "white",
              textTransform: "none",
              fontWeight: 600,
              py: 1.5,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: dentalTheme.secondary,
                opacity: 0.9,
              },
            }}
          >
            Login
          </Button>
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

        {/* Categories - ONLY PARENT CATEGORIES IN MOBILE TOO */}
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
        <Collapse in={mobileCategoriesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {parentCategories.map((category) => {
              const catId = category._id || category.id;
              const subcategories = getSubcategories(catId);
              const hasSubcategories = subcategories.length > 0;
              const isOpen = !!expandedMobileSubs[catId];
              const categoryName =
                typeof category.name === "string"
                  ? category.name
                  : category.name?.name || "Category";
              return (
                <React.Fragment key={catId}>
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
                      if (hasSubcategories) {
                        setExpandedMobileSubs((prev) => ({
                          ...prev,
                          [catId]: !prev[catId],
                        }));
                      } else {
                        handleCategoryClick(category);
                      }
                    }}
                  >
                    <ListItemText
                      primary={categoryName}
                      sx={{
                        "& .MuiListItemText-primary": {
                          color: dentalTheme.textSecondary,
                          fontSize: "14px",
                        },
                      }}
                    />
                    {hasSubcategories &&
                      (isOpen ? (
                        <ExpandLessIcon sx={{ color: dentalTheme.secondary }} />
                      ) : (
                        <ExpandMoreIcon sx={{ color: dentalTheme.secondary }} />
                      ))}
                  </ListItem>
                  {hasSubcategories && (
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {subcategories.map((subcategory) => {
                          const subId = subcategory._id || subcategory.id;
                          const subName =
                            typeof subcategory.name === "string"
                              ? subcategory.name
                              : subcategory.name?.name || "Subcategory";
                          return (
                            <ListItem
                              key={subId}
                              button
                              sx={{
                                pl: 6,
                                borderRadius: "8px",
                                mx: 1,
                                "&:hover": {
                                  backgroundColor: dentalTheme.hover,
                                },
                              }}
                              onClick={() => {
                                handleSubcategoryClick(subcategory);
                              }}
                            >
                              <ListItemText
                                primary={subName}
                                sx={{
                                  "& .MuiListItemText-primary": {
                                    color: dentalTheme.textSecondary,
                                    fontSize: "14px",
                                  },
                                }}
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
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
        <Collapse in={mobilePagesOpen} timeout="auto" unmountOnExit>
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
        <Collapse in={mobileBrandsOpen} timeout="auto" unmountOnExit>
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

        {/* Show user menu items only if logged in */}
        {userInfo && (
          <>
            <Divider sx={{ my: 2, backgroundColor: dentalTheme.border }} />
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
          </>
        )}
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
          <Box
            component="img"
            src={logo}
            alt="Multi Dental Supply Logo"
            onClick={handleHomeClick}
            sx={{
              height: { xs: "40px", md: "50px" },
              width: "auto",
              objectFit: "contain",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.2s ease-in-out",
              },
            }}
          />

          {/* Center: Navigation Links (Desktop) */}
          {!isMobile && (
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
              dangerouslySetInnerHTML={{ __html: desktopNavHtml }}
            />
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
                {!isSmall &&
                  (userInfo ? (
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
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate("/login")}
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        px: 2,
                        mr: 2,
                        bgcolor: dentalTheme.secondary,
                        "&:hover": {
                          bgcolor: dentalTheme.secondary,
                          opacity: 0.9,
                        },
                      }}
                    >
                      Login
                    </Button>
                  ))}
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
