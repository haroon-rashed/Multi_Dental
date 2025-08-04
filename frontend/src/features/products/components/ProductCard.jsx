import {
  FormHelperText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlistItems } from "../../wishlist/WishlistSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { addToCartAsync, selectCartItems } from "../../cart/CartSlice";
import { motion } from "framer-motion";
import PlaceholderImage from "../../../components/PlaceholderImage";

// Helper function to safely extract string values from objects
const getSafeString = (value, defaultValue = '') => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    // Handle common object structures
    if (value.name) return String(value.name);
    if (value.title) return String(value.title);
    if (value.toString) return value.toString();
  }
  return String(defaultValue);
};

// Helper function to safely format price
const formatPrice = (price) => {
  if (price == null) return '0.00';
  const num = typeof price === 'number' ? price : parseFloat(price);
  return isNaN(num) ? '0.00' : num.toFixed(2);
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
  const safeTitle = useMemo(() => getSafeString(title, 'Product Title'), [title]);
  const safeBrand = useMemo(() => getSafeString(brand, 'Brand'), [brand]);
  const safePrice = useMemo(() => formatPrice(price), [price]);
  const safeThumbnail = useMemo(() => {
    if (!thumbnail) return '';
    if (typeof thumbnail === 'string') return thumbnail;
    if (thumbnail.url) return thumbnail.url;
    return '';
  }, [thumbnail]);

  return (
    <>
      {isProductAlreadyinWishlist !== -1 && (
        <Stack
          component={
            isAdminCard ? "" : isWishlistCard ? "" : is408 ? "" : Paper
          }
          mt={is408 ? 2 : 0}
          elevation={1}
          p={2}
          width={
            is408
              ? "auto"
              : is488
              ? "200px"
              : is608
              ? "240px"
              : is752
              ? "300px"
              : is932
              ? "240px"
              : is1410
              ? "300px"
              : "340px"
          }
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/product-details/${id}`)}
        >
          {/* image display */}
          <Stack>
            {imageError ? (
              <PlaceholderImage 
                width="100%" 
                height="300px" 
                text="Product Image" 
              />
            ) : (
              <img
                width={"100%"}
                style={{ aspectRatio: 1 / 1, objectFit: "contain" }}
                height={"100%"}
                src={safeThumbnail}
                alt={`${safeTitle} photo unavailable`}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            )}
          </Stack>

          {/* lower section */}
          <Stack flex={2} justifyContent={"flex-end"} spacing={1} rowGap={2}>
            <Stack>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography 
                  variant="h6" 
                  fontWeight={400}
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '200px'
                  }}
                >
                  {safeTitle}
                </Typography>
                {!isAdminCard && (
                  <motion.div
                    whileHover={{ scale: 1.3, y: -10, zIndex: 100 }}
                    whileTap={{ scale: 1 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  >
                    <Checkbox
                      onClick={(e) => e.stopPropagation()}
                      checked={isProductAlreadyinWishlist}
                      onChange={(e) => handleAddRemoveFromWishlist(e, id)}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite sx={{ color: "red" }} />}
                    />
                  </motion.div>
                )}
              </Stack>
              <Typography 
                color={"text.secondary"}
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '200px'
                }}
              >
                {safeBrand}
              </Typography>
            </Stack>

            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>${safePrice}</Typography>
              {!isWishlistCard
                ? isProductAlreadyInCart
                  ? "Added to cart"
                  : !isAdminCard && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 1 }}
                        onClick={(e) => handleAddToCart(e)}
                        style={{
                          padding: "10px 15px",
                          borderRadius: "3px",
                          outline: "none",
                          border: "none",
                          cursor: "pointer",
                          backgroundColor: "black",
                          color: "white",
                          fontSize: is408
                            ? ".9rem"
                            : is488
                            ? ".7rem"
                            : is500
                            ? ".8rem"
                            : ".9rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: ".5rem",
                          }}
                        >
                          <p>Add To Cart</p>
                        </div>
                      </motion.button>
                    )
                : ""}
            </Stack>
            {stockQuantity <= 20 && (
              <FormHelperText sx={{ fontSize: ".9rem" }} error>
                {stockQuantity === 1
                  ? "Only 1 stock is left"
                  : "Only few are left"}
              </FormHelperText>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
};
