import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Stack, Fade } from "@mui/material";

export const VideoHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/hero1.jpg", // Replace with your actual image name in public folder
      title: "Your Trusted Source for Quality Dental Supplies",
      subtitle:
        "We provide reliable, dentist-approved products that make it easy to care for your smile—delivered straight to your door with comfort, convenience, and care.",
    },
    {
      image: "/hero2.jpg", // Replace with your actual image name in public folder
      title: "Discover Premium Dental Care Essentials",
      subtitle:
        "Explore our curated selection of high-quality dental products designed for professional results and everyday use.",
    },
    {
      image: "/hero3.jpg", // Replace with your actual image name in public folder
      title: "Achieve a Brighter, Healthier Smile Today",
      subtitle:
        "Shop top-rated dental supplies with fast shipping, exclusive deals, and expert support for all your oral care needs.",
    },
  ];

  useEffect(() => {
    // Initial load timer as fallback
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoaded(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 500); // Time for fade out before changing slide
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: { xs: "400px", sm: "500px" },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={slides[currentSlide].image}
        alt={`Dental care slide ${currentSlide + 1}`}
        onLoad={() => setIsLoaded(true)}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          minHeight: { xs: "400px", sm: "500px" },
          objectFit: "cover",
          objectPosition: "center",
          zIndex: -2,
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          // Mobile optimizations
          "@media (max-width: 768px)": {
            objectPosition: "center center",
            // Force hardware acceleration
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            // Ensure image stays visible
            display: "block",
            visibility: "visible",
          },
        }}
      />

      {/* Lighter Overlay for Better Image Visibility */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          background: `
            linear-gradient(135deg, 
              rgba(26, 35, 126, 0.25) 0%, 
              rgba(13, 71, 161, 0.20) 25%, 
              rgba(25, 118, 210, 0.15) 50%, 
              rgba(30, 136, 229, 0.10) 75%, 
              rgba(33, 150, 243, 0.05) 100%
            ),
            linear-gradient(45deg, 
              rgba(0, 0, 0, 0.3) 0%, 
              rgba(0, 0, 0, 0.1) 100%
            )
          `,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              linear-gradient(180deg, 
                rgba(0, 0, 0, 0.2) 0%, 
                rgba(0, 0, 0, 0.1) 50%, 
                rgba(0, 0, 0, 0.3) 100%
              )
            `,
            zIndex: 1,
          },
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          color: "white",
          padding: { xs: "20px", sm: "30px", md: "40px" },
          margin: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fade in={isLoaded} timeout={1000}>
          <Stack spacing={{ xs: 3, sm: 4, md: 5 }} alignItems="center">
            {/* Main Heading with Larger Mobile Font */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "3.2rem",
                  lg: "3.8rem",
                  xl: "4.3rem",
                },
                fontWeight: { xs: 700, sm: 600, md: 600 },
                lineHeight: { xs: 1.1, sm: 1.2, md: 1.3 },
                textShadow: `
                  0 2px 4px rgba(0,0,0,0.9),
                  0 4px 8px rgba(0,0,0,0.7),
                  0 8px 16px rgba(0,0,0,0.5)
                `,
                maxWidth: { xs: "95%", sm: "90%", md: "900px" },
                mx: "auto",
                mb: { xs: 2, sm: 3, md: 4 },
                px: { xs: 2, sm: 0 },
                fontFamily: "'Poppins', sans-serif",
                position: "relative",
                zIndex: 2,
                color: "#ffffff",
                // Animation for text reveal
                transform: isLoaded ? "translateY(0px)" : "translateY(30px)",
                opacity: isLoaded ? 1 : 0,
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              {slides[currentSlide].title}
            </Typography>

            {/* Subtitle with Larger Mobile Font */}
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.25rem",
                  md: "1.4rem",
                  lg: "1.5rem",
                },
                fontWeight: { xs: 400, sm: 300, md: 300 },
                lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                textShadow: `
                  0 1px 2px rgba(0,0,0,0.9),
                  0 2px 4px rgba(0,0,0,0.7)
                `,
                maxWidth: { xs: "90%", sm: "85%", md: "700px" },
                mx: "auto",
                fontFamily: "'Poppins', sans-serif",
                color: "#ffffff",
                letterSpacing: { xs: "0.3px", sm: "0.5px", md: "1px" },
                // Animation delay for subtitle
                transform: isLoaded ? "translateY(0px)" : "translateY(30px)",
                opacity: isLoaded ? 1 : 0,
                transition:
                  "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s",
              }}
            >
              {slides[currentSlide].subtitle}
            </Typography>

            {/* Call to Action Buttons (Optional) */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 3 },
                mt: { xs: 3, sm: 4, md: 5 },
                transform: isLoaded ? "translateY(0px)" : "translateY(30px)",
                opacity: isLoaded ? 1 : 0,
                transition:
                  "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s",
              }}
            >
              {/* You can add buttons here if needed */}
            </Box>
          </Stack>
        </Fade>
      </Container>

      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: `
            linear-gradient(0deg, 
              rgba(0, 0, 0, 0.3) 0%, 
              transparent 100%
            )
          `,
          zIndex: 5,
        }}
      />

      {/* Top decorative gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: `
            linear-gradient(180deg, 
              rgba(0, 0, 0, 0.2) 0%, 
              transparent 100%
            )
          `,
          zIndex: 5,
        }}
      />
    </Box>
  );
};

export default VideoHero;
