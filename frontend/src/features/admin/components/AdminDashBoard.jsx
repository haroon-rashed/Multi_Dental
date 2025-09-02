import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  Paper,
} from "@mui/material";
import {
  People as PeopleIcon,
  Category as CategoryIcon,
  ShoppingBag as ProductsIcon,
  AttachMoney as SalesIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Error as ErrorIcon,
  TrendingUp as TrendingUpIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
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
  onClick,
}) => {
  const theme = useTheme();

  if (error) {
    return (
      <Card
        onClick={onClick}
        sx={{
          height: "100%",
          borderRadius: 3,
          boxShadow: theme.shadows[3],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 180,
          border: `1px solid ${theme.palette.error.main}`,
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: theme.shadows[8],
          },
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
        onClick={onClick}
        sx={{
          height: "100%",
          borderRadius: 3,
          boxShadow: theme.shadows[3],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 180,
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <CircularProgress />
      </Card>
    );
  }

  return (
    <Card
      onClick={onClick}
      sx={{
        height: "100%",
        borderRadius: 3,
        boxShadow: theme.shadows[4],
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `1px solid ${color}20`,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-12px) scale(1.02)",
          boxShadow: `0 20px 40px ${color}30`,
          "& .card-icon": {
            transform: "scale(1.1) rotate(10deg)",
          },
          "& .trend-indicator": {
            transform: "scale(1.05)",
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
        },
      }}
    >
      <CardContent sx={{ p: 3, position: "relative" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Avatar
            className="card-icon"
            sx={{
              bgcolor: color,
              width: 64,
              height: 64,
              boxShadow: `0 8px 24px ${color}40`,
              transition: "all 0.3s ease",
              background: `linear-gradient(135deg, ${color}, ${color}CC)`,
            }}
          >
            {React.cloneElement(icon, {
              fontSize: "large",
              sx: { color: "white" },
            })}
          </Avatar>
          {trend && trendValue && (
            <Box
              className="trend-indicator"
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor:
                  trend === "up"
                    ? theme.palette.success.light
                    : theme.palette.error.light,
                color:
                  trend === "up"
                    ? theme.palette.success.dark
                    : theme.palette.error.dark,
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                fontSize: "0.75rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
            >
              {trend === "up" ? (
                <ArrowUpwardIcon sx={{ fontSize: 16, mr: 0.5 }} />
              ) : (
                <ArrowDownwardIcon sx={{ fontSize: 16, mr: 0.5 }} />
              )}
              {trendValue}%
            </Box>
          )}
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            mb: 1,
            fontSize: "0.95rem",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 2,
            background: `linear-gradient(135deg, ${color}, ${color}CC)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </Typography>

        {trend && trendValue && (
          <LinearProgress
            variant="determinate"
            value={trend === "up" ? 75 : 25}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: `${color}20`,
              "& .MuiLinearProgress-bar": {
                background: `linear-gradient(90deg, ${color}, ${color}CC)`,
                borderRadius: 3,
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

const CustomChart = ({ data, loading, error }) => {
  const theme = useTheme();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={300}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!data || data.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={300}
      >
        <Typography variant="body1" color="text.secondary">
          No data available
        </Typography>
      </Box>
    );
  }

  const maxRevenue = Math.max(...data.map((item) => item.revenue)) || 1;
  const maxOrders = Math.max(...data.map((item) => item.orders)) || 1;

  return (
    <Box sx={{ height: 300, position: "relative", p: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box display="flex" alignItems="center" gap={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 3,
                bgcolor: theme.palette.primary.main,
                borderRadius: 1.5,
              }}
            />
            <Typography variant="body2" fontWeight="600">
              Revenue
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 3,
                bgcolor: theme.palette.success.main,
                borderRadius: 1.5,
              }}
            />
            <Typography variant="body2" fontWeight="600">
              Orders
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="end"
        justifyContent="space-between"
        height={220}
        gap={1}
      >
        {data.map((item, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            alignItems="center"
            flex={1}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                gap: 0.5,
                height: 180,
                mb: 1,
              }}
            >
              {/* Revenue Bar */}
              <Box
                sx={{
                  width: 20,
                  height: `${(item.revenue / maxRevenue) * 160}px`,
                  background: `linear-gradient(to top, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  borderRadius: "4px 4px 0 0",
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scaleY(1.1)",
                    filter: "brightness(1.1)",
                  },
                  "&::after": {
                    content: `"$${item.revenue.toFixed(0)}"`,
                    position: "absolute",
                    top: -25,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "10px",
                    color: theme.palette.text.secondary,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover::after": {
                    opacity: 1,
                  },
                }}
              />

              {/* Orders Bar */}
              <Box
                sx={{
                  width: 20,
                  height: `${(item.orders / maxOrders) * 160}px`,
                  background: `linear-gradient(to top, ${theme.palette.success.main}, ${theme.palette.success.light})`,
                  borderRadius: "4px 4px 0 0",
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scaleY(1.1)",
                    filter: "brightness(1.1)",
                  },
                  "&::after": {
                    content: `"${item.orders}"`,
                    position: "absolute",
                    top: -25,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "10px",
                    color: theme.palette.text.secondary,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover::after": {
                    opacity: 1,
                  },
                }}
              />
            </Box>

            {/* Day Label */}
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: "0.75rem",
              }}
            >
              {item.date}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
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
      chartData: [],
    },
  });

  // Navigation handlers
  const handleCardClick = (cardType) => {
    switch (cardType) {
      case "users":
        navigate("/admin/customer");
        break;
      case "orders":
        navigate("/admin/orders");
        break;
      case "categories":
        navigate("/admin/view-category");
        break;
      case "products":
        navigate("/admin/product-table");
        break;
      default:
        break;
    }
  };

  // Dispatch fetch actions for users
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(getAllUsersAsync());
    }
  }, [dispatch, userStatus]);

  // Generate chart data
  const generateChartData = (orders) => {
    const last7Days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const dayOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
        return orderDate === dateStr;
      });

      const dayRevenue = dayOrders.reduce(
        (sum, order) => sum + (parseFloat(order.totalAmount) || 0),
        0
      );

      last7Days.push({
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        orders: dayOrders.length,
        revenue: dayRevenue,
        fullDate: dateStr,
      });
    }

    return last7Days;
  };

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
        const chartData = generateChartData(ordersData);

        setStats((prev) => ({
          ...prev,
          orders: {
            count: ordersCount,
            totalSales,
            chartData,
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
            chartData: [],
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
      onClick: () => handleCardClick("users"),
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
      onClick: () => handleCardClick("categories"),
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
      onClick: () => handleCardClick("products"),
    },
    {
      title: "Total Orders",
      value: stats.orders.count,
      icon: <SalesIcon />,
      trend: "up",
      trendValue: "23.1",
      color: theme.palette.success.main,
      loading: stats.orders.loading,
      error: stats.orders.error,
      onClick: () => handleCardClick("orders"),
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
      <Box mb={4}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "black",
            mb: 1,
          }}
        >
          Dashboard Overview
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 400,
            opacity: 0.8,
          }}
        >
          Welcome back! Here's what's happening with your store today.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4, opacity: 0.6 }} />

      <Grid container spacing={3} mb={4}>
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
              onClick={item.onClick}
            />
          </Grid>
        ))}
      </Grid>

      {/* Analytics Section */}
      <Box mt={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TrendingUpIcon sx={{ color: theme.palette.primary.main }} />
          Sales Analytics
        </Typography>

        <Grid container spacing={3}>
          {/* Revenue Chart */}
          <Grid item xs={12} lg={8}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: theme.shadows[4],
                background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.primary.main}05)`,
                border: `1px solid ${theme.palette.primary.main}20`,
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <TimelineIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Weekly Revenue & Orders
                  </Typography>
                </Box>
                <CustomChart
                  data={stats.orders.chartData}
                  loading={stats.orders.loading}
                  error={stats.orders.error}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Summary Cards */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: theme.shadows[4],
                    background: `linear-gradient(135deg, ${theme.palette.success.main}15, ${theme.palette.success.main}05)`,
                    border: `1px solid ${theme.palette.success.main}30`,
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.success.main,
                        width: 56,
                        height: 56,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <SalesIcon />
                    </Avatar>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="success.main"
                    >
                      ${stats.orders.totalSales.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Revenue
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: theme.shadows[4],
                    background: `linear-gradient(135deg, ${theme.palette.info.main}15, ${theme.palette.info.main}05)`,
                    border: `1px solid ${theme.palette.info.main}30`,
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.info.main,
                        width: 56,
                        height: 56,
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      <AssessmentIcon />
                    </Avatar>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      color="info.main"
                    >
                      $
                      {stats.orders.count > 0
                        ? (
                            stats.orders.totalSales / stats.orders.count
                          ).toFixed(2)
                        : "0.00"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Order Value
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
