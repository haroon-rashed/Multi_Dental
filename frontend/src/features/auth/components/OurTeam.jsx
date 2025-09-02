import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  useTheme,
} from "@mui/material";

const OurTeam = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 10,
        px: 4,
        background: `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.background.default} 50%, ${theme.palette.grey[100]} 100%)`,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          mb: 8,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 3,
          position: "relative",
          background: `linear-gradient(135deg, #2563eb 0%, #10b981 50%, #8b5cf6 100%)`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "#1f2937", // Fallback color for browsers that don't support gradient text
          textShadow: "0 0 30px rgba(37, 99, 235, 0.3)",
          "&:after": {
            content: '""',
            display: "block",
            width: 120,
            height: 6,
            background: `linear-gradient(135deg, #2563eb 0%, #10b981 50%, #8b5cf6 100%)`,
            position: "absolute",
            bottom: -15,
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: 3,
            boxShadow: `0 6px 20px rgba(37, 99, 235, 0.4)`,
          },
        }}
      >
        Our Leader
      </Typography>

      <Card
        sx={{
          maxWidth: 480,
          borderRadius: 5,
          boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.25)",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-20px) scale(1.03)",
            boxShadow: "0 35px 80px -12px rgba(96, 165, 250, 0.4)",
          },
          overflow: "hidden",
          position: "relative",
          background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, rgba(248, 250, 252, 0.8) 100%)`,
          border: `2px solid rgba(96, 165, 250, 0.1)`,
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Decorative Background */}
        <Box
          sx={{
            height: 160,
            background: `linear-gradient(135deg, 
              #667eea 0%, 
              #764ba2 25%, 
              #f093fb 50%, 
              #f5576c 75%, 
              #4facfe 100%
            )`,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 50,
              background: theme.palette.background.paper,
              clipPath: "ellipse(100% 100% at 50% 100%)",
            },
          }}
        />

        {/* Avatar */}
        <Box
          sx={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: "50%",
              background: `linear-gradient(135deg, 
                #667eea 0%, 
                #764ba2 25%, 
                #f093fb 50%, 
                #f5576c 75%, 
                #4facfe 100%
              )`,
              boxShadow: `0 15px 40px rgba(102, 126, 234, 0.4)`,
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": {
                  boxShadow: "0 15px 40px rgba(102, 126, 234, 0.4)",
                },
                "50%": {
                  boxShadow: "0 20px 60px rgba(102, 126, 234, 0.6)",
                },
                "100%": {
                  boxShadow: "0 15px 40px rgba(102, 126, 234, 0.4)",
                },
              },
            }}
          >
            <Avatar
              src="/shehbaz.jpg"
              sx={{
                width: 140,
                height: 140,
                border: `5px solid ${theme.palette.background.paper}`,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Box>
        </Box>

        <CardContent sx={{ pt: 12, pb: 7, textAlign: "center", px: 5 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={theme.palette.text.primary}
            sx={{
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Muhammad Shehbaz
          </Typography>

          <Box
            sx={{
              display: "inline-block",
              px: 3,
              py: 1.5,
              borderRadius: 25,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
              border: `2px solid ${theme.palette.primary.main}30`,
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="600"
              color={theme.palette.primary.main}
              sx={{ textTransform: "uppercase", letterSpacing: 1 }}
            >
              Management Director
            </Typography>
          </Box>

          {/* Decorative Element */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 5,
                background: `linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f5576c 75%, #4facfe 100%)`,
                borderRadius: 3,
                boxShadow: `0 4px 15px rgba(102, 126, 234, 0.4)`,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OurTeam;
