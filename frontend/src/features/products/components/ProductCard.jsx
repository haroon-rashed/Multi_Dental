import {
  FormHelperText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Chip,
  IconButton,
  Button,
  Badge,
  Tooltip,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Fade,
  Zoom,
} from "@mui/material";
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { addToCartAsync, selectCartItems } from "../../cart/CartSlice";
import { motion, AnimatePresence } from "framer-motion";
import PlaceholderImage from "../../../components/PlaceholderImage";

// Helper function to safely extract string values from objects
const getSafeString = (value, defaultValue = "") => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    // Handle common object structures
    if (value.name) return String(value.name);
    if (value.title) return String(value.title);
    if (value.toString) return value.toString();
  }
  return String(defaultValue);
};

// Helper function to safely format price
const formatPrice = (price) => {
  if (price == null) return "0.00";
  const num = typeof price === "number" ? price : parseFloat(price);
  return isNaN(num) ? "0.00" : num.toFixed(2);
};

export const ProductCard = ({
  id,
  title,
  price,
  thumbnail,
  brand,
  stockQuantity,
  handleAddRemoveFromWishlist,
  isWishlistCard,
  isAdminCard,
}) => {
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  let isProductAlreadyinWishlist = -1;

  const theme = useTheme();
  const is1410 = useMediaQuery(theme.breakpoints.down(1410));
  const is932 = useMediaQuery(theme.breakpoints.down(932));
  const is752 = useMediaQuery(theme.breakpoints.down(752));
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const is608 = useMediaQuery(theme.breakpoints.down(608));
  const is488 = useMediaQuery(theme.breakpoints.down(488));
  const is408 = useMediaQuery(theme.breakpoints.down(408));

  isProductAlreadyinWishlist = wishlistItems.some(
    (item) => item.product._id === id
  );

  const isProductAlreadyInCart = cartItems.some(
    (item) => item.product._id === id
  );

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const data = { user: loggedInUser?._id, product: id };
    dispatch(addToCartAsync(data));
  };

  // Safely process props
  const safeTitle = useMemo(
    () => getSafeString(title, "Product Title"),
    [title]
  );
  const safeBrand = useMemo(() => getSafeString(brand, "Brand"), [brand]);
  const safePrice = useMemo(() => formatPrice(price), [price]);
  const safeThumbnail = useMemo(() => {
    if (!thumbnail) return "";
    if (typeof thumbnail === "string") return thumbnail;
    if (thumbnail.url) return thumbnail.url;
    return "";
  }, [thumbnail]);

  // Calculate card dimensions
  const cardWidth = is408
    ? "240px"
    : is488
    ? "260px"
    : is608
    ? "280px"
    : is752
    ? "300px"
    : is932
    ? "280px"
    : is1410
    ? "300px"
    : "320px";

  // Stock status logic
  const getStockStatus = () => {
    if (stockQuantity === 0)
      return { text: "Out of Stock", color: "error", severity: "high" };
    if (stockQuantity <= 5)
      return {
        text: `Only ${stockQuantity} left`,
        color: "error",
        severity: "high",
      };
    if (stockQuantity <= 20)
      return { text: "Few items left", color: "warning", severity: "medium" };
    return { text: "In Stock", color: "success", severity: "low" };
  };

  const stockStatus = getStockStatus();

  return (
    <>
      {isProductAlreadyinWishlist !== -1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Card
            elevation={isHovered ? 4 : 1}
            sx={{
              width: cardWidth,
              height: "400px", // Fixed height for all cards
              maxWidth: "100%",
              cursor: "pointer",
              borderRadius: 3,
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              background: "linear-gradient(135deg, #F8FFFE 0%, #EFF4FF 100%)",
              border: `1px solid ${isHovered ? "#5A7FBF" : "#E5E7EB"}`,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 25px rgba(90, 127, 191, 0.15)",
              },
            }}
            onClick={() => navigate(`/product-details/${id}`)}
          >
            {/* Image Section with Overlay */}
            <Box sx={{ position: "relative", overflow: "hidden" }}>
              {/* Stock Badge */}
              <AnimatePresence>
                {stockStatus.severity !== "low" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      zIndex: 10,
                    }}
                  >
                    <Chip
                      label={stockStatus.text}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.65rem",
                        height: "20px",
                        backgroundColor:
                          stockStatus.color === "error" ? "#5A7FBF" : "#5A7FBF",
                        color: "white",
                        "& .MuiChip-label": { px: 1 },
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wishlist Heart */}
              {!isAdminCard && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 10,
                  }}
                >
                  <IconButton
                    onClick={(e) => e.stopPropagation()}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    <Checkbox
                      checked={isProductAlreadyinWishlist}
                      onChange={(e) => handleAddRemoveFromWishlist(e, id)}
                      icon={
                        <FavoriteBorder
                          sx={{ color: "#6B7280", fontSize: 18 }}
                        />
                      }
                      checkedIcon={
                        <Favorite sx={{ color: "#5A7FBF", fontSize: 18 }} />
                      }
                      sx={{ p: 0 }}
                    />
                  </IconButton>
                </Box>
              )}

              {/* Product Image */}
              <CardMedia
                sx={{
                  height: 180, // Fixed height for all images
                  position: "relative",
                  backgroundColor: "#FEFFFE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {imageError ? (
                  <PlaceholderImage
                    width="100%"
                    height="100%"
                    text="Product Image"
                  />
                ) : (
                  <img
                    src={safeThumbnail}
                    alt={`${safeTitle} photo unavailable`}
                    onError={() => setImageError(true)}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: "16px",
                    }}
                  />
                )}
              </CardMedia>
            </Box>

            {/* Content Section */}
            <CardContent
              sx={{
                p: 2,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Brand Badge */}
              <Box sx={{ mb: 1 }}>
                <Chip
                  label={safeBrand}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: "#5A7FBF",
                    color: "#2A3F4E",
                    fontWeight: 500,
                    fontSize: "0.7rem",
                    height: "22px",
                    backgroundColor: "rgba(90, 127, 191, 0.1)",
                  }}
                />
              </Box>

              {/* Product Title */}
              <Typography
                variant="subtitle1"
                component="h3"
                sx={{
                  fontWeight: 600,
                  color: "#2A3F4E",
                  mb: 1,
                  fontSize: "0.9rem",
                  lineHeight: 1.2,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: "2.4em",
                }}
                title={safeTitle}
              >
                {safeTitle}
              </Typography>

              {/* Rating Stars */}
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 1, gap: 0.3 }}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    sx={{
                      fontSize: 14,
                      color: star <= 4 ? "#FFB400" : "#E5E7EB",
                    }}
                  />
                ))}
                <Typography
                  variant="body2"
                  sx={{ ml: 0.5, color: "#6B7280", fontSize: "0.7rem" }}
                >
                  (4.0)
                </Typography>
              </Box>

              {/* Price Section with Stock Warning */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{
                      fontWeight: 700,
                      color: "#2A3F4E",
                      fontSize: "1.1rem",
                    }}
                  >
                    ${safePrice}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      color: "#6B7280",
                      textDecoration: "line-through",
                      fontSize: "0.75rem",
                    }}
                  >
                    ${(parseFloat(safePrice) * 1.2).toFixed(2)}
                  </Typography>
                  <Chip
                    label="20% OFF"
                    size="small"
                    sx={{
                      backgroundColor: "#5A7FBF",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.6rem",
                      height: "18px",
                    }}
                  />
                </Box>

                {/* Stock Warning - Inline */}
                {stockQuantity <= 20 && stockQuantity > 0 && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: stockQuantity <= 5 ? "#5A7FBF" : "#5A7FBF",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      fontStyle: "italic",
                    }}
                  >
                    {stockQuantity === 1
                      ? "Only 1 left!"
                      : `Only ${stockQuantity} left!`}
                  </Typography>
                )}
              </Box>
            </CardContent>

            {/* Actions Section */}
            {!isWishlistCard && (
              <CardActions sx={{ p: 2, pt: 0 }}>
                {isProductAlreadyInCart ? (
                  <Button
                    fullWidth
                    disabled
                    variant="contained"
                    startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      py: 1,
                      borderRadius: 2,
                      backgroundColor: "#10B981",
                      color: "white",
                      fontWeight: 500,
                      fontSize: "0.8rem",
                      textTransform: "none",
                      "&.Mui-disabled": {
                        backgroundColor: "#10B981",
                        color: "white",
                      },
                    }}
                  >
                    Added to Cart
                  </Button>
                ) : (
                  !isAdminCard && (
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
                      onClick={handleAddToCart}
                      disabled={stockQuantity === 0}
                      sx={{
                        py: 1,
                        borderRadius: 2,
                        background:
                          stockQuantity === 0
                            ? "#9CA3AF"
                            : "linear-gradient(135deg, #2A3F4E 0%, #5A7FBF 100%)",
                        color: "white",
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        textTransform: "none",
                        "&:hover": {
                          background:
                            stockQuantity === 0
                              ? "#9CA3AF"
                              : "linear-gradient(135deg, #4A5568 0%, #6B8EC7 100%)",
                        },
                        "&:disabled": {
                          background: "#9CA3AF",
                          color: "white",
                        },
                      }}
                    >
                      {stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  )
                )}
              </CardActions>
            )}
          </Card>
        </motion.div>
      )}
    </>
  );
};
