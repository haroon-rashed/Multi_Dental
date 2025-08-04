import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Stack, Fade } from "@mui/material";

export const VideoHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
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
      {/* Background Video */}
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portrait"
        preload="metadata"
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
          // Mobile optimizations
          "@media (max-width: 768px)": {
            objectPosition: "center center",
            // Force hardware acceleration
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            // Ensure video stays visible
            display: "block",
            visibility: "visible",
            opacity: 1,
            // Hide video controls
            "&::-webkit-media-controls": {
              display: "none !important",
            },
            "&::-webkit-media-controls-start-playback-button": {
              display: "none !important",
              WebkitAppearance: "none",
            },
            "&::-webkit-media-controls-play-button": {
              display: "none !important",
              WebkitAppearance: "none",
            },
            "&::-webkit-media-controls-panel": {
              display: "none !important",
            },
          },
          // Additional browser compatibility
          "&::-moz-media-controls": {
            display: "none !important",
          },
          "&::-ms-media-controls": {
            display: "none !important",
          },
        }}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source
          src="https://demo.awaikenthemes.com/assets/videos/primecare-video-2.mp4"
          type="video/mp4"
        />
        {/* Enhanced fallback */}
        <Box
          component="img"
          src="/path-to-fallback-image.jpg"
          alt="Dental care background"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
      </Box>

      {/* Lighter Overlay for Better Video Visibility */}
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
          alignItems: "center"
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
                  xs: "1.8rem", // Reduced for better mobile display
                  sm: "2.2rem", // Small tablets
                  md: "3.2rem", // Medium screens
                  lg: "3.8rem", // Large screens
                  xl: "4.3rem", // Extra large
                },
                fontWeight: { xs: 700, sm: 600, md: 600 },
                lineHeight: { xs: 1.1, sm: 1.2, md: 1.3 }, // Tighter line height for mobile
                textShadow: `
                  0 2px 4px rgba(0,0,0,0.9),
                  0 4px 8px rgba(0,0,0,0.7),
                  0 8px 16px rgba(0,0,0,0.5)
                `,
                maxWidth: { xs: "95%", sm: "90%", md: "900px" },
                mx: "auto",
                mb: { xs: 2, sm: 3, md: 4 }, // Adjusted mobile margin
                px: { xs: 2, sm: 0 }, // Add horizontal padding on mobile
                fontFamily: "'Poppins', sans-serif",
                position: "relative",
                zIndex: 2, // Ensure text stays above overlay
                color: "#ffffff", // Pure white text
                // Animation for text reveal
                transform: isLoaded ? "translateY(0px)" : "translateY(30px)",
                opacity: isLoaded ? 1 : 0,
                transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              Exceptional Dental Care for Every Stage of Your Journey
            </Typography>

            {/* Subtitle with Larger Mobile Font */}
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontSize: {
                  xs: "1.1rem", // Mobile: Increased from 0.9rem to 1.1rem
                  sm: "1.25rem", // Small tablets: Increased
                  md: "1.4rem", // Medium screens: Increased
                  lg: "1.5rem", // Large screens
                },
                fontWeight: { xs: 400, sm: 300, md: 300 },
                lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 }, // Better line height for readability
                textShadow: `
                  0 1px 2px rgba(0,0,0,0.9),
                  0 2px 4px rgba(0,0,0,0.7)
                `,
                maxWidth: { xs: "90%", sm: "85%", md: "700px" },
                mx: "auto",
                fontFamily: "'Poppins', sans-serif",
                color: "#ffffff", // Pure white text
                letterSpacing: { xs: "0.3px", sm: "0.5px", md: "1px" },
                // Animation delay for subtitle
                transform: isLoaded ? "translateY(0px)" : "translateY(30px)",
                opacity: isLoaded ? 1 : 0,
                transition:
                  "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s",
              }}
            >
              We are committed to providing top-notch dental care in a
              comfortable and friendly environment that makes every visit a
              pleasant experience.
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
