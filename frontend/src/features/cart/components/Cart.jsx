import React, { useEffect } from "react";
import { CartItem } from "./CartItem";
import {
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  resetCartItemRemoveStatus,
  selectCartItemRemoveStatus,
  selectCartItems,
} from "../CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SHIPPING, TAXES } from "../../../constants";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export const Cart = ({ checkout }) => {
  const items = useSelector(selectCartItems);
  const subtotal = items.reduce((acc, item) => {
    const originalPrice = item?.product?.price || 0;
    const discountAmount = item?.product?.discountPercentage || 0;
    const sellingPrice = originalPrice - discountAmount;
    return (
      (sellingPrice > 0 ? sellingPrice : originalPrice) *
        (item?.quantity || 0) +
      acc
    );
  }, 0);
  const totalItems = items.reduce(
    (acc, item) => acc + (item?.quantity || 0),
    0
  );
  const navigate = useNavigate();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));

  const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [items]);

  useEffect(() => {
    if (cartItemRemoveStatus === "fulfilled") {
      toast.success("Product removed from cart");
    } else if (cartItemRemoveStatus === "rejected") {
      toast.error("Error removing product from cart, please try again later");
    }
  }, [cartItemRemoveStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetCartItemRemoveStatus());
    };
  }, []);

  return (
    <Stack justifyContent={"flex-start"} alignItems={"center"} mb={"5rem"}>
      <Stack
        width={is900 ? "auto" : "50rem"}
        mt={"3rem"}
        paddingLeft={checkout ? 0 : 2}
        paddingRight={checkout ? 0 : 2}
        rowGap={4}
      >
        {/* cart items */}
        <Stack rowGap={2}>
          {items &&
            items.map((item) => (
              <CartItem
                key={item?._id}
                id={item?._id}
                title={item?.product?.title || "Unknown Product"}
                brand={item?.product?.brand?.name || "Unknown Brand"}
                category={item?.product?.category?.name || "Unknown Category"}
                price={item?.product?.price || 0}
                quantity={item?.quantity || 0}
                thumbnail={item?.product?.thumbnail}
                stockQuantity={item?.product?.stockQuantity || 0}
                productId={item?.product?._id}
                discountPercentage={item?.product?.discountPercentage || 0}
              />
            ))}
        </Stack>

        {/* subtotal */}
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {checkout ? (
            <Stack rowGap={2} width={"100%"}>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Subtotal</Typography>
                <Typography>Rs: {subtotal}</Typography>
              </Stack>

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Shipping</Typography>
                <Typography>Rs: {SHIPPING}</Typography>
              </Stack>

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Taxes</Typography>
                <Typography>Rs: {TAXES}</Typography>
              </Stack>

              <hr />

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Total</Typography>
                <Typography>Rs: {subtotal + SHIPPING + TAXES}</Typography>
              </Stack>
            </Stack>
          ) : (
            <>
              <Stack>
                <Typography variant="h6" fontWeight={500}>
                  Subtotal
                </Typography>
                <Typography>Total items in cart {totalItems}</Typography>
                <Typography variant="body1" color={"text.secondary"}>
                  Shipping and taxes will be calculated at checkout.
                </Typography>
              </Stack>

              <Stack>
                <Typography variant="h6" fontWeight={500}>
                  Rs: {subtotal}
                </Typography>
              </Stack>
            </>
          )}
        </Stack>

        {/* checkout or continue shopping */}
        {!checkout && (
          <Stack rowGap={"1rem"}>
            <Button variant="contained" component={Link} to="/checkout">
              Checkout
            </Button>
            <motion.div style={{ alignSelf: "center" }} whileHover={{ y: 2 }}>
              <Chip
                sx={{ cursor: "pointer", borderRadius: "8px" }}
                component={Link}
                to={"/"}
                label="or continue shopping"
                variant="outlined"
              />
            </motion.div>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
