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
                    background: "#ffffff",
                    color: "text.primary",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    "&:hover": {
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
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
                    {/* Brand Image */}
                    <Box
                      sx={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "4px",
                        marginBottom: "1rem",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      <img
                        src={brand.image}
                        alt={brand.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "fallback-image-url";
                          e.target.alt = "Brand logo not available";
                        }}
                      />
                    </Box>

                    {/* Brand Name */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                        fontSize: is500 ? "1rem" : "1.1rem",
                        color: theme.palette.primary.main,
                      }}
                    >
                      {brand.name || "Brand Name"}
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
