import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Paper,
  IconButton,
  Chip,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Create a custom theme with extended colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#3b82f6",
      light: "#93c5fd",
      dark: "#1d4ed8",
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
    },
    secondary: {
      main: "#8b5cf6",
      light: "#c4b5fd",
      dark: "#6d28d9",
    },
    success: {
      main: "#10b981",
      light: "#6ee7b7",
      dark: "#059669",
    },
    warning: {
      main: "#f97316",
      light: "#fdba74",
      dark: "#ea580c",
    },
    error: {
      main: "#ef4444",
      light: "#fca5a5",
      dark: "#dc2626",
    },
    info: {
      main: "#06b6d4",
      light: "#67e8f9",
      dark: "#0e7490",
    },
    grey: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
    },
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
    },
    indigo: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
    },
  },
});

const DentalServices = () => {
  const [expandedService, setExpandedService] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Professional Equipment",
      description:
        "Premium dental equipment and instruments for healthcare professionals.",
      icon: "🔧",
      color: theme.palette.primary.main,
      gradient: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
      fullDescription:
        "Discover our extensive range of professional dental equipment including dental chairs, X-ray machines, sterilizers, and precision instruments. We partner with leading manufacturers to offer cutting-edge technology that enhances patient care and practice efficiency. All equipment comes with warranty and professional installation support.",
    },
    {
      id: 2,
      title: "Oral Care Products",
      description:
        "Complete collection of oral hygiene products for daily dental care.",
      icon: "🦷",
      color: theme.palette.success.main,
      gradient: `linear-gradient(to right, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
      fullDescription:
        "Shop our comprehensive selection of oral care essentials including electric toothbrushes, professional-grade toothpaste, mouthwash, dental floss, and whitening products. From everyday maintenance to specialized treatments, we stock trusted brands recommended by dental professionals worldwide.",
    },
    {
      id: 3,
      title: "Dental Supplies",
      description:
        "High-quality consumables and materials for dental practices.",
      icon: "📦",
      color: theme.palette.secondary.main,
      gradient: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      fullDescription:
        "Stock your practice with our premium dental supplies including disposable gloves, masks, impression materials, filling compounds, and sterilization products. We ensure consistent quality and timely delivery to keep your practice running smoothly with competitive bulk pricing options.",
    },
    {
      id: 4,
      title: "Orthodontic Solutions",
      description:
        "Complete orthodontic products for smile correction and alignment.",
      icon: "😁",
      color: theme.palette.warning.main,
      gradient: `linear-gradient(to right, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
      fullDescription:
        "Explore our orthodontic collection featuring traditional braces, clear aligners, retainers, and orthodontic appliances. We offer both professional-grade products for dental practices and direct-to-consumer options for patients seeking affordable smile correction solutions.",
    },
    {
      id: 5,
      title: "Preventive Care",
      description:
        "Essential products for maintaining optimal oral health and hygiene.",
      icon: "🛡️",
      color: theme.palette.info.main,
      gradient: `linear-gradient(to right, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
      fullDescription:
        "Prevent dental issues with our preventive care range including fluoride treatments, dental sealants, mouth guards, and specialized cleaning tools. Perfect for both professional use and home care routines to maintain healthy teeth and gums long-term.",
    },
    {
      id: 6,
      title: "Emergency Kits",
      description:
        "Complete dental emergency and first aid kits for immediate care.",
      icon: "🚨",
      color: theme.palette.error.main,
      gradient: `linear-gradient(to right, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
      fullDescription:
        "Be prepared for dental emergencies with our comprehensive emergency kits containing temporary filling materials, pain relief solutions, dental wax, and emergency contact tools. Essential for travel, sports, or unexpected dental situations requiring immediate attention.",
    },
    {
      id: 7,
      title: "Digital Solutions",
      description:
        "Modern digital tools and software for efficient practice management.",
      icon: "💻",
      color: theme.palette.primary.dark,
      gradient: `linear-gradient(to right, ${theme.palette.primary.dark}, #3730a3)`,
      fullDescription:
        "Modernize your practice with digital radiography systems, intraoral cameras, practice management software, and patient communication tools. Complete digital workflow solutions to improve efficiency, reduce costs, and enhance patient experience.",
    },
    {
      id: 8,
      title: "Sterilization Systems",
      description: "Advanced sterilization and infection control solutions.",
      icon: "🧪",
      color: theme.palette.info.dark,
      gradient: `linear-gradient(to right, ${theme.palette.info.dark}, #155e75)`,
      fullDescription:
        "Ensure the highest standards of safety with our comprehensive sterilization systems including autoclaves, ultrasonic cleaners, and infection control products. FDA-approved equipment with full compliance documentation and training support included.",
    },
  ];

  const handleLearnMore = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = 320; // Card width + gap
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons();
      return () => container.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  const ServiceCard = styled(Card)({
    position: "relative",
    overflow: "hidden",
    borderRadius: "16px",
    border: "1px solid",
    borderColor: theme.palette.grey[200],
    transition: "all 0.5s ease-out",
    height: "100%",
    "&:hover": {
      transform: "scale(1.05) translateY(-8px)",
      boxShadow: theme.shadows[6],
      borderColor: "transparent",
    },
  });

  const GradientBar = styled(Box)(({ gradient }) => ({
    height: "4px",
    background: gradient,
  }));

  const GradientOverlay = styled(Box)({
    position: "absolute",
    inset: 0,
    opacity: 0,
    transition: "opacity 0.7s",
    zIndex: 10,
    ".MuiCard-root:hover &": {
      opacity: 0.95,
    },
  });

  const IconContainer = styled(Box)({
    width: "64px",
    height: "64px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.grey[50],
    border: `1px solid ${theme.palette.grey[200]}`,
    boxShadow: theme.shadows[1],
    transition: "all 0.5s",
    ".MuiCard-root:hover &": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
      borderColor: "rgba(255, 255, 255, 0.3)",
      transform: "scale(1.1)",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${theme.palette.grey[50]}, ${theme.palette.primary[50]}, ${theme.palette.indigo[50]})`,
          py: 8,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Chip
              icon={<span style={{ fontSize: "1.25rem" }}>🏪</span>}
              label="Our Product Categories"
              sx={{
                mb: 3,
                px: 2,
                py: 1,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${theme.palette.primary[200]}`,
                boxShadow: 3,
                "& .MuiChip-label": {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  letterSpacing: "0.025em",
                },
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.5rem", md: "3rem", lg: "3.75rem" },
                fontWeight: 700,
                color: theme.palette.grey[900],
                mb: 3,
                lineHeight: "1.25",
              }}
            >
              Professional Dental
              <br />
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.dark})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Store Solutions
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.25rem" },
                color: theme.palette.grey[600],
                maxWidth: "lg",
                mx: "auto",
                lineHeight: "1.75",
              }}
            >
              Your trusted partner for premium dental equipment, supplies, and
              oral care products. We serve dental professionals and individuals
              with the highest quality products from leading manufacturers
              worldwide.
            </Typography>
          </Box>

          {/* Services Carousel */}
          <Box sx={{ position: "relative" }}>
            {/* Left Arrow */}
            <IconButton
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              sx={{
                position: "absolute",
                left: -24, // Move slightly outside to avoid card overlap
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1000, // Higher z-index to stay above cards
                width: 48,
                height: 48,
                backgroundColor: "background.paper",
                boxShadow: 3,
                border: `1px solid ${theme.palette.grey[200]}`,
                transition:
                  "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease, opacity 0.2s ease", // Smoother transitions
                "&:hover": {
                  backgroundColor: theme.palette.primary[50],
                  borderColor: theme.palette.primary[300],
                  boxShadow: 4,
                  color: theme.palette.primary.main,
                },
                "&:active": {
                  backgroundColor: theme.palette.primary[100], // Click feedback
                  boxShadow: 2,
                  transform: "translateY(-50%) scale(0.95)", // Slight scale-down on click
                },
                ...(!canScrollLeft && {
                  color: theme.palette.grey[300],
                  cursor: "not-allowed",
                  opacity: 0.5,
                }),
              }}
            >
              <ChevronLeft fontSize="medium" />
            </IconButton>

            {/* Right Arrow */}
            <IconButton
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              sx={{
                position: "absolute",
                right: -24, // Move slightly outside to avoid card overlap
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1000, // Higher z-index to stay above cards
                width: 48,
                height: 48,
                backgroundColor: "background.paper",
                boxShadow: 3,
                border: `1px solid ${theme.palette.grey[200]}`,
                transition:
                  "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease, opacity 0.2s ease", // Smoother transitions
                "&:hover": {
                  backgroundColor: theme.palette.primary[50],
                  borderColor: theme.palette.primary[300],
                  boxShadow: 4,
                  color: theme.palette.primary.main,
                },
                "&:active": {
                  backgroundColor: theme.palette.primary[100], // Click feedback
                  boxShadow: 2,
                  transform: "translateY(-50%) scale(0.95)", // Slight scale-down on click
                },
                ...(!canScrollRight && {
                  color: theme.palette.grey[300],
                  cursor: "not-allowed",
                  opacity: 0.5,
                }),
              }}
            >
              <ChevronRight fontSize="medium" />
            </IconButton>

            {/* Scrollable Container */}
            <Box
              ref={scrollContainerRef}
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 3,
                pb: 2,
                px: 6,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {services.map((service) => (
                <Box key={service.id} sx={{ flex: "0 0 320px" }}>
                  <ServiceCard>
                    <GradientBar gradient={service.gradient} />

                    <GradientOverlay
                      sx={{
                        background: service.gradient,
                      }}
                    />

                    <CardContent
                      sx={{
                        position: "relative",
                        zIndex: 20,
                        p: 4,
                      }}
                    >
                      <IconContainer>
                        <Box
                          component="span"
                          sx={{
                            fontSize: "2rem",
                            transition: "all 0.5s",
                            ".MuiCard-root:hover &": {
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          {service.icon}
                        </Box>
                      </IconContainer>

                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: "text.primary",
                          transition: "all 0.5s",
                          ".MuiCard-root:hover &": {
                            color: "common.white",
                          },
                        }}
                      >
                        {service.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          mb: 3,
                          lineHeight: "1.75",
                          transition: "all 0.5s",
                          ".MuiCard-root:hover &": {
                            color: "rgba(255, 255, 255, 0.9)",
                          },
                        }}
                      >
                        {service.description}
                      </Typography>

                      {expandedService === service.id && (
                        <Box
                          sx={{
                            mb: 3,
                            animation: "fadeIn 0.5s ease-out",
                            "@keyframes fadeIn": {
                              from: {
                                opacity: 0,
                                transform: "translateY(10px)",
                              },
                              to: {
                                opacity: 1,
                                transform: "translateY(0)",
                              },
                            },
                          }}
                        >
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              borderRadius: "12px",
                              backgroundColor: "grey.50",
                              border: `1px solid ${theme.palette.grey[200]}`,
                              transition: "all 0.5s",
                              ".MuiCard-root:hover &": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                borderColor: "rgba(255, 255, 255, 0.2)",
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.secondary",
                                lineHeight: "1.75",
                                transition: "all 0.5s",
                                ".MuiCard-root:hover &": {
                                  color: "rgba(255, 255, 255, 0.85)",
                                },
                              }}
                            >
                              {service.fullDescription}
                            </Typography>
                          </Paper>
                        </Box>
                      )}

                      <Button
                        onClick={() => handleLearnMore(service.id)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontWeight: 600,
                          color: "primary.main",
                          "&:hover": {
                            color: "primary.dark",
                            ".MuiCard-root:hover &": {
                              color: "common.white",
                            },
                          },
                          transition: "all 0.3s",
                        }}
                      >
                        <Box component="span" sx={{ transition: "all 0.3s" }}>
                          {expandedService === service.id
                            ? "Show Less"
                            : "Learn More"}
                        </Box>
                        <ChevronRight
                          fontSize="small"
                          sx={{
                            ml: 0.5,
                            transition: "transform 0.3s ease",
                            transform:
                              expandedService === service.id
                                ? "rotate(90deg)"
                                : "none",
                            "&:hover": {
                              transform:
                                expandedService === service.id
                                  ? "rotate(90deg) translateX(2px)"
                                  : "translateX(4px)",
                            },
                          }}
                        />
                      </Button>

                      {/* Decorative Elements */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          background: service.gradient,
                          opacity: 0.1,
                          transition: "opacity 0.5s",
                          ".MuiCard-root:hover &": {
                            opacity: 0.2,
                          },
                        }}
                      />

                      <Box
                        sx={{
                          position: "absolute",
                          bottom: -24,
                          left: -24,
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          background: service.gradient,
                          opacity: 0.05,
                          transition: "opacity 0.5s",
                          ".MuiCard-root:hover &": {
                            opacity: 0.15,
                          },
                        }}
                      />
                    </CardContent>
                  </ServiceCard>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Bottom Navigation Indicators */}
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 1 }}
          >
            {Array.from({ length: Math.ceil(services.length / 3) }).map(
              (_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "grey.300",
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },
                    transition: "background-color 0.3s",
                    cursor: "pointer",
                  }}
                />
              )
            )}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default DentalServices;
