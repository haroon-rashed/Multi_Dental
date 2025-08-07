import {
  Box,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { motion, AnimatePresence } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(null);

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

  const handleNewsletterSubmit = () => {
    if (email) {
      console.log("Newsletter subscription:", email);
      setEmail("");
      // Add your newsletter logic here
    }
  };

  const socialMediaData = [
    {
      icon: FacebookIcon,
      platform: "https://web.facebook.com/multidentals",
      color: "#1877F2",
      hoverColor: "#166fe5",
    },
    {
      icon: TwitterIcon,
      platform: "twitter",
      color: "#1DA1F2",
      hoverColor: "#1a94da",
    },
    {
      icon: YouTubeIcon,
      platform: "youtube",
      color: "#FF0000",
      hoverColor: "#e60000",
    },
    {
      icon: LinkedInIcon,
      platform: "linkedin",
      color: "#0A66C2",
      hoverColor: "#0958a5",
    },
  ];

  const contactData = [
    {
      icon: LocationOnIcon,
      text: "Near Nishtar Institute of Dentistry, District Jail Road Multan",
      color: "#4FC3F7",
    },
    {
      icon: PhoneIcon,
      text: "+923006377821, +923057591775",
      color: "#81C784",
    },
    {
      icon: EmailIcon,
      text: "multidental@yaho.com",
      color: "#FFB74D",
    },
    {
      icon: AccessTimeIcon,
      text: "Monday-Saturday: 9:00 AM - 6:00 PM",
      color: "#F06292",
    },
  ];

  const usefulLinks = [
    { text: "About Us", path: "/about-us" },
    { text: "Privacy Policy", path: "/privacy-policy" },
    { text: "Terms & Service", path: "/terms-conditions" },
    { text: "Return Policy", path: "/return-policy" },
  ];

  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        background: `
          linear-gradient(135deg, 
            #0F172A 0%, 
            #1E293B 25%, 
            #334155 50%, 
            #475569 75%, 
            #64748B 100%
          )
        `,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={4} sx={{ py: 6 }}>
          {/* Main Footer Content */}
          <Grid container spacing={4}>
            {/* Get In Touch Section */}
            <Grid item xs={12} md={6} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "white",
                        mb: 1,
                        background:
                          "linear-gradient(135deg, #60A5FA 0%, #34D399 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Get In Touch
                    </Typography>
                    <Box
                      sx={{
                        width: "60px",
                        height: "4px",
                        background:
                          "linear-gradient(135deg, #3B82F6 0%, #10B981 100%)",
                        borderRadius: 2,
                      }}
                    />
                  </Box>

                  <Stack spacing={2.5}>
                    {contactData.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{
                            alignItems: "flex-start",
                            cursor: "pointer",
                            p: 1.5,
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              transform: "translateX(5px)",
                            },
                          }}
                        >
                          <item.icon
                            sx={{
                              color: item.color,
                              fontSize: 20,
                              mt: 0.2,
                              filter:
                                "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))",
                            }}
                          />
                          <Typography
                            sx={{
                              color: "rgba(255, 255, 255, 0.9)",
                              fontSize: "0.95rem",
                              lineHeight: 1.5,
                              fontWeight: 400,
                            }}
                          >
                            {item.text}
                          </Typography>
                        </Stack>
                      </motion.div>
                    ))}
                  </Stack>

                  {/* Social Media Icons */}
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        mb: 2,
                        fontWeight: 600,
                        fontSize: "1.1rem",
                      }}
                    >
                      Follow Us
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      {socialMediaData.map((social, index) => (
                        <motion.div
                          key={social.platform}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{
                            scale: 1.1,
                            rotate: [0, -10, 10, -5, 0],
                            transition: { duration: 0.5 },
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <IconButton
                            onClick={() =>
                              handleSocialMediaClick(social.platform)
                            }
                            onMouseEnter={() => setIsHovered(social.platform)}
                            onMouseLeave={() => setIsHovered(null)}
                            sx={{
                              width: 50,
                              height: 50,
                              backgroundColor:
                                isHovered === social.platform
                                  ? social.color
                                  : "rgba(255, 255, 255, 0.1)",
                              color:
                                isHovered === social.platform
                                  ? "white"
                                  : social.color,
                              border: `2px solid ${social.color}`,
                              backdropFilter: "blur(10px)",
                              transition:
                                "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              "&:hover": {
                                backgroundColor: social.color,
                                color: "white",
                                boxShadow: `0 8px 25px ${social.color}40`,
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            <social.icon sx={{ fontSize: 24 }} />
                          </IconButton>
                        </motion.div>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </motion.div>
            </Grid>

            {/* Useful Links Section */}
            <Grid item xs={12} md={6} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "white",
                        mb: 1,
                        background:
                          "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Useful Links
                    </Typography>
                    <Box
                      sx={{
                        width: "60px",
                        height: "4px",
                        background:
                          "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
                        borderRadius: 2,
                      }}
                    />
                  </Box>

                  <Stack spacing={1.5}>
                    {usefulLinks.map((link, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 10 }}
                      >
                        <Typography
                          onClick={() => window.open(link.path, "_self")}
                          sx={{
                            color: "rgba(255, 255, 255, 0.8)",
                            cursor: "pointer",
                            fontSize: "1rem",
                            fontWeight: 400,
                            p: 1.5,
                            borderRadius: 2,
                            position: "relative",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              color: "#60A5FA",
                              backgroundColor: "rgba(96, 165, 250, 0.1)",
                              "&::before": {
                                width: "100%",
                              },
                            },
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              width: "0%",
                              height: "2px",
                              background:
                                "linear-gradient(135deg, #60A5FA 0%, #34D399 100%)",
                              transition: "width 0.3s ease",
                            },
                          }}
                        >
                          {link.text}
                        </Typography>
                      </motion.div>
                    ))}
                  </Stack>
                </Stack>
              </motion.div>
            </Grid>

            {/* Newsletter Section */}
            <Grid item xs={12} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "white",
                        mb: 1,
                        background:
                          "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Newsletter
                    </Typography>
                    <Box
                      sx={{
                        width: "60px",
                        height: "4px",
                        background:
                          "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
                        borderRadius: 2,
                      }}
                    />
                  </Box>

                  <Stack spacing={2.5}>
                    <Box
                      sx={{
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: -2,
                          left: -2,
                          right: -2,
                          bottom: -2,
                          background:
                            "linear-gradient(135deg, #3B82F6, #10B981, #8B5CF6)",
                          borderRadius: 2,
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        },
                        "&:hover::before": {
                          opacity: 1,
                        },
                      }}
                    >
                      <TextField
                        placeholder="Enter your email address"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                          position: "relative",
                          zIndex: 1,
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          borderRadius: 2,
                          backdropFilter: "blur(10px)",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "& fieldset": {
                              borderColor: "transparent",
                            },
                            "&:hover fieldset": {
                              borderColor: "#3B82F6",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#3B82F6",
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <SendIcon sx={{ color: "#6B7280", mr: 1 }} />
                          ),
                        }}
                      />
                    </Box>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handleNewsletterSubmit}
                        sx={{
                          background:
                            "linear-gradient(135deg, #3B82F6 0%, #10B981 100%)",
                          color: "white",
                          py: 1.5,
                          fontSize: "1rem",
                          fontWeight: 600,
                          borderRadius: 2,
                          textTransform: "none",
                          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #2563EB 0%, #059669 100%)",
                            boxShadow: "0 12px 35px rgba(59, 130, 246, 0.4)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        Subscribe Now
                      </Button>
                    </motion.div>

                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: "rgba(255, 255, 255, 0.7)",
                        lineHeight: 1.6,
                        textAlign: "center",
                      }}
                    >
                      Subscribe to our newsletter to receive early discount
                      offers, latest dental care tips, and exclusive promotions.
                    </Typography>
                  </Stack>
                </Stack>
              </motion.div>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider
            sx={{
              borderColor: "rgba(255, 255, 255, 0.1)",
              my: 2,
            }}
          />

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Stack
              direction={isMobile ? "column" : "row"}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Typography
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.9rem",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                © 2025 Multi Dental Supply. All rights reserved. | Crafted with
                💙 for better smiles
              </Typography>

              {/* Scroll to Top Button */}
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: -5,
                }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  onClick={handleScrollToTop}
                  sx={{
                    width: 50,
                    height: 50,
                    background:
                      "linear-gradient(135deg, #3B82F6 0%, #10B981 100%)",
                    color: "white",
                    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #2563EB 0%, #059669 100%)",
                      boxShadow: "0 12px 35px rgba(59, 130, 246, 0.4)",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <KeyboardArrowUpIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </motion.div>
            </Stack>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
};
