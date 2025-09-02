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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import { SHIPPING, TAXES } from "../../../constants";
import { motion } from "framer-motion";

export const Checkout = () => {
  const addresses = useSelector(selectAddresses);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
  const [showCredentialsDialog, setShowCredentialsDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [guestCredentials, setGuestCredentials] = useState(null);
  const [copiedPassword, setCopiedPassword] = useState(false);

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
    if (currentOrder && currentOrder._id) {
      console.log("Order received:", currentOrder);
      if (!loggedInUser) {
        if (currentOrder.credentials && currentOrder.user?.isNewUser) {
          console.log("Showing credentials dialog for new guest user");
          setGuestCredentials(currentOrder.credentials);
          setShowCredentialsDialog(true);
        } else {
          console.log("Navigating directly for existing user guest checkout");
          navigate(`/order-success/${currentOrder._id}`);
        }
      } else {
        console.log("Processing logged-in user order");
        dispatch(resetCartByUserIdAsync(loggedInUser._id));
        setShowSuccessDialog(true);
      }
    }
  }, [currentOrder, loggedInUser, navigate, dispatch]);

  const handleAddAddress = (data) => {
    const address = { ...data, user: loggedInUser._id };
    dispatch(addAddressAsync(address));
  };

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

  const handleGuestOrderWithUser = (guestData) => {
    const orderData = {
      userInfo: {
        name: guestData.name,
        email: guestData.email,
        createAccount: true,
      },
      orderInfo: {
        item: cartItems,
        address: {
          type: guestData.addressType,
          street: guestData.street,
          city: guestData.city,
          state: guestData.state || "", // Optional
          country: guestData.country || "", // Optional
          postalCode: guestData.postalCode,
          phoneNumber: guestData.phoneNumber,
        },
        paymentMode: selectedPaymentMethod,
        total: orderTotal + SHIPPING + TAXES,
      },
    };
    dispatch(createGuestOrderWithUserAsync(orderData));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedPassword(true);
    setTimeout(() => setCopiedPassword(false), 2000);
  };

  const handleCredentialsDialogClose = () => {
    console.log("Closing credentials dialog and navigating");
    setShowCredentialsDialog(false);
    if (currentOrder && currentOrder._id) {
      navigate(`/order-success/${currentOrder._id}`);
    }
  };

  const handleSuccessDialogClose = () => {
    console.log("Closing success dialog and navigating");
    setShowSuccessDialog(false);
    if (currentOrder && currentOrder._id) {
      navigate(`/order-success/${currentOrder._id}`);
    }
  };

  return (
    <>
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
        <Stack rowGap={4}>
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

          {loggedInUser && (
            <Alert severity="info">
              Welcome back, {loggedInUser.name}! ({loggedInUser.email})
            </Alert>
          )}

          {!loggedInUser && (
            <Stack
              component={"form"}
              noValidate
              rowGap={3}
              onSubmit={handleSubmitGuest(handleGuestOrderWithUser)}
            >
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

              <Alert severity="success" icon={<CheckCircleIcon />}>
                <Typography variant="body2">
                  <strong>Account Creation:</strong> We'll automatically create
                  an account for you and email your login credentials with the
                  order confirmation. 📧
                </Typography>
              </Alert>

              <Divider />

              <Typography variant="h6">Shipping Address</Typography>

              <Stack>
                <Typography gutterBottom>Address Type *</Typography>
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
                  <Typography gutterBottom>State</Typography>
                  <TextField
                    {...registerGuest("state")} // No required validation
                    error={!!guestErrors.state}
                    helperText={guestErrors.state?.message}
                  />
                </Stack>
              </Stack>

              <Stack flexDirection={is480 ? "column" : "row"} gap={2}>
                <Stack width={"100%"}>
                  <Typography gutterBottom>Country</Typography>
                  <TextField
                    {...registerGuest("country")} // No required validation
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

          {loggedInUser && (
            <>
              <Stack
                component={"form"}
                noValidate
                rowGap={2}
                onSubmit={handleSubmit(handleAddAddress)}
              >
                <Typography variant="h6">Add New Address</Typography>

                <Stack>
                  <Typography gutterBottom>Address Type *</Typography>
                  <TextField
                    placeholder="Eg. Home, Office, Business"
                    {...register("type", {
                      required: "Address type is required",
                    })}
                    error={!!errors.type}
                    helperText={errors.type?.message}
                  />
                </Stack>

                <Stack>
                  <Typography gutterBottom>Street Address *</Typography>
                  <TextField
                    {...register("street", {
                      required: "Street address is required",
                    })}
                    error={!!errors.street}
                    helperText={errors.street?.message}
                  />
                </Stack>

                <Stack>
                  <Typography gutterBottom>Country</Typography>
                  <TextField {...register("country")} /> {/* No required */}
                </Stack>

                <Stack>
                  <Typography gutterBottom>Phone Number *</Typography>
                  <TextField
                    type="tel"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[\+]?[0-9\s\-\(\)]{10,15}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                </Stack>

                <Stack flexDirection={"row"} gap={2}>
                  <Stack width={"100%"}>
                    <Typography gutterBottom>City *</Typography>
                    <TextField
                      {...register("city", { required: "City is required" })}
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  </Stack>
                  <Stack width={"100%"}>
                    <Typography gutterBottom>State</Typography>
                    <TextField {...register("state")} /> {/* No required */}
                  </Stack>
                  <Stack width={"100%"}>
                    <Typography gutterBottom>Postal Code *</Typography>
                    <TextField
                      {...register("postalCode", {
                        required: "Postal code is required",
                      })}
                      error={!!errors.postalCode}
                      helperText={errors.postalCode?.message}
                    />
                  </Stack>
                </Stack>

                <Stack
                  flexDirection={"row"}
                  alignSelf={"flex-end"}
                  columnGap={1}
                >
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
                            {address.state ? `${address.state}, ` : ""}
                            {address.city},{" "}
                            {address.country ? `${address.country}, ` : ""}
                            {address.postalCode}
                          </Typography>
                          <Typography>{address.phoneNumber}</Typography>
                        </Stack>
                      </Stack>
                    </FormControl>
                  ))}
                </Grid>
              </Stack>

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

        <Stack
          width={is900 ? "100%" : "auto"}
          alignItems={is900 ? "flex-start" : ""}
        >
          <Typography variant="h4" mb={2}>
            Order Summary
          </Typography>
          <Cart checkout={true} />

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

      <Dialog
        open={showSuccessDialog}
        onClose={handleSuccessDialogClose}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown={false}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CheckCircleIcon color="success" />
            <Typography variant="h5">Order Placed Successfully! 🎉</Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3}>
            <Alert severity="success" icon={<CheckCircleIcon />}>
              <Typography variant="body1" gutterBottom>
                <strong>Thank you, {loggedInUser?.name}!</strong> Your order has
                been placed successfully.
              </Typography>
              <Typography variant="body2">
                We've sent an order confirmation to your email address.
              </Typography>
            </Alert>

            <Paper
              elevation={2}
              sx={{
                p: 3,
                bgcolor: "background.default",
                border: "2px solid",
                borderColor: "success.light",
              }}
            >
              <Typography variant="h6" gutterBottom color="success.main">
                What's Next? 📋
              </Typography>

              <Stack spacing={2}>
                <Typography variant="body2">
                  • Check your email for order confirmation details
                </Typography>
                <Typography variant="body2">
                  • Track your order status in your account
                </Typography>
                <Typography variant="body2">
                  • We'll notify you when your order ships
                </Typography>
                <Typography variant="body2">
                  • Estimated delivery: 3-5 business days
                </Typography>
              </Stack>
            </Paper>

            <Alert severity="info" icon={<EmailIcon />}>
              <Typography variant="body2">
                📧 <strong>Check your email!</strong> Order confirmation and
                tracking details have been sent to {loggedInUser?.email}
              </Typography>
            </Alert>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleSuccessDialogClose}
            variant="contained"
            size="large"
            fullWidth
          >
            View Order Details
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showCredentialsDialog}
        onClose={handleCredentialsDialogClose}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown={false}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CheckCircleIcon color="success" />
            <Typography variant="h5">Order Placed Successfully! 🎉</Typography>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3}>
            <Alert severity="success" icon={<EmailIcon />}>
              <Typography variant="body1" gutterBottom>
                <strong>Congratulations!</strong> Your order has been placed and
                we've created an account for you.
              </Typography>
              <Typography variant="body2">
                Your login credentials have been sent to your email address.
              </Typography>
            </Alert>

            {guestCredentials && (
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  bgcolor: "background.default",
                  border: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                <Typography variant="h6" gutterBottom color="primary">
                  Your Login Credentials:
                </Typography>

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email:
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {guestCredentials.email}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Password:
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        fontFamily="monospace"
                        sx={{
                          bgcolor: "grey.100",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        {guestCredentials.password}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          copyToClipboard(guestCredentials.password)
                        }
                        size="small"
                        color={copiedPassword ? "success" : "default"}
                      >
                        {copiedPassword ? (
                          <CheckCircleIcon />
                        ) : (
                          <ContentCopyIcon />
                        )}
                      </IconButton>
                    </Stack>
                    {copiedPassword && (
                      <Typography variant="caption" color="success.main">
                        Password copied to clipboard!
                      </Typography>
                    )}
                  </Box>
                </Stack>

                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Important:</strong> Please change your password
                    after logging in for security reasons.
                  </Typography>
                </Alert>
              </Paper>
            )}

            <Alert severity="info" icon={<EmailIcon />}>
              <Typography variant="body2">
                📧 <strong>Check your email!</strong> We've sent your login
                credentials and order confirmation to your email address.
              </Typography>
            </Alert>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleCredentialsDialogClose}
            variant="contained"
            size="large"
            fullWidth
          >
            Continue to Order Details
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
