import React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";

export const VideoHero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "150vh", // increased height
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: "40px", // only bottom margin
        borderRadius: "",
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
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source
          src="https://demo.awaikenthemes.com/assets/videos/primecare-video-2.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </Box>

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          color: "white",
          px: { xs: 2, sm: 4 },
        }}
      >
        <Stack spacing={4} alignItems="center">
          {/* Heading */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.2rem", sm: "3.5rem", md: "4rem" },
              fontWeight: 600,
              lineHeight: 1.2,
              textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
              maxWidth: "900px",
              mx: "auto",
              mb: 2,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Exceptional dental care for every stage of your journey
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
              fontWeight: 300,
              lineHeight: 1.6,
              textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
              maxWidth: "650px",
              mx: "auto",
              opacity: 0.95,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            We are committed to providing top-notch dental care in a comfortable
            and friendly environment.
          </Typography>
        </Stack>
      </Container>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          opacity: 0.8,
          animation: "bounce 2s infinite",
          "@keyframes bounce": {
            "0%, 20%, 50%, 80%, 100%": {
              transform: "translateX(-50%) translateY(0)",
            },
            "40%": {
              transform: "translateX(-50%) translateY(-10px)",
            },
            "60%": {
              transform: "translateX(-50%) translateY(-5px)",
            },
          },
        }}
      >
        <Typography variant="body2" sx={{ mb: 1, textAlign: "center" }}>
          Scroll Down
        </Typography>
        <Box
          sx={{
            width: "2px",
            height: "30px",
            backgroundColor: "white",
            mx: "auto",
            opacity: 0.6,
          }}
        />
      </Box>
    </Box>
  );
};

export default VideoHero;
