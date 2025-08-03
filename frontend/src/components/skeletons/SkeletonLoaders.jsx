import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Skeleton, 
  Grid, 
  Stack,
  useTheme,
  useMediaQuery 
} from '@mui/material';

// Product Card Skeleton Loader
export const ProductCardSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Image Skeleton */}
        <Skeleton
          variant="rectangular"
          height={isMobile ? 200 : 250}
          animation="wave"
          sx={{ bgcolor: 'grey.200' }}
        />
        
        {/* Wishlist Button Skeleton */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <Skeleton
            variant="circular"
            width={32}
            height={32}
            animation="wave"
          />
        </Box>
        
        {/* Stock Badge Skeleton */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
          }}
        >
          <Skeleton
            variant="rounded"
            width={60}
            height={20}
            animation="wave"
          />
        </Box>
      </Box>
      
      <CardContent sx={{ p: 2 }}>
        {/* Title Skeleton */}
        <Skeleton
          variant="text"
          height={24}
          animation="wave"
          sx={{ mb: 1 }}
        />
        
        {/* Brand Skeleton */}
        <Skeleton
          variant="text"
          width="60%"
          height={20}
          animation="wave"
          sx={{ mb: 1 }}
        />
        
        {/* Rating Skeleton */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Skeleton variant="rectangular" width={80} height={16} animation="wave" />
          <Skeleton variant="text" width={30} height={16} animation="wave" />
        </Stack>
        
        {/* Price Skeleton */}
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Skeleton variant="text" width={60} height={24} animation="wave" />
          <Skeleton variant="text" width={50} height={20} animation="wave" />
        </Stack>
        
        {/* Add to Cart Button Skeleton */}
        <Skeleton
          variant="rounded"
          height={36}
          animation="wave"
          sx={{ borderRadius: 2 }}
        />
      </CardContent>
    </Card>
  );
};

// Category Card Skeleton Loader
export const CategoryCardSkeleton = () => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Image Skeleton */}
      <Skeleton
        variant="rectangular"
        height={150}
        animation="wave"
        sx={{ bgcolor: 'grey.200' }}
      />
      
      <CardContent sx={{ p: 2, textAlign: 'center' }}>
        {/* Category Name Skeleton */}
        <Skeleton
          variant="text"
          height={24}
          animation="wave"
          sx={{ mx: 'auto', width: '80%' }}
        />
        
        {/* Product Count Skeleton */}
        <Skeleton
          variant="text"
          width="60%"
          height={16}
          animation="wave"
          sx={{ mx: 'auto', mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};

// Product List Grid Skeleton
export const ProductListSkeleton = ({ count = 8 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const getColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  };
  
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <ProductCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

// Category Grid Skeleton
export const CategoryGridSkeleton = ({ count = 6 }) => {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <CategoryCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

// Simple List Skeleton (for dropdowns, menus, etc.)
export const ListSkeleton = ({ count = 5, height = 40 }) => {
  return (
    <Stack spacing={1}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={height}
          animation="wave"
          sx={{ borderRadius: 1 }}
        />
      ))}
    </Stack>
  );
};

// Banner/Hero Skeleton
export const BannerSkeleton = ({ height = 300 }) => {
  return (
    <Skeleton
      variant="rectangular"
      height={height}
      animation="wave"
      sx={{ 
        bgcolor: 'grey.200',
        borderRadius: 2,
        mb: 3
      }}
    />
  );
};

// Table Row Skeleton (for admin tables)
export const TableRowSkeleton = ({ columns = 5 }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, p: 2, alignItems: 'center' }}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          height={20}
          animation="wave"
          sx={{ flex: 1 }}
        />
      ))}
    </Box>
  );
};

// Navigation Skeleton (for navbar dropdowns)
export const NavigationSkeleton = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Box key={index}>
            <Skeleton variant="text" height={24} animation="wave" sx={{ mb: 1 }} />
            <Stack spacing={1} sx={{ ml: 2 }}>
              {Array.from({ length: 3 }).map((_, subIndex) => (
                <Skeleton
                  key={subIndex}
                  variant="text"
                  width="80%"
                  height={20}
                  animation="wave"
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
