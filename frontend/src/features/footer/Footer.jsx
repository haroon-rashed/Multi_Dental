import {
  Box,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { Stack } from "@mui/material";
import React from "react";
import {
  QRCodePng,
  appStorePng,
  googlePlayPng,
  facebookPng,
  instagramPng,
  twitterPng,
  linkedinPng,
} from "../../assets";
import SendIcon from "@mui/icons-material/Send";
import { MotionConfig, motion } from "framer-motion";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const Footer = () => {
  const theme = useTheme();
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is600 = useMediaQuery(theme.breakpoints.down(600));

  const labelStyles = {
    fontWeight: 300,
    cursor: "pointer",
    color: "white",
    "&:hover": {
      color: "#1976d2",
    },
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSocialMediaClick = (platform) => {
    const socialLinks = {
      facebook: "https://www.facebook.com/alumardental",
      twitter: "https://twitter.com/alumardental",
      youtube: "https://www.youtube.com/@alumardental",
      linkedin: "https://www.linkedin.com/company/alumardental",
    };
    window.open(socialLinks[platform], "_blank");
  };

  return (
    <Stack
      id="footer"
      sx={{
        backgroundColor: "black",
        paddingTop: "3rem",
        paddingLeft: is700 ? "1rem" : "3rem",
        paddingRight: is700 ? "1rem" : "3rem",
        paddingBottom: "1.5rem",
        rowGap: "3rem",
        color: "white",
        position: "relative",
      }}
    >
      {/* Main Footer Content */}
      <Stack
        flexDirection={is600 ? "column" : "row"}
        rowGap={"2rem"}
        columnGap={"2rem"}
        justifyContent={"space-between"}
        alignItems={is600 ? "flex-start" : "flex-start"}
      >
        {/* Get In Touch Section */}
        <Stack spacing={2} sx={{ minWidth: is600 ? "100%" : "300px" }}>
          <Stack spacing={1}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Get In Touch
            </Typography>
            <Box
              sx={{ width: "50px", height: "3px", backgroundColor: "#1976d2" }}
            />
          </Stack>

          <Stack spacing={1.5}>
            <Typography sx={labelStyles}>
              Near Nishtar Institute of Dentistry, District Jail Road Multan
            </Typography>
            <Typography sx={labelStyles}>+92614506162, +92614506052</Typography>
            <Typography sx={labelStyles}>info@alumardental.com</Typography>
            <Typography sx={labelStyles}>
              Monday-Saturday: 9:00 AM - 6:00 PM
            </Typography>
          </Stack>

          {/* Social Media Icons */}
          <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={() => handleSocialMediaClick("facebook")}
                sx={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  "&:hover": { backgroundColor: "#c0392b" },
                }}
              >
                <FacebookIcon />
              </IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={() => handleSocialMediaClick("twitter")}
                sx={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  "&:hover": { backgroundColor: "#c0392b" },
                }}
              >
                <TwitterIcon />
              </IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={() => handleSocialMediaClick("youtube")}
                sx={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  "&:hover": { backgroundColor: "#c0392b" },
                }}
              >
                <YouTubeIcon />
              </IconButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={() => handleSocialMediaClick("linkedin")}
                sx={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  "&:hover": { backgroundColor: "#c0392b" },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </motion.div>
          </Stack>
        </Stack>

        {/* Useful Links Section */}
        <Stack spacing={2} sx={{ minWidth: is600 ? "100%" : "250px" }}>
          <Stack spacing={1}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Usefull Links
            </Typography>
            <Box
              sx={{ width: "50px", height: "3px", backgroundColor: "#1976d2" }}
            />
          </Stack>

          <Stack spacing={1}>
            <Typography
              sx={labelStyles}
              onClick={() => window.open("/about-us", "_self")}
            >
              About Us
            </Typography>
            <Typography
              sx={labelStyles}
              onClick={() => window.open("/privacy-policy", "_self")}
            >
              Privacy Policy
            </Typography>
            <Typography
              sx={labelStyles}
              onClick={() => window.open("/terms-conditions", "_self")}
            >
              Terms & Service
            </Typography>
            <Typography
              sx={labelStyles}
              onClick={() => window.open("/return-policy", "_self")}
            >
              Return Policy
            </Typography>
          </Stack>
        </Stack>

        {/* Newsletter Section */}
        <Stack spacing={2} sx={{ minWidth: is600 ? "100%" : "300px" }}>
          <Stack spacing={1}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Newsletter
            </Typography>
            <Box
              sx={{ width: "50px", height: "3px", backgroundColor: "#1976d2" }}
            />
          </Stack>

          <Stack spacing={2}>
            <TextField
              placeholder="Your e-mail"
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "white",
                borderRadius: "4px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <Box sx={{ marginRight: 1, color: "gray" }}>
                    <SendIcon />
                  </Box>
                ),
              }}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Subscribe
            </Button>

            <Typography
              sx={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}
            >
              Subscribe to our Newsletter to receive early discount offers,
              latest news, sales and promo information.
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* Bottom Section */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "1rem",
        }}
      >
        <Typography
          sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem" }}
        >
          Multi Dental Supply © All rights reserved.
        </Typography>

        {/* Scroll to Top Button */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton
            onClick={handleScrollToTop}
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </motion.div>
      </Stack>
    </Stack>
  );
};
