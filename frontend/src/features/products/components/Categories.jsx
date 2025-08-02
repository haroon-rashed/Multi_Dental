import React from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../categories/CategoriesSlice";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const CategoryProductsSlider = () => {
  const categories = useSelector(selectCategories);

  return (
    <Box sx={{ overflowX: "auto", p: 3 }}>
      <Stack direction="row" spacing={2} sx={{ width: "max-content" }}>
        {categories.map((category, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 250,
              maxWidth: 250,
              borderRadius: 2,
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.3s",
              ":hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            {/* Discount Tag */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: "gold",
                color: "white",
                px: 1,
                py: 0.5,
                borderBottomLeftRadius: "8px",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              -10%
            </Box>

            {/* Image */}
            <Box
              sx={{
                position: "relative",
                height: 160,
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={category.categoryImage || "/default.jpg"} // ensure valid image path
                alt={category.name}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  transition: "transform 0.3s",
                  ".MuiCard-root:hover &": {
                    transform: "scale(1.1)",
                  },
                }}
              />

              {/* Cart Icon */}
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: -40,
                  left: "50%",
                  transform: "translateX(-50%)",
                  bgcolor: "primary.main",
                  color: "white",
                  transition: "all 0.3s",
                  ".MuiCard-root:hover &": {
                    bottom: 8,
                  },
                }}
              >
                <ShoppingCartIcon />
              </IconButton>
            </Box>

            {/* Content */}
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Dental Lab
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                {category.name}
              </Typography>
              <Typography variant="body2" color="warning.main">
                ★★★★★
              </Typography>
              <Typography
                variant="body2"
                sx={{ textDecoration: "line-through", color: "gray" }}
              >
                Rs. 2,000.00
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Rs. 1,800.00
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default CategoryProductsSlider;
