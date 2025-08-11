import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  People as PeopleIcon,
  Category as CategoryIcon,
  ShoppingBag as ProductsIcon,
  AttachMoney as SalesIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../categories/CategoriesSlice";
import {
  selectAllUsers,
  selectGetAllUsersStatus,
  getAllUsersAsync,
} from "../../auth/AuthSlice";

const DashboardCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  color,
  isLoading,
  error,
}) => {
  const theme = useTheme();

  if (error) {
    return (
      <Card
        sx={{
          height: "100%",
          borderRadius: 2,
          boxShadow: theme.shadows[3],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 180,
          border: `1px solid ${theme.palette.error.main}`,
        }}
      >
        <Box textAlign="center" p={2}>
          <ErrorIcon color="error" fontSize="large" />
          <Typography variant="body2" color="error" mt={1}>
            {error}
          </Typography>
        </Box>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card
        sx={{
          height: "100%",
          borderRadius: 2,
          boxShadow: theme.shadows[3],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 180,
        }}
      >
        <CircularProgress />
      </Card>
    );
  }

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 2,
        boxShadow: theme.shadows[3],
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Avatar
            sx={{
              bgcolor: color,
              mb: 2,
              width: 56,
              height: 56,
            }}
          >
            {React.cloneElement(icon, { fontSize: "large" })}
          </Avatar>
          {trend && trendValue && (
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                color:
                  trend === "up"
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                fontWeight: 500,
              }}
            >
              {trend === "up" ? (
                <ArrowUpwardIcon fontSize="small" />
              ) : (
                <ArrowDownwardIcon fontSize="small" />
              )}
              {trendValue}%
            </Typography>
          )}
        </Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: theme.palette.text.secondary }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: theme.palette.text.primary }}
        >
          {value}
        </Typography>
        {trend && trendValue && (
          <LinearProgress
            variant="determinate"
            value={trend === "up" ? 75 : 25}
            sx={{
              mt: 2,
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.palette.grey[200],
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  trend === "up"
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                borderRadius: 4,
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  // Get data from Redux store
  const categories = useSelector(selectCategories);
  const users = useSelector(selectAllUsers);
  const userStatus = useSelector(selectGetAllUsersStatus);

  const [stats, setStats] = useState({
    users: { count: 0, loading: true, error: null },
    categories: { count: 0, loading: true, error: null },
    products: { count: 0, loading: true, error: null },
    orders: {
      count: 0,
      loading: true,
      error: null,
      totalSales: 0,
      recentOrders: [],
    },
  });

  // Dispatch fetch actions for users
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(getAllUsersAsync());
    }
  }, [dispatch, userStatus]);

  // Fetch products and orders directly
  useEffect(() => {
    const fetchProductsData = async () => {
      setStats((prev) => ({
        ...prev,
        products: { ...prev.products, loading: true },
      }));
      try {
        const res = await axios.get(
          "http://localhost:8000/products/get-all-products"
        );
        const productsData = res.data.data || res.data;
        const productsCount =
          res.data.totalResults ||
          (Array.isArray(productsData) ? productsData.length : 0);
        setStats((prev) => ({
          ...prev,
          products: { count: productsCount, loading: false, error: null },
        }));
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          products: {
            count: 0,
            loading: false,
            error: "Failed to load products",
          },
        }));
      }
    };

    const fetchOrdersData = async () => {
      setStats((prev) => ({
        ...prev,
        orders: { ...prev.orders, loading: true },
      }));
      try {
        const res = await axios.get("http://localhost:8000/orders");
        const ordersData = res.data.data || res.data;
        const ordersCount = Array.isArray(ordersData) ? ordersData.length : 0;
        const totalSales = ordersData.reduce(
          (sum, order) => sum + (parseFloat(order.totalAmount) || 0),
          0
        );
        const recentOrders = Array.isArray(ordersData)
          ? [...ordersData]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
          : [];
        setStats((prev) => ({
          ...prev,
          orders: {
            count: ordersCount,
            totalSales,
            recentOrders,
            loading: false,
            error: null,
          },
        }));
      } catch (error) {
        setStats((prev) => ({
          ...prev,
          orders: {
            count: 0,
            totalSales: 0,
            recentOrders: [],
            loading: false,
            error: "Failed to load orders",
          },
        }));
      }
    };

    fetchProductsData();
    fetchOrdersData();
  }, []);

  // Update stats for users and categories when data changes
  useEffect(() => {
    try {
      // Users
      const usersCount = Array.isArray(users) ? users.length : 0;
      const usersLoading = userStatus === "loading";
      const usersError =
        userStatus === "failed" ? "Failed to load users" : null;

      // Categories
      const categoriesCount = Array.isArray(categories) ? categories.length : 0;

      setStats((prev) => ({
        ...prev,
        users: {
          count: usersCount,
          loading: usersLoading,
          error: usersError,
        },
        categories: {
          count: categoriesCount,
          loading: false,
          error: null,
        },
      }));
    } catch (error) {
      console.error("Error updating stats:", error);
      setStats((prev) => ({
        ...prev,
        users: { ...prev.users, loading: false, error: "Failed to load users" },
        categories: {
          ...prev.categories,
          loading: false,
          error: "Failed to load categories",
        },
      }));
    }
  }, [categories, users, userStatus]);

  // Dashboard data with real values
  const dashboardData = [
    {
      title: "Total Users",
      value: stats.users.count,
      icon: <PeopleIcon />,
      trend: "up",
      trendValue: "12.5",
      color: theme.palette.primary.main,
      loading: stats.users.loading,
      error: stats.users.error,
    },
    {
      title: "Categories",
      value: stats.categories.count,
      icon: <CategoryIcon />,
      trend: "up",
      trendValue: "8.3",
      color: theme.palette.info.main,
      loading: stats.categories.loading,
      error: stats.categories.error,
    },
    {
      title: "Products",
      value: stats.products.count,
      icon: <ProductsIcon />,
      trend: "down",
      trendValue: "4.2",
      color: theme.palette.warning.main,
      loading: stats.products.loading,
      error: stats.products.error,
    },
    {
      title: "Orders",
      value: stats.orders.count,
      icon: <SalesIcon />,
      trend: "up",
      trendValue: "23.1",
      color: theme.palette.success.main,
      loading: stats.orders.loading,
      error: stats.orders.error,
    },
  ];

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        Dashboard Overview
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary }}
        mb={4}
      >
        Welcome back! Here's what's happening with your store today.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={3}>
        {dashboardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard
              title={item.title}
              value={item.value}
              icon={item.icon}
              trend={item.trend}
              trendValue={item.trendValue}
              color={item.color}
              isLoading={item.loading}
              error={item.error}
            />
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity Section */}
      <Box mt={4}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ color: theme.palette.text.primary }}
        >
          Recent Activity
        </Typography>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <CardContent>
            {stats.orders.loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            ) : stats.orders.error ? (
              <Alert severity="error">{stats.orders.error}</Alert>
            ) : stats.orders.recentOrders &&
              stats.orders.recentOrders.length > 0 ? (
              stats.orders.recentOrders.map((order, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.success.main,
                      mr: 2,
                    }}
                  >
                    <SalesIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      Order #{order.orderNumber || "N/A"} received
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : "Unknown date"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Amount: ${order.totalAmount?.toFixed(2) || "0.00"}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body1" color="textSecondary">
                No recent activity to show
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
