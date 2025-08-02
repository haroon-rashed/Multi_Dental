import {
  Button,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOtpVerificationError,
  clearResendOtpError,
  clearResendOtpSuccessMessage,
  resendOtpAsync,
  resetOtpVerificationStatus,
  resetResendOtpStatus,
  selectLoggedInUser,
  selectOtpVerificationError,
  selectOtpVerificationStatus,
  selectResendOtpError,
  selectResendOtpStatus,
  selectResendOtpSuccessMessage,
  verifyOtpAsync,
} from "../AuthSlice";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const OtpVerfication = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const resendOtpStatus = useSelector(selectResendOtpStatus);
  const resendOtpError = useSelector(selectResendOtpError);
  const resendOtpSuccessMessage = useSelector(selectResendOtpSuccessMessage);
  const otpVerificationStatus = useSelector(selectOtpVerificationStatus);
  const otpVerificationError = useSelector(selectOtpVerificationError);

  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // handles the redirection
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    } else if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/");
    } else if (loggedInUser && !loggedInUser?.isVerified) {
      // If user just signed up, OTP should already be sent
      // But we'll show the option to resend
      setOtpSent(true);
    }
  }, [loggedInUser, navigate]);

  // Countdown timer for resend button
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendOtp = () => {
    if (!loggedInUser?._id) {
      toast.error("User information not found. Please try logging in again.");
      return;
    }

    const data = { user: loggedInUser._id };
    dispatch(resendOtpAsync(data));
    setCountdown(60); // Start 60-second countdown
  };

  const handleVerifyOtp = (data) => {
    if (!loggedInUser?._id) {
      toast.error("User information not found. Please try logging in again.");
      return;
    }

    const cred = { ...data, userId: loggedInUser._id };
    dispatch(verifyOtpAsync(cred));
  };

  // handles resend otp error
  useEffect(() => {
    if (resendOtpError) {
      toast.error(resendOtpError.message || "Failed to send OTP");
    }
    return () => {
      dispatch(clearResendOtpError());
    };
  }, [resendOtpError, dispatch]);

  // handles resend otp success message
  useEffect(() => {
    if (resendOtpSuccessMessage) {
      toast.success(resendOtpSuccessMessage.message || "OTP sent successfully");
      setOtpSent(true);
    }
    return () => {
      dispatch(clearResendOtpSuccessMessage());
    };
  }, [resendOtpSuccessMessage, dispatch]);

  // handles error while verifying otp
  useEffect(() => {
    if (otpVerificationError) {
      toast.error(otpVerificationError.message || "OTP verification failed");
    }
    return () => {
      dispatch(clearOtpVerificationError());
    };
  }, [otpVerificationError, dispatch]);

  useEffect(() => {
    if (otpVerificationStatus === "fullfilled") {
      toast.success("Email verified! Welcome to MERN Shop!");
      dispatch(resetResendOtpStatus());
    }
    return () => {
      dispatch(resetOtpVerificationStatus());
    };
  }, [otpVerificationStatus, dispatch]);

  // Handle successful resend
  useEffect(() => {
    if (resendOtpStatus === "fullfilled") {
      setOtpSent(true);
      dispatch(resetResendOtpStatus());
    }
  }, [resendOtpStatus, dispatch]);

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      noValidate
      flexDirection={"column"}
      rowGap={3}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        component={Paper}
        elevation={1}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
        p={"2rem"}
        rowGap={"2rem"}
        maxWidth={"400px"}
        width={"90%"}
      >
        <Typography mt={2} variant="h5" fontWeight={500} textAlign="center">
          Verify Your Email Address
        </Typography>

        {otpSent ? (
          <Stack
            width={"100%"}
            rowGap={"1rem"}
            component={"form"}
            noValidate
            onSubmit={handleSubmit(handleVerifyOtp)}
          >
            <Stack rowGap={"1rem"}>
              <Stack>
                <Typography color={"GrayText"} textAlign="center">
                  Enter the 4-digit OTP sent to:
                </Typography>
                <Typography
                  fontWeight={"600"}
                  color={"primary.main"}
                  textAlign="center"
                >
                  {loggedInUser?.email}
                </Typography>
              </Stack>
              <Stack>
                <TextField
                  {...register("otp", {
                    required: "OTP is required",
                    minLength: {
                      value: 4,
                      message: "Please enter a 4-digit OTP",
                    },
                    maxLength: {
                      value: 4,
                      message: "OTP should be 4 digits only",
                    },
                    pattern: {
                      value: /^\d{4}$/,
                      message: "OTP should contain only numbers",
                    },
                  })}
                  fullWidth
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  inputProps={{
                    maxLength: 4,
                    style: {
                      textAlign: "center",
                      fontSize: "1.2rem",
                      letterSpacing: "0.5rem",
                    },
                  }}
                />
                {errors?.otp && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.otp.message}
                  </FormHelperText>
                )}
              </Stack>
            </Stack>

            <LoadingButton
              loading={otpVerificationStatus === "pending"}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              Verify OTP
            </LoadingButton>

            {/* Resend OTP Button */}
            <Stack alignItems="center" spacing={1}>
              <Typography variant="body2" color="GrayText">
                Didn't receive the OTP?
              </Typography>
              <Button
                onClick={handleSendOtp}
                disabled={countdown > 0 || resendOtpStatus === "pending"}
                variant="text"
                size="small"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <>
            <Stack textAlign="center" spacing={2}>
              <Typography color={"GrayText"}>
                We will send you an OTP to verify your email address:
              </Typography>
              <Typography fontWeight={"600"} color={"primary.main"}>
                {loggedInUser?.email}
              </Typography>
              <Typography variant="body2" color="GrayText">
                The OTP will be valid for 5 minutes.
              </Typography>
            </Stack>
            <LoadingButton
              onClick={handleSendOtp}
              loading={resendOtpStatus === "pending"}
              fullWidth
              variant="contained"
              size="large"
            >
              Send OTP
            </LoadingButton>
          </>
        )}

        {/* Back to Login Option */}
        <Stack alignItems="center" spacing={1}>
          <Typography variant="body2" color="GrayText">
            Wrong email address?
          </Typography>
          <Button
            onClick={() => navigate("/login")}
            variant="text"
            size="small"
          >
            Back to Login
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
