import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Stack, Grid, Divider, Button } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  resetProductFetchStatus,
} from "../features/products/ProductSlice";
import { ProductCard } from "../features/products/components/ProductCard";
import {
  ProductListSkeleton,
  ListSkeleton,
} from "../components/skeletons/SkeletonLoaders";
import UserNavbar from "../features/navigation/components/UserNavbar";

const CategoryDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const categoryStatus = useSelector(selectCategoryStatus);
  const productFetchStatus = useSelector(selectProductFetchStatus);

  // Debug log all categories
  console.log('All categories:', JSON.stringify(categories, null, 2));
  
  // Find selected category
  const category = categories.find((cat) => {
    const catId = cat._id || cat.id;
    return catId && String(catId) === String(id);
  });
  
  console.log('Selected category:', JSON.stringify(category, null, 2));
  
  // Find subcategories
  const subcategories = categories.filter((cat) => {
    if (!cat.parent_id) return false;
    
    let parentId = cat.parent_id;
    if (parentId && typeof parentId === 'object') {
      parentId = parentId._id || parentId.id;
    }
    
    return parentId && String(parentId) === String(id);
  });
  
  console.log('Subcategories:', JSON.stringify(subcategories, null, 2));

  const navigate = useNavigate();
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    // Reset fetch status when category changes
    dispatch(resetProductFetchStatus());
    
    // Only fetch products if there are no subcategories
    if (subcategories.length === 0 && id) {
      dispatch(fetchProductsAsync({ category: [id] }));
      setHasFetched(true);
    } else {
      setHasFetched(false);
    }
  }, [dispatch, id, subcategories.length]);

  // Clear product errors when products are successfully fetched
  useEffect(() => {
    if (products && products.length > 0) {
      dispatch(clearProductErrors());
    }
  }, [products, dispatch]);

  // Helper to safely get name string from any possible structure
  const getNameString = (nameObj) => {
    try {
      // If it's falsy, return default
      if (!nameObj) return 'Category';
      
      // If it's already a string, return it
      if (typeof nameObj === 'string') return nameObj;
      
      // If it's an object with a name property
      if (nameObj && typeof nameObj === 'object') {
        // Try to get the name property
        const name = nameObj.name;
        
        // If name is a string, return it
        if (typeof name === 'string') return name;
        
        // If name is an object with a name property
        if (name && typeof name === 'object' && name.name) {
          return String(name.name);
        }
        
        // If we have _id but no name, return a default based on _id
        if (nameObj._id) {
          return `Category ${String(nameObj._id).substring(0, 4)}`;
        }
      }
      
      // If we can't determine the name, return a default
      return 'Category';
    } catch (error) {
      console.error('Error getting name string:', error, nameObj);
      return 'Category';
    }
  };

  const hasSubcategories = subcategories.length > 0;
  
  const handleSubcategoryClick = (subcatId) => {
    navigate(`/category/${subcatId}`);
  };
  
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      {/* Sticky Navbar */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 1201 }}>
        <UserNavbar/>
      </Box>
      <Box sx={{ minHeight: "80vh", background: "#f8fafc" }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", pt: 4, px: { xs: 2, md: 4 } }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleBackClick}
            sx={{ mb: 2, color: '#1A2E4D' }}
          >
            Back to Categories
          </Button>
          <Typography
            variant="h4"
            fontWeight={700}
            color="#1A2E4D"
            mb={2}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {category ? (
              <>
                {getNameString(category.name)}
                {!hasSubcategories && products && products.length > 0 && (
                  <HelpOutlineIcon
                    color="primary"
                    fontSize="medium"
                    titleAccess="Products available"
                    sx={{ ml: 1 }}
                  />
                )}
              </>
            ) : (
              'Loading category...'
            )}
          </Typography>
          {/* Subcategories Row */}
          <Box sx={{ mb: 3 }}>
            {categoryStatus === "loading" ? (
              <Stack direction="row" spacing={2}>
                <ListSkeleton count={4} height={40} />
              </Stack>
            ) : hasSubcategories ? (
              <>
                <Typography variant="h6" color="text.secondary" mb={2}>
                  Subcategories
                </Typography>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                  {subcategories.map((subcat) => {
                    const subcatId = subcat?._id || subcat?.id;
                    if (!subcatId) return null;
                    
                    return (
                      <Box
                        key={subcatId}
                        sx={{
                          px: 3,
                          py: 1.5,
                          borderRadius: 3,
                          background: "linear-gradient(90deg, #e3f0ff 0%, #f9f9f9 100%)",
                          boxShadow: 1,
                          cursor: "pointer",
                          fontWeight: 600,
                          color: "#1A2E4D",
                          transition: "all 0.3s",
                          ":hover": { 
                            background: "#dbeafe",
                            transform: "translateY(-2px)" 
                          },
                          whiteSpace: 'nowrap',
                          minWidth: '120px',
                          textAlign: 'center'
                        }}
                        onClick={() => handleSubcategoryClick(subcatId)}
                      >
                        {getNameString(subcat?.name) || 'Subcategory'}
                      </Box>
                    );
                  })}
                </Stack>
              </>
            ) : null}
          </Box>
          <Divider sx={{ mb: 3 }} />
          {/* Products Grid */}
          {!hasSubcategories && (
            <>
              {productFetchStatus === "pending" ? (
                <ProductListSkeleton count={8} />
              ) : (
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
                    <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        {hasFetched 
                          ? "No products found for this category."
                          : "Loading products..."}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              )}
            </>
          )}
          
          {/* Show message for categories with subcategories */}
          {hasSubcategories && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Please select a subcategory to view products
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default CategoryDetailsPage;
