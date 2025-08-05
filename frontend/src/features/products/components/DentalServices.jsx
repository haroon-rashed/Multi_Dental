import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const DentalServices = () => {
  const [expandedService, setExpandedService] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const services = [
    {
      id: 1,
      title: "Dental Care",
      description:
        "We are excited to meet you and provide the best dental care.",
      icon: "🦷",
      fullDescription:
        "Our comprehensive dental care includes routine cleanings, cavity fillings, root canals, and preventive treatments. We use the latest technology and techniques to ensure your oral health is maintained at the highest standard. Our gentle approach makes every visit comfortable and stress-free.",
    },
    {
      id: 2,
      title: "Cosmetic Dentistry",
      description:
        "We are excited to meet you and provide the best dental care.",
      icon: "🦷",
      fullDescription:
        "Transform your smile with our advanced cosmetic dentistry services including teeth whitening, veneers, dental bonding, and smile makeovers. Our artistic approach combined with cutting-edge technology ensures natural-looking, beautiful results that boost your confidence.",
    },
    {
      id: 3,
      title: "Dental Implants",
      description:
        "We are excited to meet you and provide the best dental care.",
      icon: "🦷",
      fullDescription:
        "Replace missing teeth with our state-of-the-art dental implant solutions. Our titanium implants provide a permanent, natural-feeling replacement that looks and functions like your original teeth. With proper care, dental implants can last a lifetime.",
    },
    {
      id: 4,
      title: "Teeth Whitening",
      description:
        "We are excited to meet you and provide the best dental care.",
      icon: "🦷",
      fullDescription:
        "Achieve a brighter, whiter smile with our professional teeth whitening treatments. We offer both in-office and take-home whitening options that can lighten your teeth by several shades safely and effectively, giving you the confident smile you deserve.",
    },
  ];

  const handleLearnMore = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.paper",
        py: 8,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
                fontWeight: "medium",
                mr: 1,
              }}
            >
              🦷
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
                fontWeight: "medium",
                letterSpacing: "0.05em",
              }}
            >
              Our Services
            </Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem", md: "3.75rem" },
              fontWeight: "bold",
              color: "text.primary",
              mb: 4,
              lineHeight: "1.25",
            }}
          >
            Explore the solutions we provide
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.125rem" },
              color: "text.secondary",
              maxWidth: "900px",
              mx: "auto",
              lineHeight: "1.75",
            }}
          >
            The goal of our clinic is to provide friendly, caring dentistry and
            the highest level of general, cosmetic, and specialist dental
            treatments. With dental practices throughout the world.
          </Typography>
        </Box>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service.id}>
              <Card
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 4,
                  transition: "all 0.5s ease",
                  transform: "scale(1)",
                  boxShadow: 3,
                  height: "100%",
                  backgroundColor: "common.white",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                    "& .gradient-overlay": {
                      transform: "translateY(0%)",
                    },
                    "& .service-icon": {
                      color: "common.white",
                    },
                    "& .service-title": {
                      color: "common.white",
                    },
                    "& .service-description": {
                      color: "rgba(255, 255, 255, 0.9)",
                    },
                    "& .service-full-description": {
                      color: "rgba(255, 255, 255, 0.8)",
                    },
                    "& .learn-more-btn": {
                      color: "common.white",
                      "&:hover": {
                        color: "rgba(255, 255, 255, 0.8)",
                      },
                    },
                  },
                }}
              >
                {/* Gradient Background Overlay */}
                <Box
                  className="gradient-overlay"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "100%",
                    background:
                      "linear-gradient(to top, #32465B 0%, #3D566E 50%, #486683 100%)",
                    transform: "translateY(100%)",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: 1,
                  }}
                />

                <CardContent
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      backgroundColor: "rgba(0, 123, 255, 0.1)",
                      transition: "all 0.5s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(4px)",
                      },
                    }}
                  >
                    <Typography
                      className="service-icon"
                      variant="h4"
                      sx={{
                        transition: "all 0.5s ease",
                        color: "primary.main",
                      }}
                    >
                      {service.icon}
                    </Typography>
                  </Box>

                  {/* Title */}
                  <Typography
                    className="service-title"
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      mb: 2,
                      transition: "all 0.5s ease",
                      color: "text.primary",
                    }}
                  >
                    {service.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    className="service-description"
                    variant="body1"
                    sx={{
                      mb: 4,
                      flexGrow: 1,
                      transition: "all 0.5s ease",
                      color: "text.secondary",
                    }}
                  >
                    {service.description}
                  </Typography>

                  {/* Expanded Content */}
                  {expandedService === service.id && (
                    <Box sx={{ mb: 3, animation: "fadeIn 0.5s ease-in-out" }}>
                      <Typography
                        className="service-full-description"
                        variant="body2"
                        sx={{
                          lineHeight: "1.75",
                          transition: "all 0.5s ease",
                          color: "text.secondary",
                        }}
                      >
                        {service.fullDescription}
                      </Typography>
                    </Box>
                  )}

                  {/* Learn More Button */}
                  <Button
                    className="learn-more-btn"
                    onClick={() => handleLearnMore(service.id)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      transition: "all 0.5s ease",
                      color: "primary.main",
                      "& .MuiSvgIcon-root": {
                        transition: "transform 0.3s ease",
                        transform:
                          expandedService === service.id
                            ? "rotate(180deg)"
                            : "none",
                      },
                      "&:hover": {
                        "& .MuiSvgIcon-root": {
                          transform:
                            expandedService === service.id
                              ? "rotate(180deg) translateX(4px)"
                              : "translateX(4px)",
                        },
                      },
                    }}
                  >
                    <Typography variant="body1" sx={{ mr: 1 }}>
                      {expandedService === service.id
                        ? "Show Less"
                        : "Learn More"}
                    </Typography>
                    <ArrowForwardIcon />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Add keyframes for fadeIn animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default DentalServices;
