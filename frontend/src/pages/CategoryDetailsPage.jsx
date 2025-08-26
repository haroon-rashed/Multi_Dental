import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Stack,
  Grid,
  Divider,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Footer } from "../features/footer/Footer";
import {
  selectCategories,
  selectCategoryStatus,
} from "../features/categories/CategoriesSlice";
import {
  fetchProductsAsync,
  selectProducts,
  selectProductFetchStatus,
  clearProductErrors,
  resetProductFetchStatus,
} from "../features/products/ProductSlice";
import { ProductCard } from "../features/products/components/ProductCard";
import {
  ProductListSkeleton,
  ListSkeleton,
} from "../components/skeletons/SkeletonLoaders";
import UserNavbar from "../features/navigation/components/UserNavbar";

// Skeleton Loader Component for Subcategories
const CategorySkeleton = () => (
  <Card
    sx={{
      minWidth: 280,
      maxWidth: 280,
      borderRadius: 4,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
      border: "1px solid rgba(226, 232, 240, 0.6)",
    }}
  >
    <CardContent
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 280,
        justifyContent: "center",
      }}
    >
      <Skeleton variant="circular" width={140} height={140} sx={{ mb: 2.5 }} />
      <Skeleton
        variant="text"
        width="80%"
        height={28}
        sx={{ borderRadius: 2 }}
      />
      <Skeleton
        variant="text"
        width="60%"
        height={20}
        sx={{ mt: 1, borderRadius: 2 }}
      />
    </CardContent>
  </Card>
);

const CategoryDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const categoryStatus = useSelector(selectCategoryStatus);
  const productFetchStatus = useSelector(selectProductFetchStatus);
  const [hasFetched, setHasFetched] = useState(false);

  // Debug log all categories
  console.log("All categories:", JSON.stringify(categories, null, 2));

  // Find selected category
  const category = categories.find((cat) => {
    const catId = cat._id || cat.id;
    return catId && String(catId) === String(id);
  });

  console.log("Selected category:", JSON.stringify(category, null, 2));

  // Find subcategories
  const subcategories = categories.filter((cat) => {
    if (!cat.parent_id) return false;

    let parentId = cat.parent_id;
    if (parentId && typeof parentId === "object") {
      parentId = parentId._id || parentId.id;
    }

    return parentId && String(parentId) === String(id);
  });

  console.log("Subcategories:", JSON.stringify(subcategories, null, 2));

  // Scroll function for carousel
  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  useEffect(() => {
    // Reset fetch status when category changes
    dispatch(resetProductFetchStatus());

    // Only fetch products if there are no subcategories
    if (subcategories.length === 0 && id) {
      dispatch(fetchProductsAsync({ category: [id] }));
      setHasFetched(true);
    } else {
      setHasFetched(false);
    }
  }, [dispatch, id, subcategories.length]);

  // Clear product errors when products are successfully fetched
  useEffect(() => {
    if (products && products.length > 0) {
      dispatch(clearProductErrors());
    }
  }, [products, dispatch]);

  // Helper to safely get name string from any possible structure
  const getNameString = (nameObj) => {
    try {
      if (!nameObj) return "Category";
      if (typeof nameObj === "string") return nameObj;
      if (nameObj && typeof nameObj === "object") {
        const name = nameObj.name;
        if (typeof name === "string") return name;
        if (name && typeof name === "object" && name.name) {
          return String(name.name);
        }
        if (nameObj._id) {
          return `Category ${String(nameObj._id).substring(0, 4)}`;
        }
      }
      return "Category";
    } catch (error) {
      console.error("Error getting name string:", error, nameObj);
      return "Category";
    }
  };

  const hasSubcategories = subcategories.length > 0;

  const handleSubcategoryClick = (subcatId) => {
    navigate(`/category/${subcatId}`);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      {/* Sticky Navbar */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 1201 }}>
        <UserNavbar />
      </Box>
      <Box sx={{ minHeight: "80vh", background: "#f8fafc" }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", pt: 4, px: { xs: 2, md: 4 } }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
            sx={{ mb: 2, color: "#1A2E4D" }}
          >
            Back to Categories
          </Button>
          <Typography
            variant="h4"
            fontWeight={700}
            color="#1A2E4D"
            mb={2}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {category ? (
              <>
                {getNameString(category.name)}
                {!hasSubcategories && products && products.length > 0 && (
                  <HelpOutlineIcon
                    color="primary"
                    fontSize="medium"
                    titleAccess="Products available"
                    sx={{ ml: 1 }}
                  />
                )}
              </>
            ) : (
              "Loading category..."
            )}
          </Typography>
          {/* Subcategories Slider */}
          <Box sx={{ mb: 3 }}>
            {categoryStatus === "loading" ? (
              <Stack direction="row" spacing={2}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <CategorySkeleton key={index} />
                ))}
              </Stack>
            ) : hasSubcategories ? (
              <>
                <Typography variant="h6" color="text.secondary" mb={2}>
                  Subcategories
                </Typography>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "calc(100vw - 64px)",
                    mx: "auto",
                    "&:hover .scroll-button": {
                      opacity: 1,
                    },
                  }}
                >
                  {/* Left Scroll Button */}
                  <IconButton
                    onClick={() => scroll(-400)}
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      width: 48,
                      height: 48,
                      backgroundColor: "#ffffff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "1px solid #e2e8f0",
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: "#e3f0ff",
                        borderColor: "#93c5fd",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                        color: "#3b82f6",
                      },
                    }}
                  >
                    <ChevronLeft fontSize="medium" />
                  </IconButton>
                  {/* Right Scroll Button */}
                  <IconButton
                    onClick={() => scroll(400)}
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      width: 48,
                      height: 48,
                      backgroundColor: "#ffffff",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "1px solid #e2e8f0",
                      transition: "all 0.3s",
                      "&:hover": {
                        backgroundColor: "#e3f0ff",
                        borderColor: "#93c5fd",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                        color: "#3b82f6",
                      },
                    }}
                  >
                    <ChevronRight fontSize="medium" />
                  </IconButton>
                  <Box
                    ref={scrollContainerRef}
                    sx={{
                      overflowX: "auto",
                      p: { xs: 2, md: 3 },
                      backgroundColor: "#EFF4FF",
                      borderRadius: 3,
                      position: "relative",
                      scrollBehavior: "smooth",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA4MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNiw0Niw3NywwLjA1KSIvPgo8L3N2Zz4K') repeat",
                        opacity: 0.3,
                        pointerEvents: "none",
                      },
                      "&::-webkit-scrollbar": {
                        height: 10,
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "rgba(0,0,0,0.08)",
                        borderRadius: 6,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#1A2E4D",
                        borderRadius: 6,
                        background:
                          "linear-gradient(135deg, #1A2E4D 0%, #3B82F6 100%)",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #2d3748 0%, #2563eb 100%)",
                        },
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={4}
                      sx={{
                        width: "max-content",
                        pb: 2,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {subcategories.map((subcat) => {
                        const subcatId = subcat?._id || subcat?.id;
                        if (!subcatId) return null;

                        return (
                          <Card
                            key={subcatId}
                            sx={{
                              minWidth: 280,
                              maxWidth: 280,
                              borderRadius: 4,
                              boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
                              position: "relative",
                              overflow: "hidden",
                              cursor: "pointer",
                              transition:
                                "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                              background:
                                "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                              border: "1px solid rgba(226, 232, 240, 0.6)",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background:
                                  "linear-gradient(145deg, rgba(26,46,77,0.05) 0%, rgba(59,130,246,0.1) 100%)",
                                opacity: 0,
                                transition: "opacity 0.5s ease",
                                zIndex: 1,
                              },
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                top: -100,
                                left: -100,
                                width: 200,
                                height: 200,
                                borderRadius: "50%",
                                background:
                                  "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
                                opacity: 0,
                                transition: "all 0.5s ease",
                                zIndex: 0,
                              },
                              ":hover": {
                                transform: "translateY(-8px) scale(1.02)",
                                boxShadow: "0 20px 50px rgba(26,46,77,0.18)",
                                "&::before": {
                                  opacity: 1,
                                },
                                "&::after": {
                                  opacity: 1,
                                  transform: "translate(50px, 50px)",
                                },
                                "& .category-image": {
                                  transform: "scale(1.1) rotate(2deg)",
                                },
                                "& .category-name": {
                                  color: "#1A2E4D",
                                  transform: "translateY(-3px)",
                                },
                                "& .shop-icon": {
                                  opacity: 1,
                                  transform: "translateY(0) scale(1.1)",
                                },
                                "& .product-count": {
                                  color: "#1A2E4D",
                                },
                              },
                            }}
                            onClick={() => handleSubcategoryClick(subcatId)}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: -60,
                                right: -60,
                                width: 120,
                                height: 120,
                                borderRadius: "50%",
                                background:
                                  "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(147,197,253,0.15) 100%)",
                                zIndex: 0,
                              }}
                            />
                            <CardContent
                              sx={{
                                p: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                position: "relative",
                                zIndex: 2,
                                height: 280,
                                justifyContent: "center",
                              }}
                            >
                              <Box sx={{ position: "relative", mb: 3 }}>
                                <CardMedia
                                  component="img"
                                  image={subcat.categoryImage || "/default.jpg"}
                                  alt={getNameString(subcat?.name)}
                                  className="category-image"
                                  sx={{
                                    height: 140,
                                    width: 140,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "6px solid #ffffff",
                                    boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
                                    transition:
                                      "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                    background: "#fff",
                                    position: "relative",
                                    "&::before": {
                                      content: '""',
                                      position: "absolute",
                                      top: -6,
                                      left: -6,
                                      right: -6,
                                      bottom: -6,
                                      borderRadius: "50%",
                                      background:
                                        "linear-gradient(45deg, #1A2E4D, #3B82F6, #1A2E4D)",
                                      zIndex: -1,
                                      opacity: 0,
                                    },
                                  }}
                                />
                                <IconButton
                                  className="shop-icon"
                                  sx={{
                                    position: "absolute",
                                    bottom: 8,
                                    right: 8,
                                    backgroundColor: "#1A2E4D",
                                    color: "white",
                                    width: 40,
                                    height: 40,
                                    opacity: 0,
                                    transform: "translateY(15px)",
                                    transition:
                                      "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                    boxShadow: "0 6px 20px rgba(26,46,77,0.3)",
                                    "&:hover": {
                                      backgroundColor: "#2d3748",
                                      transform: "translateY(0) scale(1.15)",
                                      boxShadow:
                                        "0 8px 25px rgba(26,46,77,0.4)",
                                    },
                                  }}
                                >
                                  <ShoppingCartIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                              </Box>
                              <Typography
                                variant="h6"
                                className="category-name"
                                sx={{
                                  fontWeight: 600,
                                  textAlign: "center",
                                  color: "#374151",
                                  fontSize: "1.2rem",
                                  lineHeight: 1.3,
                                  transition:
                                    "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                                  letterSpacing: "0.5px",
                                  maxWidth: "100%",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  mb: 1,
                                }}
                              >
                                {getNameString(subcat?.name) || "Subcategory"}
                              </Typography>
                              {subcat.productCount &&
                                typeof subcat.productCount === "number" && (
                                  <Typography
                                    variant="body2"
                                    className="product-count"
                                    sx={{
                                      color: "#9CA3AF",
                                      fontSize: "0.9rem",
                                      fontWeight: 500,
                                      transition: "color 0.5s ease",
                                      padding: "4px 12px",
                                      borderRadius: "12px",
                                      background: "rgba(156, 163, 175, 0.1)",
                                    }}
                                  >
                                    {subcat.productCount} Products
                                  </Typography>
                                )}
                            </CardContent>
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 6,
                                background:
                                  "linear-gradient(90deg, #1A2E4D 0%, #3B82F6 50%, #1A2E4D 100%)",
                                opacity: 0.9,
                              }}
                            />
                          </Card>
                        );
                      })}
                    </Stack>
                  </Box>
                </Box>
              </>
            ) : null}
          </Box>
          <Divider sx={{ mb: 3 }} />
          {/* Products Grid */}
          {!hasSubcategories && (
            <>
              {productFetchStatus === "pending" ? (
                <ProductListSkeleton count={8} />
              ) : (
                <Grid container spacing={3}>
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={product._id || product.id}
                      >
                        <ProductCard {...product} />
                      </Grid>
                    ))
                  ) : (
                    <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        {hasFetched
                          ? "No products found for this category."
                          : "Loading products..."}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              )}
            </>
          )}

          {/* Show message for categories with subcategories */}
          {hasSubcategories && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Please select a subcategory to view products
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default CategoryDetailsPage;
