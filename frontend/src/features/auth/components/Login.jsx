import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DentalAnimation from '../../../components/DentalAnimation';
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import {
  selectLoggedInUser,
  loginAsync,
  selectLoginStatus,
  selectLoginError,
  clearLoginError,
  resetLoginStatus,
} from "../AuthSlice";
import { toast } from "react-toastify";
import { MotionConfig, motion } from "framer-motion";

export const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handles user redirection
  useEffect(() => {
    if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/");
    } else if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    }
  }, [loggedInUser]);

  // handles login error and toast them
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  // handles login status and dispatches reset actions to relevant states in cleanup
  useEffect(() => {
    if (status === "fullfilled" && loggedInUser?.isVerified === true) {
      toast.success(`Login successful`);
      reset();
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status]);

  const handleLogin = async (data) => {
    try {
      console.log('Login form submitted with data:', data);
      const cred = { ...data };
      delete cred.confirmPassword;
      
      console.log('Dispatching loginAsync with credentials:', cred);
      const result = await dispatch(loginAsync(cred));
      
      console.log('Login result:', result);
      
      if (result.error) {
        console.error('Login failed with error:', result.error);
        toast.error(result.error.message || 'Login failed');
      } else if (result.payload) {
        console.log('Login successful, payload:', result.payload);
        // Redirection is handled in the useEffect that watches loggedInUser
        toast.success('Login successful!');
      } else {
        console.error('Unexpected login result format:', result);
        toast.error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Login error caught in try-catch:', error);
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        response: error.response?.data
      });
      toast.error(error.response?.data?.message || 'An unexpected error occurred during login');
    }
  };

  return (
    <Stack
      minHeight="100vh"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ overflow: 'hidden' }}
    >
      {/* Animation Section - Hidden on mobile */}
      <Stack 
        flex={1} 
        justifyContent="center"
        alignItems="center"
        sx={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          p: 4,
          display: { xs: 'none', md: 'flex' },
          minHeight: '100vh',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            width: '100%', 
            maxWidth: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <DentalAnimation />
          <Typography 
            variant="h5" 
            sx={{ 
              mt: 2,
              fontWeight: 600,
              color: '#00A8CC',
              textAlign: 'center'
            }}
          >
            Welcome to Multi Dental Supply
          </Typography>
        </Box>
      </Stack>

      {/* Login Form Section */}
      <Stack 
        flex={1} 
        justifyContent="center" 
        alignItems="center" 
        p={{ xs: 3, md: 4 }}
        sx={{
          bgcolor: 'background.paper',
          position: 'relative',
          minHeight: { xs: 'auto', md: '100vh' }
        }}
      >
        <Box sx={{ maxWidth: 420, width: '100%' }}>
          {/* Mobile Title */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                background: 'linear-gradient(45deg, #1976d2, #00bcd4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.8rem', sm: '2.2rem' }
              }}
            >
              MULTI DENTAL SUPPLY
            </Typography>
            <Divider sx={{ 
              width: '80%', 
              height: 4,
              background: 'linear-gradient(90deg, #1976d2, #00bcd4)',
              mx: 'auto',
              mb: 3,
              borderRadius: 2
            }} />
          </Box>
          
          {/* Desktop Welcome */}
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.8rem" },
              mb: 3,
              textAlign: { xs: 'center', md: 'left' },
              display: { xs: 'none', md: 'block' }
            }}
          >
            Welcome Back
          </Typography>
          
          {/* Form Content */}
          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack spacing={3}>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                textAlign="center"
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                Sign in to access your account
              </Typography>
              
              <motion.div whileHover={{ y: -5 }}>
                <TextField
                  fullWidth
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                      message: "Enter a valid email",
                    },
                  })}
                  placeholder="Email"
                />
                {errors.email && (
                  <FormHelperText sx={{ mt: 1 }} error>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </motion.div>

              <motion.div whileHover={{ y: -5 }}>
                <TextField
                  type="password"
                  fullWidth
                  {...register("password", { required: "Password is required" })}
                  placeholder="Password"
                />
                {errors.password && (
                  <FormHelperText sx={{ mt: 1 }} error>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
                <LoadingButton
                  fullWidth
                  sx={{ 
                    height: "2.5rem",
                    backgroundColor: "#00A8CC",
                    '&:hover': {
                      backgroundColor: "#0088AA", // Slightly darker on hover
                    }
                  }}
                  loading={status === "pending"}
                  type="submit"
                  variant="contained"
                >
                  Login
                </LoadingButton>
              </motion.div>

              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3}>
                <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                  <Typography 
                    variant="body2" 
                    color="primary"
                    sx={{ '&:hover': { textDecoration: 'underline' } }}
                  >
                    Forgot Password?
                  </Typography>
                </Link>
                
                <Stack direction="row" spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    New user?
                  </Typography>
                  <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <Typography 
                      variant="body2" 
                      color="primary"
                      fontWeight={600}
                      sx={{ '&:hover': { textDecoration: 'underline' } }}
                    >
                      Sign Up
                    </Typography>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Stack>
  );
};
