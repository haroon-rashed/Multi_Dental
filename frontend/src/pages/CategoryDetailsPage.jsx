import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Stack, Grid, Divider } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Navbar } from "../features/navigation/components/Navbar";
import { Footer } from "../features/footer/Footer";
import {
  selectCategories,
  selectCategoryStatus,
} from "../features/categories/CategoriesSlice";
import {
  fetchProductsAsync,
  selectProducts,
  selectProductFetchStatus,
  clearProductErrors,
} from "../features/products/ProductSlice";
import { ProductCard } from "../features/products/components/ProductCard";
import {
  ProductListSkeleton,
  ListSkeleton,
} from "../components/skeletons/SkeletonLoaders";

const CategoryDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const categoryStatus = useSelector(selectCategoryStatus);
  const productFetchStatus = useSelector(selectProductFetchStatus);

  // Find selected category
  const category = categories.find((cat) => (cat._id || cat.id) === id);
  // Find subcategories
  const subcategories = categories.filter((cat) => {
    let parentId = cat.parent_id;
    if (parentId && typeof parentId === "object" && parentId._id) {
      parentId = parentId._id;
    }
    return parentId && String(parentId) === String(id);
  });

  useEffect(() => {
    // Debug: Log category id and base URL
    console.log("[DEBUG] CategoryDetailsPage: category id:", id);
    console.log(
      "[DEBUG] process.env.REACT_APP_BASE_URL:",
      process.env.REACT_APP_BASE_URL
    );
    // Debug: Log dispatching fetchProductsAsync
    console.log("[DEBUG] Dispatching fetchProductsAsync with:", {
      category: [id],
    });
    dispatch(fetchProductsAsync({ category: [id] }));
  }, [dispatch, id]);

  // Clear product errors when products are successfully fetched
  useEffect(() => {
    if (products && products.length > 0) {
      dispatch(clearProductErrors());
    }
  }, [products, dispatch]);

  // Helper to safely get name string
  const getNameString = (nameObj) => {
    if (typeof nameObj === 'string') return nameObj;
    if (nameObj && typeof nameObj.name === 'string') return nameObj.name;
    return '';
  };

  const hasSubcategories = subcategories.length > 0;

  return (
    <>
      {/* Sticky Navbar */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 1201 }}>
        <Navbar />
      </Box>
      <Box sx={{ minHeight: "80vh", background: "#f8fafc" }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", pt: 4, px: { xs: 2, md: 4 } }}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="#1A2E4D"
            mb={2}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {getNameString(category?.name) || 'Category'}
            {!hasSubcategories && products && products.length > 0 && (
              <HelpOutlineIcon
                color="primary"
                fontSize="medium"
                titleAccess="Products available"
              />
            )}
          </Typography>
          {/* Subcategories Row */}
          {categoryStatus === "loading" ? (
            <Stack direction="row" spacing={2} mb={3}>
              <ListSkeleton count={4} height={40} />
            </Stack>
          ) : (
            hasSubcategories && (
              <Stack direction="row" spacing={2} mb={3}>
                {subcategories.map((subcat) => (
                  <Box
                    key={subcat._id || subcat.id}
                    sx={{
                      px: 3,
                      py: 1.5,
                      borderRadius: 3,
                      background:
                        "linear-gradient(90deg, #e3f0ff 0%, #f9f9f9 100%)",
                      boxShadow: 1,
                      cursor: "pointer",
                      fontWeight: 600,
                      color: "#1A2E4D",
                      transition: "all 0.3s",
                      ":hover": { background: "#dbeafe" },
                    }}
                    onClick={() =>
                      (window.location.href = `/category/${subcat._id || subcat.id}`)
                    }
                  >
                    {getNameString(subcat.name) || 'Subcategory'}
                  </Box>
                ))}
              </Stack>
            )
          )}
          <Divider sx={{ mb: 3 }} />
          {/* Products Grid */}
          {!hasSubcategories && (
            productFetchStatus === "loading" ? (
              <ProductListSkeleton count={8} />
            ) : (
              <>
                <Grid container spacing={3}>
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={product._id || product.id}
                      >
                        <ProductCard {...product} />
                      </Grid>
                    ))
                  ) : (
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      No products found for this category.
                    </Typography>
                  )}
                </Grid>
              </>
            )
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default CategoryDetailsPage;
