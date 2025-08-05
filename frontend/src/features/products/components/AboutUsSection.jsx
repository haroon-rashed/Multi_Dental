import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const AboutUsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        p: { xs: 2, md: 8 },
        bgcolor: "#f6f8fb",
        color: "#1a1a1a",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Top Heading */}
      <Typography
        variant="h3"
        fontWeight="bold"
        textAlign="center"
        mb={3}
        sx={{
          color: "#0a2540",
        }}
      >
        About Us
      </Typography>

      <Grid container spacing={6} alignItems="center">
        {/* Left Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              "&:hover::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-75%",
                width: "50%",
                height: "100%",
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.1) 100%)",
                transform: "skewX(-25deg)",
                animation: "shine 1s ease-in-out",
              },
              "@keyframes shine": {
                "100%": {
                  left: "125%",
                },
              },
            }}
          >
            <Box
              component="img"
              src="https://html.awaikenthemes.com/primecare/demo-2/images/about-us-image.jpg"
              alt="Dental Store"
              sx={{ width: "100%", height: "auto", borderRadius: 4 }}
            />

            {/* Happy Customers Box */}
            <Paper
              elevation={4}
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                px: 3,
                py: 2,
                borderRadius: 3,
                backdropFilter: "blur(12px)",
                backgroundColor: "rgba(0,0,0,0.3)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <EmojiEmotionsIcon sx={{ fontSize: 28 }} />
              <Typography variant="h6" fontWeight="bold">
                10,000+
              </Typography>
              <Typography variant="body2">Happy Customers</Typography>
            </Paper>
          </Box>
        </Grid>

        {/* Right Content */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            color="primary"
            fontWeight="600"
            mb={1}
            sx={{ color: "#0072ce" }}
          >
            About Us
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#0a2540" }}
          >
            Empowering Dental Professionals <br />
            Through Quality Products
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 600 }}
          >
            Our dental store is committed to delivering top-tier dental supplies
            to clinics, professionals, and individuals across Pakistan. From
            premium instruments to daily care items, we bring you everything you
            need for a healthy, confident smile.
          </Typography>

          <Stack spacing={2}>
            {[
              "Wide Range of Dental Products",
              "Expert Support & Product Guidance",
              "Certified & Trusted Brands",
              "Fast & Safe Nationwide Delivery",
            ].map((item, index) => (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                key={index}
              >
                <CheckCircleIcon sx={{ color: "#0072ce" }} />
                <Typography fontWeight="600">{item}</Typography>
              </Stack>
            ))}
          </Stack>

          <Stack direction="row" spacing={4} mt={0} alignItems="center">
            <Button
              variant="contained"
              sx={{
                borderRadius: "50px",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                bgcolor: "#0072ce",
                "&:hover": { bgcolor: "#005fa3" },
              }}
            >
              Shop Now →
            </Button>

            <Box
              sx={{
                bgcolor: "#04375a",
                color: "white",
                px: 4,
                py: 3,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <PeopleAltIcon sx={{ fontSize: 28 }} />
              <Typography variant="h5" fontWeight="bold">
                5+ Years
              </Typography>
              <Typography variant="body2">
                Serving the Dental Industry
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUsSection;
