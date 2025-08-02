import React from "react";
import { Skeleton, Stack, Grid, Card, CardContent, Box } from "@mui/material";

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <Card sx={{ height: "100%", minHeight: "300px" }}>
    <Skeleton variant="rectangular" height={200} />
    <CardContent>
      <Skeleton variant="text" height={24} sx={{ marginBottom: 1 }} />
      <Skeleton
        variant="text"
        height={20}
        width="60%"
        sx={{ marginBottom: 1 }}
      />
      <Skeleton
        variant="text"
        height={20}
        width="40%"
        sx={{ marginBottom: 1 }}
      />
      <Skeleton variant="text" height={20} width="80%" />
    </CardContent>
  </Card>
);

// Brand Card Skeleton
export const BrandCardSkeleton = () => (
  <Card sx={{ minWidth: "250px", height: "180px", padding: 2 }}>
    <CardContent sx={{ textAlign: "center", height: "100%" }}>
      <Skeleton
        variant="circular"
        width={60}
        height={60}
        sx={{ margin: "0 auto 1rem" }}
      />
      <Skeleton variant="text" height={24} sx={{ marginBottom: 1 }} />
      <Skeleton variant="text" height={16} width="80%" />
    </CardContent>
  </Card>
);

// Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 8 }) => (
  <Grid container spacing={2}>
    {Array.from({ length: count }).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <ProductCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

// Brand Section Skeleton
export const BrandSectionSkeleton = ({ count = 6 }) => (
  <Stack spacing={3}>
    <Stack spacing={1} sx={{ textAlign: "center" }}>
      <Skeleton
        variant="text"
        height={48}
        width="60%"
        sx={{ margin: "0 auto" }}
      />
      <Skeleton
        variant="text"
        height={24}
        width="80%"
        sx={{ margin: "0 auto" }}
      />
    </Stack>
    <Box sx={{ overflowX: "auto" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ minWidth: "max-content", padding: "1rem 0" }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <BrandCardSkeleton key={index} />
        ))}
      </Stack>
    </Box>
  </Stack>
);

// Text Content Skeleton
export const TextContentSkeleton = ({ lines = 3, height = 20 }) => (
  <Stack spacing={1}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        height={height}
        width={index === lines - 1 ? "60%" : "100%"}
      />
    ))}
  </Stack>
);

// Page Header Skeleton
export const PageHeaderSkeleton = () => (
  <Stack spacing={3} sx={{ textAlign: "center", marginBottom: 4 }}>
    <Skeleton
      variant="text"
      height={56}
      width="70%"
      sx={{ margin: "0 auto" }}
    />
    <Skeleton
      variant="text"
      height={32}
      width="90%"
      sx={{ margin: "0 auto" }}
    />
  </Stack>
);

// Card Content Skeleton
export const CardContentSkeleton = ({ title = true, content = true }) => (
  <Card>
    <CardContent>
      {title && (
        <Skeleton variant="text" height={32} sx={{ marginBottom: 2 }} />
      )}
      {content && <TextContentSkeleton lines={4} />}
    </CardContent>
  </Card>
);

// Navigation Skeleton
export const NavigationSkeleton = () => (
  <Stack direction="row" spacing={2} sx={{ padding: 2 }}>
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} variant="text" height={32} width={80} />
    ))}
  </Stack>
);

// Footer Skeleton
export const FooterSkeleton = () => (
  <Stack
    spacing={3}
    sx={{ padding: 3, backgroundColor: "black", color: "white" }}
  >
    <Grid container spacing={3}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Stack spacing={2}>
            <Skeleton variant="text" height={32} width="60%" />
            <Skeleton variant="text" height={16} width="100%" />
            <Skeleton variant="text" height={16} width="80%" />
            <Skeleton variant="text" height={16} width="90%" />
          </Stack>
        </Grid>
      ))}
    </Grid>
  </Stack>
);

// Loading Spinner
export const LoadingSpinner = ({ size = "medium" }) => (
  <Stack
    justifyContent="center"
    alignItems="center"
    sx={{
      minHeight: size === "large" ? "400px" : "200px",
      width: "100%",
    }}
  >
    <Skeleton
      variant="circular"
      width={size === "large" ? 80 : 40}
      height={size === "large" ? 80 : 40}
    />
  </Stack>
);

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <Stack spacing={1}>
    {/* Header */}
    <Stack direction="row" spacing={1}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={index} variant="text" height={40} width={120} />
      ))}
    </Stack>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <Stack key={rowIndex} direction="row" spacing={1}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} variant="text" height={32} width={120} />
        ))}
      </Stack>
    ))}
  </Stack>
);

// Form Skeleton
export const FormSkeleton = ({ fields = 4 }) => (
  <Stack spacing={3}>
    {Array.from({ length: fields }).map((_, index) => (
      <Stack key={index} spacing={1}>
        <Skeleton variant="text" height={20} width="30%" />
        <Skeleton variant="rectangular" height={40} />
      </Stack>
    ))}
    <Skeleton variant="rectangular" height={48} width="120px" />
  </Stack>
);
