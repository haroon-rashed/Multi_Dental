import React, { useState, useEffect } from "react";
import { Box, Typography, styled, keyframes } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Styled components with Material UI
const AnimationContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  minHeight: "600px",
}));

// Keyframe animations
const toothFloat = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  25% { transform: translateY(-10px) rotate(5deg) scale(1.1); }
  75% { transform: translateY(5px) rotate(-5deg) scale(0.95); }
`;

const sparkleFloat = keyframes`
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
`;

const iconBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const rotateTools = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const toolPulse = keyframes`
  0%, 100% { 
    transform: scale(1); 
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); 
  }
  50% { 
    transform: scale(1.2); 
    box-shadow: 0 12px 35px rgba(0, 168, 204, 0.3); 
  }
`;

const orbit = keyframes`
  from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.2); }
`;

const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

// Styled tooth component
const ToothSvg = styled("svg")(({ theme }) => ({
  animation: `${toothFloat} 3s ease-in-out infinite`,
  filter: "drop-shadow(0 10px 20px rgba(0, 168, 204, 0.3))",
}));

// Sparkle component
const Sparkle = styled(Box)(({ theme }) => ({
  position: "absolute",
  animation: `${sparkleFloat} 2s ease-in-out infinite`,
  opacity: 0,
  fontSize: "1.5rem",
  "&:nth-of-type(1)": { top: "10%", left: "20%", animationDelay: "0s" },
  "&:nth-of-type(2)": { top: "30%", right: "15%", animationDelay: "0.5s" },
  "&:nth-of-type(3)": { bottom: "40%", left: "10%", animationDelay: "1s" },
  "&:nth-of-type(4)": { bottom: "20%", right: "20%", animationDelay: "1.5s" },
}));

// Care icon component
const CareIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  animation: `${iconBounce} 2s ease-in-out infinite`,
  "&:nth-of-type(1)": { animationDelay: "0s" },
  "&:nth-of-type(2)": { animationDelay: "0.5s" },
  "&:nth-of-type(3)": { animationDelay: "1s" },
}));

// Tools container
const ToolsCircle = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "300px",
  height: "300px",
  animation: `${rotateTools} 20s linear infinite`,
}));

const Tool = styled(Box)(({ theme, color, angle, delay }) => ({
  position: "absolute",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  background: color,
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
  animation: `${toolPulse} 2s ease-in-out infinite, ${rotateTools} 20s linear infinite reverse`,
  animationDelay: `${delay}s, 0s`,
  transform: `rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)`,
}));

const CenterLogo = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80px",
  height: "80px",
  background: "linear-gradient(135deg, #00A8CC, #00D4AA)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  color: "white",
  boxShadow: "0 15px 35px rgba(0, 168, 204, 0.4)",
  animation: `${toolPulse} 2s ease-in-out infinite`,
  zIndex: 10,
}));

const LottieGlow = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: "-20px",
  background: "linear-gradient(45deg, #00A8CC, #4ECDC4, #00D4AA)",
  borderRadius: "24px",
  opacity: 0.2,
  filter: "blur(20px)",
  animation: `${glowPulse} 3s ease-in-out infinite`,
}));

const OrbitDot = styled(Box)(({ theme, delay }) => ({
  position: "absolute",
  width: "16px",
  height: "16px",
  background: "linear-gradient(45deg, #00A8CC, #4ECDC4)",
  borderRadius: "50%",
  animation: `${orbit} 3s linear infinite`,
  animationDelay: `${delay}s`,
}));

const SceneIndicators = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "2rem",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "0.5rem",
  zIndex: 20,
}));

const Indicator = styled(Box)(({ theme, active }) => ({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  background: active ? "#00A8CC" : "#D1D5DB",
  transition: "all 0.3s ease",
  transform: active ? "scale(1.5)" : "scale(1)",
}));

const DentalStoreAnimation = () => {
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scenes = [
    // Scene 1: Healthy Tooth
    <motion.div
      key="healthy-tooth"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        position: "relative",
      }}
    >
      <Box sx={{ position: "relative", mb: 4 }}>
        <ToothSvg width="120" height="140" viewBox="0 0 120 140">
          <defs>
            <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <path
            d="M60 20 C45 20, 30 35, 30 55 L30 85 C30 110, 35 125, 45 135 C50 140, 55 140, 60 135 C65 140, 70 140, 75 135 C85 125, 90 110, 90 85 L90 55 C90 35, 75 20, 60 20 Z"
            fill="url(#toothGrad)"
            stroke="#00A8CC"
            strokeWidth="2"
          />
          <ellipse
            cx="50"
            cy="40"
            rx="8"
            ry="15"
            fill="rgba(255,255,255,0.7)"
          />
        </ToothSvg>

        <Sparkle>⭐</Sparkle>
        <Sparkle>✨</Sparkle>
        <Sparkle>💫</Sparkle>
        <Sparkle>⭐</Sparkle>
      </Box>

      <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
        {[
          { icon: "🪥", label: "Brush" },
          { icon: "🧴", label: "Rinse" },
          { icon: "🦷", label: "Healthy" },
        ].map((item, i) => (
          <CareIcon key={i}>
            <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>
              {item.icon}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#0891b2",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              {item.label}
            </Typography>
          </CareIcon>
        ))}
      </Box>
    </motion.div>,

    // Scene 2: Dental Tools
    <motion.div
      key="dental-tools"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box sx={{ position: "relative", mb: 4 }}>
        <ToolsCircle>
          {[
            {
              tool: "🪥",
              angle: 0,
              color: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
              delay: 0,
            },
            {
              tool: "🦷",
              angle: 60,
              color: "linear-gradient(135deg, #4ECDC4, #6ED5D0)",
              delay: 0.3,
            },
            {
              tool: "💊",
              angle: 120,
              color: "linear-gradient(135deg, #45B7D1, #5BC0DE)",
              delay: 0.6,
            },
            {
              tool: "🧴",
              angle: 180,
              color: "linear-gradient(135deg, #96CEB4, #A8D5C1)",
              delay: 0.9,
            },
            {
              tool: "🔍",
              angle: 240,
              color: "linear-gradient(135deg, #FFEAA7, #FFF2CC)",
              delay: 1.2,
            },
            {
              tool: "⚕️",
              angle: 300,
              color: "linear-gradient(135deg, #DDA0DD, #E6B3E6)",
              delay: 1.5,
            },
          ].map((item, i) => (
            <Tool
              key={i}
              color={item.color}
              angle={item.angle}
              delay={item.delay}
            >
              {item.tool}
            </Tool>
          ))}
          <CenterLogo>🏥</CenterLogo>
        </ToolsCircle>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{ textAlign: "center" }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#0891b2", fontWeight: 600, mb: 0.5 }}
        >
          Professional Dental Care
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280" }}>
          Everything for your smile
        </Typography>
      </motion.div>
    </motion.div>,

    // Scene 3: Enhanced Animation
    <motion.div
      key="enhanced-animation"
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -90 }}
      transition={{ duration: 0.8 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotateY: [0, 10, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ position: "relative", marginBottom: "2rem" }}
      >
        <LottieGlow />

        <Box
          sx={{
            position: "relative",
            zIndex: 10,
            background: "linear-gradient(135deg, #ffffff, #f8fafc)",
            borderRadius: "16px",
            p: 4,
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
            width: "300px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "4rem",
          }}
        >
          🦷
        </Box>

        {[0, 0.75, 1.5, 2.25].map((delay, i) => (
          <OrbitDot key={i} delay={delay} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ textAlign: "center" }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            background: "linear-gradient(45deg, #00A8CC, #00D4AA)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: `${gradientShift} 3s ease-in-out infinite`,
            mb: 1,
          }}
        >
          Multi Dental Supply
        </Typography>
        <Typography variant="body1" sx={{ color: "#6B7280", fontWeight: 500 }}>
          Your trusted partner in dental care
        </Typography>
      </motion.div>
    </motion.div>,
  ];

  return (
    <AnimationContainer>
      {/* Animated Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          background: `
            radial-gradient(circle at 25% 25%, #00A8CC 0%, transparent 25%),
            radial-gradient(circle at 75% 75%, #00D4AA 0%, transparent 25%)
          `,
          animation: `${rotateTools} 20s linear infinite`,
        }}
      />

      {/* Scene Container */}
      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        <AnimatePresence mode="wait">{scenes[currentScene]}</AnimatePresence>
      </Box>

      {/* Scene Indicators */}
      <SceneIndicators>
        {scenes.map((_, i) => (
          <Indicator key={i} active={i === currentScene} />
        ))}
      </SceneIndicators>
    </AnimationContainer>
  );
};

export default DentalStoreAnimation;
