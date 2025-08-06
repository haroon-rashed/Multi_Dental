import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  Chip,
  Divider,
  Container,
} from "@mui/material";
import { ProductListSkeleton } from "../../../components/skeletons/SkeletonLoaders";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchProductsAsync,
  resetProductFetchStatus,
  selectProductFetchStatus,
  selectProductIsFilterOpen,
  selectProductTotalResults,
  selectProducts,
  toggleFilters,
} from "../ProductSlice";
import { ProductCard } from "./ProductCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import { selectBrands } from "../../brands/BrandSlice";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { selectCategories } from "../../categories/CategoriesSlice";
import Pagination from "@mui/material/Pagination";
import { ITEMS_PER_PAGE } from "../../../constants";
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
  selectWishlistItemAddStatus,
  selectWishlistItemDeleteStatus,
  selectWishlistItems,
} from "../../wishlist/WishlistSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { toast } from "react-toastify";
import {
  banner1,
  banner2,
  banner3,
  banner4,
  loadingAnimation,
} from "../../../assets";
import {
  addToCartAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus,
} from "../../cart/CartSlice";
import { motion } from "framer-motion";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import Lottie from "lottie-react";
import CategoryProductsSlider from "./Categories";
import { BrandSection } from "./BrandSection";
import PopularCategoryProductsSlider from "./PopularCategories";
import FeaturedCategoryProductsSlider from "./FeaturedCategories";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc" },
  { name: "Price: Low to High", sort: "price", order: "asc" },
  { name: "Price: High to Low", sort: "price", order: "desc" },
];

const dentalCategories = [
  { name: "Dental Tools", icon: "🦷" },
  { name: "Oral Care", icon: "🪥" },
  { name: "Equipment", icon: "⚕️" },
  { name: "Supplies", icon: "🏥" },
  { name: "Instruments", icon: "🔧" },
];

const bannerImages = [banner1, banner3, banner2, banner4];

