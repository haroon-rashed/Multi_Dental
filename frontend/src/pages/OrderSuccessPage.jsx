import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Alert,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  resetCurrentOrder,
  selectCurrentOrder,
} from "../features/order/OrderSlice";
import { selectUserInfo } from "../features/user/UserSlice";
import { selectLoggedInUser } from "../features/auth/AuthSlice";
import { orderSuccessAnimation } from "../assets";
import Lottie from "lottie-react";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentOrder = useSelector(selectCurrentOrder);
  const userDetails = useSelector(selectUserInfo);
  const loggedInUser = useSelector(selectLoggedInUser);
  const { id } = useParams();

  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  // Check if this was a guest order with credentials
  const isGuestOrderWithCredentials =
    currentOrder?.credentials && !loggedInUser;

  useEffect(() => {
    if (!currentOrder) {
      navigate("/");
    }
  }, [currentOrder, navigate]);

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        component={Paper}
        boxShadow={is480 ? "none" : ""}
        rowGap={3}
        elevation={1}
        p={is480 ? 1 : 4}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box width={"10rem"} height={"7rem"}>
          <Lottie animationData={orderSuccessAnimation}></Lottie>
        </Box>

        <Stack
          mt={2}
          textAlign={"center"}
          justifyContent={"center"}
          alignItems={"center"}
          rowGap={1}
        >
          <Typography variant="h6" fontWeight={400}>
            Hey {userDetails?.name || currentOrder?.user?.name || "Customer"}
          </Typography>
          <Typography variant="h5">
            Your Order #{currentOrder?._id} is confirmed
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Thank you for shopping with us❤️
          </Typography>
        </Stack>

        {/* Show login credentials message for guest users */}
        {isGuestOrderWithCredentials && (
          <Alert
            severity="info"
            icon={<EmailIcon />}
            sx={{
              width: "100%",
              maxWidth: "500px",
              textAlign: "left",
            }}
          >
            <Typography variant="body2" gutterBottom>
              <strong>📧 Your Login Credentials Sent to Your Email!</strong>
            </Typography>
            <Typography variant="body2">
              We've created an account for you and sent your login credentials
              to your email address. Check your email to login to your account
              and track your order.
            </Typography>
          </Alert>
        )}

        {/* Show different message for logged-in users */}
        {loggedInUser && (
          <Alert
            severity="success"
            sx={{
              width: "100%",
              maxWidth: "500px",
              textAlign: "left",
            }}
          >
            <Typography variant="body2">
              <strong>Order confirmation sent!</strong> Check your email for
              order details and tracking information.
            </Typography>
          </Alert>
        )}

        <Button
          component={Link}
          to={loggedInUser ? "/orders" : "/"}
          onClick={() => dispatch(resetCurrentOrder())}
          size={is480 ? "small" : ""}
          variant="contained"
        >
          {loggedInUser
            ? "Check order status in my orders"
            : "Continue Shopping"}
        </Button>
      </Stack>
    </Stack>
  );
};
