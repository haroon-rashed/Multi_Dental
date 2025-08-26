import {
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";
import React, { useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { deleteCartItemByIdAsync, updateCartItemByIdAsync } from "../CartSlice";
import { Link } from "react-router-dom";

// Helper function to safely format price (from ProductCard.js)
const formatPrice = (price) => {
  if (price == null) return "0.00";
  const num = typeof price === "number" ? price : parseFloat(price);
  return isNaN(num) ? "0.00" : num.toFixed(2);
};

export const CartItem = ({
  id,
  thumbnail,
  title,
  category,
  brand,
  price,
  quantity,
  stockQuantity,
  productId,
  discountPercentage,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));
  const is552 = useMediaQuery(theme.breakpoints.down(552));

  // Calculate pricing with discount (adapted from ProductCard.js)
  const priceCalculations = useMemo(() => {
    const originalPrice = parseFloat(price) || 0;
    const discountAmount = parseFloat(discountPercentage) || 0;
    const sellingPrice = originalPrice - discountAmount;
    const discountPercent =
      originalPrice > 0
        ? Math.round((discountAmount / originalPrice) * 100)
        : 0;

    return {
      originalPrice: formatPrice(originalPrice),
      sellingPrice: formatPrice(
        sellingPrice > 0 ? sellingPrice : originalPrice
      ),
      discountPercent,
      hasDiscount: discountAmount > 0 && originalPrice > discountAmount,
    };
  }, [price, discountPercentage]);

  const handleAddQty = () => {
    const update = { _id: id, quantity: quantity + 1 };
    dispatch(updateCartItemByIdAsync(update));
  };
  const handleRemoveQty = () => {
    if (quantity === 1) {
      dispatch(deleteCartItemByIdAsync(id));
    } else {
      const update = { _id: id, quantity: quantity - 1 };
      dispatch(updateCartItemByIdAsync(update));
    }
  };

  const handleProductRemove = () => {
    dispatch(deleteCartItemByIdAsync(id));
  };

  return (
    <Stack
      bgcolor={"white"}
      component={is900 ? "" : Paper}
      p={is900 ? 0 : 2}
      elevation={1}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      {/* image and details */}
      <Stack
        flexDirection={"row"}
        rowGap={"1rem"}
        alignItems={"center"}
        columnGap={2}
        flexWrap={"wrap"}
      >
        <Stack
          width={is552 ? "auto" : "200px"}
          height={is552 ? "auto" : "200px"}
          component={Link}
          to={`/product-details/${productId}`}
        >
          <img
            style={{
              width: "100%",
              height: is552 ? "auto" : "100%",
              aspectRatio: is552 ? 1 / 1 : "",
              objectFit: "contain",
            }}
            src={thumbnail}
            alt={`${title} image unavailabe`}
          />
        </Stack>

        <Stack alignSelf={""}>
          <Typography
            component={Link}
            to={`/product-details/${productId}`}
            sx={{ textDecoration: "none", color: theme.palette.primary.main }}
            variant="h6"
            fontWeight={500}
          >
            {title}
          </Typography>
          <Typography variant="body2" color={"text.secondary"}>
            {brand}
          </Typography>
          <Typography mt={1}>Quantity</Typography>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <IconButton onClick={handleRemoveQty}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton onClick={handleAddQty}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>

      {/* price and remove button */}
      <Stack
        justifyContent={"space-evenly"}
        alignSelf={is552 ? "flex-end" : ""}
        height={"100%"}
        rowGap={"1rem"}
        alignItems={"flex-end"}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, color: "#2A3F4E", fontSize: "1rem" }}
          >
            Rs: {priceCalculations.sellingPrice}
          </Typography>
          {priceCalculations.hasDiscount && (
            <Typography
              variant="body2"
              sx={{
                color: "#6B7280",
                textDecoration: "line-through",
                fontSize: "0.85rem",
              }}
            >
              Rs: {priceCalculations.originalPrice}
            </Typography>
          )}
          {priceCalculations.hasDiscount &&
            priceCalculations.discountPercent > 0 && (
              <Chip
                label={`${priceCalculations.discountPercent}% OFF`}
                size="small"
                sx={{
                  backgroundColor: "#5A7FBF",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.6rem",
                  height: "18px",
                }}
              />
            )}
        </Stack>
        <Button
          size={is480 ? "small" : ""}
          onClick={handleProductRemove}
          variant="contained"
        >
          Remove
        </Button>
      </Stack>
    </Stack>
  );
};
