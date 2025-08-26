import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Stack,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  Breadcrumbs,
  Link,
  Box,
} from "@mui/material";
import {
  fetchProductsByCategoryAsync, // Updated to use new thunk
  selectProducts,
  selectProductFetchStatus,
  selectProductTotalResults,
} from "../features/products/ProductSlice";
import { ProductCard } from "../features/products/components/ProductCard";
import { selectCategories } from "../features/categories/CategoriesSlice";
import { ITEMS_PER_PAGE } from "../constants";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { ProductListSkeleton } from "../components/skeletons/SkeletonLoaders";
import Pagination from "@mui/material/Pagination";
import { selectLoggedInUser } from "../features/auth/AuthSlice";
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  resetWishlistItemAddStatus,
  resetWishlistItemDeleteStatus,
  selectWishlistItemAddStatus,
  selectWishlistItemDeleteStatus,
  selectWishlistItems,
} from "../features/wishlist/WishlistSlice";
import { toast } from "react-toastify";
import {
  resetCartItemAddStatus,
  selectCartItemAddStatus,
} from "../features/cart/CartSlice";

export const SubCategoryPage = () => {
  const { subcategoryId } = useParams();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const is1200 = useMediaQuery(theme.breakpoints.down(1200));
  const is800 = useMediaQuery(theme.breakpoints.down(800));
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is600 = useMediaQuery(theme.breakpoints.down(600));
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const is488 = useMediaQuery(theme.breakpoints.down(488));

  const products = useSelector(selectProducts);
  const productFetchStatus = useSelector(selectProductFetchStatus);
  const totalResults = useSelector(selectProductTotalResults);
  const categories = useSelector(selectCategories);
  const loggedInUser = useSelector(selectLoggedInUser);
  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
  const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);

  const dispatch = useDispatch();

  // Get subcategory details
  const subcategory = categories.find((cat) => cat._id === subcategoryId);
  const parentCategory = categories.find(
    (cat) => cat._id === subcategory?.parent_id?._id || subcategory?.parent_id
  );

  // Reset page when subcategory changes
  useEffect(() => {
    setPage(1);
  }, [subcategoryId]);

  // Fetch products for this subcategory
  useEffect(() => {
    const filters = {
      categoryId: subcategoryId, // Use dynamic subcategoryId
      page: page,
      limit: ITEMS_PER_PAGE,
      sort: sort,
    };

    if (!loggedInUser?.isAdmin) {
      filters.user = true;
    }

    dispatch(fetchProductsByCategoryAsync(filters));
  }, [subcategoryId, page, sort, loggedInUser, dispatch]);

  // Handle wishlist operations
  const handleAddRemoveFromWishlist = (e, productId) => {
    if (e.target.checked) {
      const data = { user: loggedInUser?._id, product: productId };
      dispatch(createWishlistItemAsync(data));
    } else if (!e.target.checked) {
      const index = wishlistItems.findIndex(
        (item) => item.product._id === productId
      );
      dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
    }
  };

  // Toast notifications
  useEffect(() => {
    if (wishlistItemAddStatus === "fulfilled") {
      toast.success("Product added to wishlist");
    } else if (wishlistItemAddStatus === "rejected") {
      toast.error("Error adding product to wishlist, please try again later");
    }
  }, [wishlistItemAddStatus]);

  useEffect(() => {
    if (wishlistItemDeleteStatus === "fulfilled") {
      toast.success("Product removed from wishlist");
    } else if (wishlistItemDeleteStatus === "rejected") {
      toast.error(
        "Error removing product from wishlist, please try again later"
      );
    }
  }, [wishlistItemDeleteStatus]);

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") {
      toast.success("Product added to cart");
    } else if (cartItemAddStatus === "rejected") {
      toast.error("Error adding product to cart, please try again later");
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetWishlistItemAddStatus());
      dispatch(resetWishlistItemDeleteStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, []);

  if (productFetchStatus === "pending") {
    return (
      <Stack width={"100%"} sx={{ py: 4 }}>
        <ProductListSkeleton count={8} />
      </Stack>
    );
  }

  return (
    <Stack spacing={3} sx={{ padding: is600 ? "1rem" : "2rem" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>
        <Link
          color="inherit"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
          underline="hover"
        >
          Home
        </Link>
        <Link
          color="inherit"
          onClick={() => navigate("/products")}
          sx={{ cursor: "pointer" }}
          underline="hover"
        >
          Products
        </Link>
        {parentCategory && (
          <Link
            color="inherit"
            onClick={() => navigate(`/subcategory/${parentCategory._id}`)}
            sx={{ cursor: "pointer" }}
            underline="hover"
          >
            {typeof parentCategory.name === "string"
              ? parentCategory.name
              : parentCategory.name?.name || "Category"}
          </Link>
        )}
        <Typography color="text.primary">
          {typeof subcategory?.name === "string"
            ? subcategory.name
            : subcategory?.name?.name || "Subcategory"}
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack spacing={2}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
            {typeof subcategory?.name === "string"
              ? subcategory.name
              : subcategory?.name?.name || "Subcategory Products"}
          </Typography>
          {subcategory?.description && (
            <Typography variant="body1" color="text.secondary">
              {subcategory.description}
            </Typography>
          )}
        </Stack>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {products.length === 0 ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ minHeight: "400px" }}
          >
            <Typography variant="h6" color="text.secondary">
              No products found in this subcategory
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check back later for new products
            </Typography>
          </Stack>
        ) : (
          <Grid
            container
            spacing={is700 ? 2 : 3}
            justifyContent="center"
            alignItems="stretch"
          >
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard
                    id={product._id}
                    title={product.title || "Unknown Product"}
                    thumbnail={product.thumbnail}
                    brand={product.brand?.name || "Unknown Brand"}
                    price={product.price || 0}
                    stockQuantity={product.stockQuantity || 0}
                    handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>

      {/* Pagination */}
      {products.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Stack alignItems="center" spacing={2} sx={{ marginTop: 4 }}>
            <Pagination
              size={is488 ? "medium" : "large"}
              page={page}
              onChange={(e, newPage) => setPage(newPage)}
              count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </motion.div>
      )}
    </Stack>
  );
};
