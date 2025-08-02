import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

// Animation for the logo
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        gap: 3,
      }}
    >
      {/* Logo with animation */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="https://www.alumardental.com/public/assets/images/alumar.jpg"
          alt="Multi Dental Supply"
          sx={{
            width: 120,
            height: 120,
            borderRadius: 2,
            objectFit: "contain",
            backgroundColor: "white",
            padding: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback for broken image */}
        <Box
          sx={{
            display: 'none',
            width: 120,
            height: 120,
            borderRadius: 2,
            backgroundColor: '#1976d2',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            animation: `${pulse} 2s ease-in-out infinite`,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            MDS
          </Typography>
          <Typography variant="caption">
            Dental Supply
          </Typography>
        </Box>
      </Box>

      {/* Loading spinner */}
      <CircularProgress 
        size={40} 
        thickness={4}
        sx={{ color: '#1976d2' }}
      />
      
      {/* Loading text */}
      <Typography 
        variant="h6" 
        color="text.secondary"
        sx={{ fontWeight: 300 }}
      >
        Loading Multi Dental Supply...
      </Typography>
    </Box>
  );
};

export default Loader;