export const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const theme = useTheme();
  const location = useLocation();

  const is1200 = useMediaQuery(theme.breakpoints.down(1200));
  const is800 = useMediaQuery(theme.breakpoints.down(800));
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is600 = useMediaQuery(theme.breakpoints.down(600));
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const is488 = useMediaQuery(theme.breakpoints.down(488));

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);
  const loggedInUser = useSelector(selectLoggedInUser);

  const productFetchStatus = useSelector(selectProductFetchStatus);

  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);

  const cartItemAddStatus = useSelector(selectCartItemAddStatus);

  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const dispatch = useDispatch();

  const handleBrandFilters = (e) => {
    const filterSet = new Set(filters.brand);

    if (e.target.checked) {
      filterSet.add(e.target.value);
    } else {
      filterSet.delete(e.target.value);
    }

    const filterArray = Array.from(filterSet);
    setFilters({ ...filters, brand: filterArray });
  };

  const handleCategoryFilters = (e) => {
    const filterSet = new Set(filters.category);

    if (e.target.checked) {
      filterSet.add(e.target.value);
    } else {
      filterSet.delete(e.target.value);
    }

    const filterArray = Array.from(filterSet);
    setFilters({ ...filters, category: filterArray });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  // Handle URL parameters for filtering
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = {};

    // Handle subcategory filter
    const subcategory = searchParams.get("subcategory");
    if (subcategory) {
      newFilters.category = [subcategory];
    }

    // Handle brand filter
    const brand = searchParams.get("brand");
    if (brand) {
      newFilters.brand = [brand];
    }

    // Only update filters if there are URL parameters
    if (subcategory || brand) {
      setFilters(newFilters);
    }
  }, [location.search]);

  useEffect(() => {
    setPage(1);
  }, [totalResults]);

  useEffect(() => {
    const finalFilters = { ...filters };

    finalFilters["pagination"] = { page: page, limit: ITEMS_PER_PAGE };
    finalFilters["sort"] = sort;

    if (!loggedInUser?.isAdmin) {
      finalFilters["user"] = true;
    }

    dispatch(fetchProductsAsync(finalFilters));
  }, [filters, page, sort]);

  const handleAddRemoveFromWishlist = (e, productId) => {
    if (e.target.checked) {
      const data = { user: loggedInUser?._id, product: productId };
      dispatch(createWishlistItemAsync(data));
    } else if (!e.target.checked) {
      const index = wishlistItems.findIndex(
        (item) => item.product._id === productId
      );
      dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
    }
  };

  useEffect(() => {
    if (wishlistItemAddStatus === "fulfilled") {
      toast.success("Product added to wishlist");
    } else if (wishlistItemAddStatus === "rejected") {
      toast.error("Error adding product to wishlist, please try again later");
    }
  }, [wishlistItemAddStatus]);

  useEffect(() => {
    if (wishlistItemDeleteStatus === "fulfilled") {
      toast.success("Product removed from wishlist");
    } else if (wishlistItemDeleteStatus === "rejected") {
      toast.error(
        "Error removing product from wishlist, please try again later"
      );
    }
  }, [wishlistItemDeleteStatus]);

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") {
      toast.success("Product added to cart");
    } else if (cartItemAddStatus === "rejected") {
      toast.error("Error adding product to cart, please try again later");
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (productFetchStatus === "rejected") {
      toast.error("Error fetching products, please try again later");
    }
  }, [productFetchStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetProductFetchStatus());
      dispatch(resetWishlistItemAddStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, []);

  const handleFilterClose = () => {
    dispatch(toggleFilters());
  };

  return (
    <>
      {/* Loading State */}
      {productFetchStatus === "pending" ? (
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "calc(100vh - 200px)",
              background: "linear-gradient(135deg, #F8FFFE 0%, #EFF4FF 100%)",
              borderRadius: 4,
              my: 4,
            }}
          >
            <Stack
              width={is500 ? "300px" : "400px"}
              alignItems="center"
              spacing={3}
            >
              <Lottie animationData={loadingAnimation} />
              <Typography
                variant="h6"
                sx={{
                  color: "#2A3F4E",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Loading Premium Dental Products...
              </Typography>
            </Stack>
          </Box>
        </Container>
      ) : (
        <>
          {/* Enhanced Filters Sidebar */}
          <motion.div
            style={{
              position: "fixed",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)",
              height: "100vh",
              padding: 0,
              overflowY: "auto",
              width: is500 ? "100vw" : "380px",
              zIndex: 1200,
              boxShadow: "0 20px 40px rgba(42, 63, 78, 0.15)",
              borderRight: "3px solid #e8f5e8",
            }}
            variants={{ show: { left: 0 }, hide: { left: -400 } }}
            initial={"hide"}
            transition={{ ease: "easeOut", duration: 0.4, type: "tween" }}
            animate={isProductFilterOpen === true ? "show" : "hide"}
          >
            {/* Header */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #2A3F4E 0%, #4A5568 100%)",
                color: "white",
                p: 3,
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Dental Products
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Professional Quality Equipment
                  </Typography>
                </Stack>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    onClick={handleFilterClose}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </motion.div>
              </Stack>
            </Box>

            {/* Filter Content */}
            <Box sx={{ p: 3 }}>
              {/* Quick Categories */}
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  mb: 3,
                  background:
                    "linear-gradient(135deg, #EFF4FF 0%, #D1E3FF 100%)",
                  border: "1px solid #B8D4FF",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "#2A3F4E",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  🦷 Quick Categories
                </Typography>
                <Stack spacing={1.5}>
                  {dentalCategories.map((category, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Chip
                        label={`${category.icon} ${category.name}`}
                        variant="outlined"
                        sx={{
                          width: "100%",
                          justifyContent: "flex-start",
                          py: 1.5,
                          px: 2,
                          borderColor: "#5A7FBF",
                          color: "#2A3F4E",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#10b981",
                            color: "white",
                            transform: "translateX(4px)",
                            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                          },
                        }}
                      />
                    </motion.div>
                  ))}
                </Stack>
              </Paper>

              {/* Brand Filters */}
              <Paper
                elevation={0}
                sx={{
                  mb: 3,
                  overflow: "hidden",
                  border: "1px solid #D1E3FF",
                }}
              >
                <Accordion
                  elevation={0}
                  sx={{
                    "&:before": { display: "none" },
                    background: "transparent",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <AddIcon
                        sx={{
                          color: "#2A3F4E",
                          backgroundColor: "#EFF4FF",
                          borderRadius: "50%",
                          p: 0.5,
                        }}
                      />
                    }
                    sx={{
                      background:
                        "linear-gradient(135deg, #f9fafb 0%, #f0f9f4 100%)",
                      borderBottom: "1px solid #e5e7eb",
                      "&:hover": {
                        backgroundColor: "#f0f9f4",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#2A3F4E",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      🏢 Professional Brands
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      p: 2,
                      backgroundColor: "#F8FFFE",
                    }}
                  >
                    <FormGroup onChange={handleBrandFilters}>
                      {brands?.map((brand) => (
                        <motion.div
                          key={brand._id || brand.id}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FormControlLabel
                            sx={{
                              ml: 0,
                              mb: 1,
                              py: 0.5,
                              px: 1.5,
                              borderRadius: 2,
                              transition: "all 0.2s ease",
                              "&:hover": {
                                backgroundColor: "#EFF4FF",
                              },
                              "& .MuiCheckbox-root": {
                                color: "#10b981",
                                "&.Mui-checked": {
                                  color: "#1a472a",
                                },
                              },
                            }}
                            control={<Checkbox size="small" />}
                            label={
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  fontWeight: 500,
                                  color: "#374151",
                                }}
                              >
                                {brand.name}
                              </Typography>
                            }
                            value={brand._id}
                          />
                        </motion.div>
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Paper>

              {/* Category Filters */}
              <Paper
                elevation={0}
                sx={{
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                }}
              >
                <Accordion
                  elevation={0}
                  sx={{
                    "&:before": { display: "none" },
                    background: "transparent",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <AddIcon
                        sx={{
                          color: "#1a472a",
                          backgroundColor: "#f0f9f4",
                          borderRadius: "50%",
                          p: 0.5,
                        }}
                      />
                    }
                    sx={{
                      background:
                        "linear-gradient(135deg, #f9fafb 0%, #f0f9f4 100%)",
                      borderBottom: "1px solid #e5e7eb",
                      "&:hover": {
                        backgroundColor: "#f0f9f4",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#1a472a",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      📋 Product Categories
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      p: 2,
                      backgroundColor: "#fefffe",
                    }}
                  >
                    <FormGroup onChange={handleCategoryFilters}>
                      {categories?.map((category) => (
                        <motion.div
                          key={category?._id}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FormControlLabel
                            sx={{
                              ml: 0,
                              mb: 1,
                              py: 0.5,
                              px: 1.5,
                              borderRadius: 2,
                              transition: "all 0.2s ease",
                              "&:hover": {
                                backgroundColor: "#f0f9f4",
                              },
                              "& .MuiCheckbox-root": {
                                color: "#10b981",
                                "&.Mui-checked": {
                                  color: "#1a472a",
                                },
                              },
                            }}
                            control={<Checkbox size="small" />}
                            label={
                              <Typography
                                sx={{
                                  fontSize: "0.9rem",
                                  fontWeight: 500,
                                  color: "#374151",
                                }}
                              >
                                {category?.name || "Unknown Category"}
                              </Typography>
                            }
                            value={category?._id}
                          />
                        </motion.div>
                      ))}
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Box>
          </motion.div>

          {/* Main Content */}
          <Container maxWidth="xl" sx={{ px: { xs: 2, md: 3 } }}>
            <Box sx={{ mb: 4 }}>
              {/* Hero Sections */}
              <CategoryProductsSlider />
              <FeaturedCategoryProductsSlider />
              <PopularCategoryProductsSlider />
              <BrandSection />

              {/* Products Section */}
              <Box sx={{ mt: { xs: 4, md: 6 } }}>
                {/* Enhanced Header */}
                <Paper
                  elevation={0}
                  sx={{
                    background:
                      "linear-gradient(135deg, #2A3F4E 0%, #4A5568 100%)",
                    borderRadius: 4,
                    p: { xs: 2, md: 3 },
                    mb: 4,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "30%",
                      height: "100%",
                      background:
                        "linear-gradient(45deg, transparent, rgba(255,255,255,0.1))",
                      borderRadius: "50% 0 0 50%",
                    },
                  }}
                >
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={3}
                  >
                    <Box sx={{ position: "relative", zIndex: 1 }}>
                      <Typography
                        variant="h3"
                        sx={{
                          color: "white",
                          fontWeight: 700,
                          mb: 1,
                          fontSize: { xs: "2rem", md: "2.5rem" },
                        }}
                      >
                        🦷 Premium Dental Products
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "rgba(255,255,255,0.9)",
                          fontWeight: 400,
                          maxWidth: "600px",
                        }}
                      >
                        Professional-grade dental equipment and supplies for
                        superior patient care
                      </Typography>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          gap: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <Chip
                          label="✓ FDA Approved"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontWeight: 500,
                          }}
                        />
                        <Chip
                          label="✓ Premium Quality"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontWeight: 500,
                          }}
                        />
                        <Chip
                          label="✓ Fast Shipping"
                          size="small"
                          sx={{
                            backgroundColor: "rgba(255,255,255,0.2)",
                            color: "white",
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Enhanced Sort Controls */}
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        backgroundColor: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 3,
                        border: "1px solid rgba(255,255,255,0.2)",
                        minWidth: { xs: "100%", md: "300px" },
                      }}
                    >
                      <Stack spacing={2}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            color: "#2A3F4E",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <FilterListIcon fontSize="small" />
                          Sort Products
                        </Typography>
                        <FormControl fullWidth size="small">
                          <InputLabel
                            sx={{
                              color: "#374151",
                              "&.Mui-focused": { color: "#2A3F4E" },
                            }}
                          >
                            Sort Options
                          </InputLabel>
                          <Select
                            label="Sort Options"
                            onChange={(e) => setSort(e.target.value)}
                            value={sort || ""}
                            sx={{
                              borderRadius: 2,
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#d1d5db",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#10b981",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#1a472a",
                                },
                            }}
                          >
                            <MenuItem value="">
                              <Typography sx={{ color: "#6b7280" }}>
                                Reset Sorting
                              </Typography>
                            </MenuItem>
                            {sortOptions.map((option, index) => (
                              <MenuItem
                                key={option?.name || index}
                                value={option}
                              >
                                {option?.name || "Unknown Sort Option"}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Stack>
                    </Paper>
                  </Stack>
                </Paper>

                {/* Products Grid */}
                <Box sx={{ mb: 4 }}>
                  {productFetchStatus === "loading" ? (
                    <ProductListSkeleton count={8} />
                  ) : (
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      sx={{
                        justifyContent: "center",
                        "& > .MuiGrid-item": {
                          display: "flex",
                          justifyContent: "center",
                        },
                      }}
                    >
                      {products?.map((product) => (
                        <Grid
                          item
                          key={product?._id}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                        >
                          <ProductCard
                            id={product?._id}
                            title={product?.title || "Unknown Product"}
                            thumbnail={product?.thumbnail}
                            brand={product?.brand?.name || "Unknown Brand"}
                            price={product?.price || 0}
                            stockQuantity={product?.stockQuantity || 0}
                            handleAddRemoveFromWishlist={
                              handleAddRemoveFromWishlist
                            }
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>

                {/* Enhanced Pagination */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #F8FFFE 0%, #EFF4FF 100%)",
                    border: "1px solid #D1E3FF",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Pagination
                    size={is488 ? "medium" : "large"}
                    page={page}
                    onChange={(e, page) => setPage(page)}
                    count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        borderColor: "#10b981",
                        color: "#1a472a",
                        fontWeight: 500,
                        "&.Mui-selected": {
                          backgroundColor: "#1a472a",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#2d5a3d",
                          },
                        },
                        "&:hover": {
                          backgroundColor: "#f0f9f4",
                          borderColor: "#1a472a",
                        },
                      },
                    }}
                  />

                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      backgroundColor: "white",
                      borderRadius: 2,
                      border: "1px solid #D1E3FF",
                      minWidth: { xs: "100%", sm: "auto" },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#374151",
                        fontWeight: 500,
                        mb: 0.5,
                      }}
                    >
                      Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
                      {page * ITEMS_PER_PAGE > totalResults
                        ? totalResults
                        : page * ITEMS_PER_PAGE}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6b7280",
                      }}
                    >
                      of {totalResults} premium dental products
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};
