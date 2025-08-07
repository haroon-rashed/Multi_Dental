import {
  Stack,
  TextField,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  FormHelperText,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInUser,
  signupAsync,
  selectSignupStatus,
  selectSignupError,
  clearSignupError,
  resetSignupStatus,
} from "../AuthSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DentalStoreAnimation from "./DentalStoreAnimation";

export const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectSignupStatus);
  const error = useSelector(selectSignupError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // handles user redirection
  useEffect(() => {
    if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    } else if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  // handles signup error and toast them
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === "fullfilled") {
      toast.success(
        "Welcome! Verify your email to start shopping on mern-ecommerce."
      );
      reset();
    }
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [status, reset, dispatch]);

  const handleSignup = (data) => {
    const cred = {
      name: `${data.firstName} ${data.lastName}`, // Combine first and last name
      email: data.email,
      password: data.password,
    };
    dispatch(signupAsync(cred));
  };

  return (
    <Stack
      minHeight="100vh"
      direction={{ xs: "column", md: "row" }}
      sx={{ overflow: "hidden" }}
    >
      {/* Animation Section - Hidden on mobile */}
      <Stack
        flex={1}
        justifyContent="center"
        alignItems="center"
        sx={{
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
          p: 4,
          display: { xs: "none", md: "flex" },
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <DentalStoreAnimation />
          </Box>
          <Typography
            variant="h5"
            sx={{
              mt: 2,
              fontWeight: 600,
              color: "#00A8CC",
              textAlign: "center",
            }}
          >
            Join Multi Dental Supply
          </Typography>
        </Box>
      </Stack>

      {/* Form Section */}
      <Stack
        flex={1}
        justifyContent="center"
        alignItems="center"
        p={{ xs: 3, md: 4 }}
        sx={{
          bgcolor: "background.paper",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #00A8CC 0%, #5FD1F7 100%)",
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
          },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 450 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
                textAlign: "center",
                color: "primary.main",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "1.75rem",
                },
              }}
            >
              Create Account
            </Typography>

            <form onSubmit={handleSubmit(handleSignup)}>
              <Stack spacing={3}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    variant="outlined"
                    size="small"
                  />
                </Stack>

                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  variant="outlined"
                  size="small"
                />

                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  variant="outlined"
                  size="small"
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  variant="outlined"
                  size="small"
                />

                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  disabled={status === "loading"}
                  sx={{ mt: 2, height: 44 }}
                >
                  {status === "loading" ? "Signing Up..." : "Sign Up"}
                </Button>

                <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Login
                  </Link>
                </Typography>
              </Stack>
            </form>
          </motion.div>
        </Box>
      </Stack>
    </Stack>
  );
};
