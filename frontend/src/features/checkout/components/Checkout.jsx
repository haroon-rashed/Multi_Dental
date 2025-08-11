import {
  Stack,
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
  Radio,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Cart } from "../../cart/components/Cart";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddressAsync,
  selectAddressStatus,
  selectAddresses,
} from "../../address/AddressSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  createOrderAsync,
  createGuestOrderWithUserAsync,
  selectCurrentOrder,
  selectOrderStatus,
} from "../../order/OrderSlice";
import { resetCartByUserIdAsync, selectCartItems } from "../../cart/CartSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SHIPPING, TAXES } from "../../../constants";
import { motion } from "framer-motion";

export const Checkout = () => {
  const addresses = useSelector(selectAddresses);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerGuest,
    handleSubmit: handleSubmitGuest,
    reset: resetGuest,
    formState: { errors: guestErrors },
  } = useForm();

  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const addressStatus = useSelector(selectAddressStatus);
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const orderStatus = useSelector(selectOrderStatus);
  const currentOrder = useSelector(selectCurrentOrder);

  const orderTotal = cartItems.reduce(
    (acc, item) => item.product.price * item.quantity + acc,
    0
  );

  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  useEffect(() => {
    if (addressStatus === "fulfilled") {
      reset();
    } else if (addressStatus === "rejected") {
      alert("Error adding your address");
    }
  }, [addressStatus]);

  useEffect(() => {
    if (currentOrder && currentOrder?._id) {
      if (loggedInUser) {
        dispatch(resetCartByUserIdAsync(loggedInUser?._id));
      }
      navigate(`/order-success/${currentOrder?._id}`);
    }
  }, [currentOrder]);

  const handleAddAddress = (data) => {
    const address = { ...data, user: loggedInUser._id };
    dispatch(addAddressAsync(address));
  };

  // For logged-in users - regular order
  const handleCreateOrder = () => {
    const order = {
      user: loggedInUser._id,
      item: cartItems,
      address: selectedAddress,
      paymentMode: selectedPaymentMethod,
      total: orderTotal + SHIPPING + TAXES,
    };
    dispatch(createOrderAsync(order));
  };

  // For guest users - create user + order
  const handleGuestOrderWithUser = (guestData) => {
    const orderData = {
      userInfo: {
        name: guestData.name,
        email: guestData.email,
        createAccount: true, // Always create account for guests
      },
      orderInfo: {
        item: cartItems,
        address: {
          type: guestData.addressType,
          street: guestData.street,
          city: guestData.city,
          state: guestData.state,
          country: guestData.country,
          postalCode: guestData.postalCode,
          phoneNumber: guestData.phoneNumber,
        },
        paymentMode: selectedPaymentMethod,
        total: orderTotal + SHIPPING + TAXES,
      },
    };
    dispatch(createGuestOrderWithUserAsync(orderData));
  };

  return (
    <Stack
      flexDirection={"row"}
      p={2}
      rowGap={10}
      justifyContent={"center"}
      flexWrap={"wrap"}
      mb={"5rem"}
      mt={2}
      columnGap={4}
      alignItems={"flex-start"}
    >
      {/* Left Box - Forms */}
      <Stack rowGap={4}>
        {/* Heading */}
        <Stack
          flexDirection={"row"}
          columnGap={is480 ? 0.3 : 1}
          alignItems={"center"}
        >
          <motion.div whileHover={{ x: -5 }}>
            <IconButton component={Link} to={"/cart"}>
              <ArrowBackIcon fontSize={is480 ? "medium" : "large"} />
            </IconButton>
          </motion.div>
          <Typography variant="h4">
            {loggedInUser ? "Shipping Information" : "Checkout"}
          </Typography>
        </Stack>

        {/* Show user status */}
        {loggedInUser && (
          <Alert severity="info">
            Welcome back, {loggedInUser.name}! ({loggedInUser.email})
          </Alert>
        )}

        {/* GUEST CHECKOUT FORM */}
        {!loggedInUser && (
          <Stack
            component={"form"}
            noValidate
            rowGap={3}
            onSubmit={handleSubmitGuest(handleGuestOrderWithUser)}
          >
            {/* Personal Information - Only for Guests */}
            <Typography variant="h6">Personal Information</Typography>
            <Stack flexDirection={is480 ? "column" : "row"} gap={2}>
              <Stack width={"100%"}>
                <Typography gutterBottom>Full Name *</Typography>
                <TextField
                  {...registerGuest("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  error={!!guestErrors.name}
                  helperText={guestErrors.name?.message}
                />
              </Stack>
              <Stack width={"100%"}>
                <Typography gutterBottom>Email *</Typography>
                <TextField
                  type="email"
                  {...registerGuest("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  error={!!guestErrors.email}
                  helperText={
                    guestErrors.email?.message ||
                    "We'll create an account and send login details"
                  }
                />
              </Stack>
            </Stack>

            <Alert severity="success">
              We'll create an account for you and email your login credentials
              with the order confirmation.
            </Alert>

            <Divider />

            {/* Shipping Address - For Guests */}
            <Typography variant="h6">Shipping Address</Typography>

            <Stack>
              <Typography gutterBottom>Address Type</Typography>
              <TextField
                placeholder="Eg. Home, Office, Business"
                {...registerGuest("addressType", {
                  required: "Address type is required",
                })}
                error={!!guestErrors.addressType}
                helperText={guestErrors.addressType?.message}
              />
            </Stack>

            <Stack>
              <Typography gutterBottom>Street Address *</Typography>
              <TextField
                placeholder="House number, building, street"
                {...registerGuest("street", {
                  required: "Street address is required",
                })}
                error={!!guestErrors.street}
                helperText={guestErrors.street?.message}
              />
            </Stack>

            <Stack flexDirection={is480 ? "column" : "row"} gap={2}>
              <Stack width={"100%"}>
                <Typography gutterBottom>City *</Typography>
                <TextField
                  {...registerGuest("city", { required: "City is required" })}
                  error={!!guestErrors.city}
                  helperText={guestErrors.city?.message}
                />
              </Stack>
              <Stack width={"100%"}>
                <Typography gutterBottom>State *</Typography>
                <TextField
                  {...registerGuest("state", { required: "State is required" })}
                  error={!!guestErrors.state}
                  helperText={guestErrors.state?.message}
                />
              </Stack>
            </Stack>

            <Stack flexDirection={is480 ? "column" : "row"} gap={2}>
              <Stack width={"100%"}>
                <Typography gutterBottom>Country *</Typography>
                <TextField
                  {...registerGuest("country", {
                    required: "Country is required",
                  })}
                  error={!!guestErrors.country}
                  helperText={guestErrors.country?.message}
                />
              </Stack>
              <Stack width={"100%"}>
                <Typography gutterBottom>Postal Code *</Typography>
                <TextField
                  {...registerGuest("postalCode", {
                    required: "Postal code is required",
                  })}
                  error={!!guestErrors.postalCode}
                  helperText={guestErrors.postalCode?.message}
                />
              </Stack>
            </Stack>

            <Stack>
              <Typography gutterBottom>Phone Number *</Typography>
              <TextField
                type="tel"
                placeholder="+1 234 567 8900"
                {...registerGuest("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[\+]?[0-9\s\-\(\)]{10,15}$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                error={!!guestErrors.phoneNumber}
                helperText={guestErrors.phoneNumber?.message}
              />
            </Stack>

            <Divider />

            {/* Payment Methods - For Guests */}
            <Stack rowGap={3}>
              <Stack>
                <Typography variant="h6">Payment Method</Typography>
                <Typography variant="body2" color={"text.secondary"}>
                  Please select a payment method
                </Typography>
              </Stack>

              <Stack rowGap={2}>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <Radio
                    value={selectedPaymentMethod}
                    name="paymentMethod"
                    checked={selectedPaymentMethod === "COD"}
                    onChange={() => setSelectedPaymentMethod("COD")}
                  />
                  <Stack>
                    <Typography>Cash on Delivery</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Pay when your order is delivered
                    </Typography>
                  </Stack>
                </Stack>

                <Stack flexDirection={"row"} alignItems={"center"}>
                  <Radio
                    value={selectedPaymentMethod}
                    name="paymentMethod"
                    checked={selectedPaymentMethod === "CARD"}
                    onChange={() => setSelectedPaymentMethod("CARD")}
                  />
                  <Stack>
                    <Typography>Card Payment</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Pay securely with your card
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              flexDirection={"row"}
              alignSelf={"flex-end"}
              columnGap={1}
              mt={2}
            >
              <LoadingButton
                loading={orderStatus === "pending"}
                type="submit"
                variant="contained"
                size="large"
                sx={{ minWidth: 150 }}
              >
                Place Order
              </LoadingButton>
              <Button
                color="error"
                variant="outlined"
                onClick={() => resetGuest()}
              >
                Reset
              </Button>
            </Stack>
          </Stack>
        )}

        {/* LOGGED-IN USER FORMS */}
        {loggedInUser && (
          <>
            {/* Add New Address Form */}
            <Stack
              component={"form"}
              noValidate
              rowGap={2}
              onSubmit={handleSubmit(handleAddAddress)}
            >
              <Typography variant="h6">Add New Address</Typography>

              <Stack>
                <Typography gutterBottom>Address Type</Typography>
                <TextField
                  placeholder="Eg. Home, Office, Business"
                  {...register("type", { required: true })}
                />
              </Stack>

              <Stack>
                <Typography gutterBottom>Street Address</Typography>
                <TextField {...register("street", { required: true })} />
              </Stack>

              <Stack>
                <Typography gutterBottom>Country</Typography>
                <TextField {...register("country", { required: true })} />
              </Stack>

              <Stack>
                <Typography gutterBottom>Phone Number</Typography>
                <TextField
                  type="tel"
                  {...register("phoneNumber", { required: true })}
                />
              </Stack>

              <Stack flexDirection={"row"} gap={2}>
                <Stack width={"100%"}>
                  <Typography gutterBottom>City</Typography>
                  <TextField {...register("city", { required: true })} />
                </Stack>
                <Stack width={"100%"}>
                  <Typography gutterBottom>State</Typography>
                  <TextField {...register("state", { required: true })} />
                </Stack>
                <Stack width={"100%"}>
                  <Typography gutterBottom>Postal Code</Typography>
                  <TextField {...register("postalCode", { required: true })} />
                </Stack>
              </Stack>

              <Stack flexDirection={"row"} alignSelf={"flex-end"} columnGap={1}>
                <LoadingButton
                  loading={addressStatus === "pending"}
                  type="submit"
                  variant="contained"
                >
                  Add Address
                </LoadingButton>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => reset()}
                >
                  Reset
                </Button>
              </Stack>
            </Stack>

            {/* Select Existing Address */}
            <Stack rowGap={3}>
              <Stack>
                <Typography variant="h6">Select Delivery Address</Typography>
                <Typography variant="body2" color={"text.secondary"}>
                  Choose from your saved addresses
                </Typography>
              </Stack>

              <Grid container gap={2} width={is900 ? "auto" : "50rem"}>
                {addresses.map((address, index) => (
                  <FormControl item key={address._id}>
                    <Stack
                      p={2}
                      width={is480 ? "100%" : "20rem"}
                      height={is480 ? "auto" : "15rem"}
                      rowGap={2}
                      component={Paper}
                      elevation={1}
                    >
                      <Stack flexDirection={"row"} alignItems={"center"}>
                        <Radio
                          checked={selectedAddress === address}
                          name="addressRadioGroup"
                          onChange={() => setSelectedAddress(address)}
                        />
                        <Typography>{address.type}</Typography>
                      </Stack>

                      <Stack>
                        <Typography>{address.street}</Typography>
                        <Typography>
                          {address.state}, {address.city}, {address.country},{" "}
                          {address.postalCode}
                        </Typography>
                        <Typography>{address.phoneNumber}</Typography>
                      </Stack>
                    </Stack>
                  </FormControl>
                ))}
              </Grid>
            </Stack>

            {/* Payment Methods for Logged-in Users */}
            <Stack rowGap={3}>
              <Stack>
                <Typography variant="h6">Payment Method</Typography>
                <Typography variant="body2" color={"text.secondary"}>
                  Please select a payment method
                </Typography>
              </Stack>

              <Stack rowGap={2}>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <Radio
                    value={selectedPaymentMethod}
                    name="paymentMethod"
                    checked={selectedPaymentMethod === "COD"}
                    onChange={() => setSelectedPaymentMethod("COD")}
                  />
                  <Typography>Cash on Delivery</Typography>
                </Stack>

                <Stack flexDirection={"row"} alignItems={"center"}>
                  <Radio
                    value={selectedPaymentMethod}
                    name="paymentMethod"
                    checked={selectedPaymentMethod === "CARD"}
                    onChange={() => setSelectedPaymentMethod("CARD")}
                  />
                  <Typography>Card Payment</Typography>
                </Stack>
              </Stack>
            </Stack>
          </>
        )}
      </Stack>

      {/* Right Box - Order Summary */}
      <Stack
        width={is900 ? "100%" : "auto"}
        alignItems={is900 ? "flex-start" : ""}
      >
        <Typography variant="h4" mb={2}>
          Order Summary
        </Typography>
        <Cart checkout={true} />

        {/* Place Order Button - Only for Logged-in Users */}
        {loggedInUser && (
          <LoadingButton
            fullWidth
            loading={orderStatus === "pending"}
            variant="contained"
            onClick={handleCreateOrder}
            size="large"
            disabled={!selectedAddress}
          >
            Place Order
          </LoadingButton>
        )}
      </Stack>
    </Stack>
  );
};
