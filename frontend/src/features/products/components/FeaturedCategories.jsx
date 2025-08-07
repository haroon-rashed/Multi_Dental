import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../categories/CategoriesSlice";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Skeleton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@mui/material/styles";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

// Skeleton Loader Component
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
      {/* Image Skeleton */}
      <Skeleton variant="circular" width={140} height={140} sx={{ mb: 2.5 }} />
      {/* Name Skeleton */}
      <Skeleton
        variant="text"
        width="80%"
        height={28}
        sx={{ borderRadius: 2 }}
      />
      {/* Product Count Skeleton */}
      <Skeleton
        variant="text"
        width="60%"
        height={20}
        sx={{ mt: 1, borderRadius: 2 }}
      />
    </CardContent>
  </Card>
);

const FeaturedCategoryProductsSlider = () => {
  const theme = useTheme();
  const categoriesData = useSelector(selectCategories);
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Filter for featured categories and ensure it's always an array
  const featuredCategories = (
    Array.isArray(categoriesData) ? categoriesData : []
  ).filter((category) => category.isFeatured && !category.isDeleted);

  // Check if categories are still loading or if there are no featured categories
  const isLoading = !categoriesData || categoriesData.length === 0;

  // Don't render if there are no featured categories
  if (!isLoading && featuredCategories.length === 0) return null;

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="left"
        sx={{
          my: 6,
          color: "#1A2E4D",
          letterSpacing: "1px",
          pl: { xs: 1, md: 2 },
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: { xs: 8, md: 16 },
            width: 60,
            height: 4,
            background: "linear-gradient(90deg, #1A2E4D 0%, #3B82F6 100%)",
            borderRadius: 2,
          },
        }}
      >
        Featured Categories
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
        {/* Left Scroll Button - Modified */}
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
            backgroundColor: "background.paper",
            boxShadow: 3,
            border: `1px solid ${theme.palette.grey[200]}`,
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: theme.palette.primary[50],
              borderColor: theme.palette.primary[300],
              boxShadow: 4,
              color: theme.palette.primary.main,
            },
          }}
        >
          <ChevronLeft fontSize="medium" />
        </IconButton>

        {/* Right Scroll Button - Modified */}
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
            backgroundColor: "background.paper",
            boxShadow: 3,
            border: `1px solid ${theme.palette.grey[200]}`,
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: theme.palette.primary[50],
              borderColor: theme.palette.primary[300],
              boxShadow: 4,
              color: theme.palette.primary.main,
            },
          }}
        >
          <ChevronRight fontSize="medium" />
        </IconButton>
        {/* Keep the rest of the component exactly the same */}
        <Box
          ref={scrollContainerRef}
          sx={{
            overflowX: "auto",
            p: { xs: 2, md: 3 },
            background: "#EFF4FF",
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
                "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNiw0Niw3NywwLjA1KSIvPgo8L3N2Zz4K') repeat",
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
              background: "linear-gradient(135deg, #1A2E4D 0%, #3B82F6 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #2d3748 0%, #2563eb 100%)",
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
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <CategorySkeleton key={index} />
                ))
              : featuredCategories.map((category, index) => (
                  <Card
                    key={category._id || category.id || index}
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
                    onClick={() =>
                      navigate(`/category/${category._id || category.id}`)
                    }
                  >
                    {/* Enhanced Background Pattern */}
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
                      {/* Enhanced Image Container */}
                      <Box
                        sx={{
                          position: "relative",
                          mb: 3,
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={category.categoryImage || "/default.jpg"}
                          alt={category.name}
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

                        {/* Enhanced Shopping Cart Icon */}
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
                              boxShadow: "0 8px 25px rgba(26,46,77,0.4)",
                            },
                          }}
                        >
                          <ShoppingCartIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                      </Box>

                      {/* Enhanced Category Name */}
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
                        {typeof category.name === "string"
                          ? category.name
                          : "Unknown Category"}
                      </Typography>

                      {/* Enhanced Product Count */}
                      {category.productCount &&
                        typeof category.productCount === "number" && (
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
                            {category.productCount} Products
                          </Typography>
                        )}
                    </CardContent>

                    {/* Enhanced Bottom Gradient Accent */}
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
                ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default FeaturedCategoryProductsSlider;
