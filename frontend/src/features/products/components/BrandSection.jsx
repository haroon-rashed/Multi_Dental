import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  Typography,
  Card,
  CardContent,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { selectBrands, fetchAllBrandsAsync } from "../../brands/BrandSlice";
import { useNavigate } from "react-router-dom";

export const BrandSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const is1200 = useMediaQuery(theme.breakpoints.down(1200));
  const is800 = useMediaQuery(theme.breakpoints.down(800));
  const is600 = useMediaQuery(theme.breakpoints.down(600));
  const is500 = useMediaQuery(theme.breakpoints.down(500));

  const brands = useSelector(selectBrands);

  useEffect(() => {
    if (brands.length === 0) {
      dispatch(fetchAllBrandsAsync());
    }
  }, [dispatch, brands.length]);

  const handleBrandClick = (brandId) => {
    navigate(`/products?brand=${brandId}`);
  };

  return (
    <Stack spacing={3} sx={{ padding: is600 ? "1rem" : "2rem" }}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack spacing={1}>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="left"
            sx={{
              mb: 1,
              mt: 2,
              color: "#1A2E4D",
              letterSpacing: "1px",
              pl: { xs: 1, md: 2 },
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: { xs: 8, md: 16 },
                width: 60,
                height: 4,
                background: "linear-gradient(90deg, #1A2E4D 0%, #3B82F6 100%)",
                borderRadius: 2,
              },
            }}
          >
            Popular Brands
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          ></Typography>
        </Stack>
      </motion.div>

      {/* Brands Scroll Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Box
          sx={{
            overflowX: "auto",
            overflowY: "hidden",
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.5)",
              },
            },
            // Hide scrollbar for Firefox
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(0,0,0,0.3) rgba(0,0,0,0.1)",
          }}
        >
          <Stack
            direction="row"
            spacing={is500 ? 2 : 3}
            sx={{
              minWidth: "max-content",
              padding: "1rem 0",
              paddingLeft: is600 ? "1rem" : "2rem",
              paddingRight: is600 ? "1rem" : "2rem",
            }}
          >
            {brands.map((brand, index) => (
              <motion.div
                key={brand._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <Card
                  onClick={() => handleBrandClick(brand._id)}
                  sx={{
                    minWidth: is500 ? "200px" : "250px",
                    maxWidth: is500 ? "200px" : "250px",
                    height: "180px",
                    cursor: "pointer",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                      zIndex: 1,
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      position: "relative",
                      zIndex: 2,
                      padding: "1.5rem",
                    }}
                  >
                    {/* Brand Logo/Icon */}
                    <Box
                      sx={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1rem",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "white",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {brand.name?.charAt(0)?.toUpperCase() || "B"}
                    </Box>

                    {/* Brand Name */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                        fontSize: is500 ? "1rem" : "1.1rem",
                      }}
                    >
                      {brand.name || "Brand Name"}
                    </Typography>

                    {/* Brand Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.9,
                        fontSize: "0.875rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {brand.description || "Premium quality products"}
                    </Typography>

                    {/* Click Indicator */}
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        bottom: "0.5rem",
                        right: "0.5rem",
                        opacity: 0.7,
                        fontSize: "0.75rem",
                      }}
                    >
                      Click to explore
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Stack>
        </Box>
      </motion.div>

      {/* View All Brands Button */}
      {brands.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Stack alignItems="center" spacing={2}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                cursor: "pointer",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
              onClick={() => navigate("/products")}
            >
              View All Brands →
            </Typography>
          </Stack>
        </motion.div>
      )}
    </Stack>
  );
};
