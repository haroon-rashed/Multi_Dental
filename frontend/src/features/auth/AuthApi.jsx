import { axiosi } from "../../config/axios";

export const signup = async (cred) => {
  try {
    const res = await axiosi.post("auth/signup", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const login = async (cred) => {
  console.log("Making login API call with credentials:", cred);
  try {
    const res = await axiosi.post("auth/login", cred);
    console.log("Login API response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Login API error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });

    // Return a more detailed error object
    const errorInfo = {
      message: error.response?.data?.message || "Login failed",
      status: error.response?.status,
      data: error.response?.data,
      originalError: error,
    };

    throw errorInfo;
  }
};
export const verifyOtp = async (cred) => {
  try {
    const res = await axiosi.post("auth/verify-otp", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const resendOtp = async (cred) => {
  try {
    const res = await axiosi.post("auth/resend-otp", cred);
    console.log("resend otp res", res.data);
    debugger;
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const forgotPassword = async (cred) => {
  try {
    const res = await axiosi.post("auth/forgot-password", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const resetPassword = async (cred) => {
  try {
    const res = await axiosi.post("auth/reset-password", cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const checkAuth = async (cred) => {
  try {
    const res = await axiosi.get("auth/check-auth");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const logout = async () => {
  try {
    const res = await axiosi.get("auth/logout");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axiosi.get("auth/get-all-users");
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch users" };
  }
};
