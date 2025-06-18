import React from 'react';
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
  useMediaQuery
} from '@mui/material';
import {
  People as PeopleIcon,
  Category as CategoryIcon,
  ShoppingBag as ProductsIcon,
  AttachMoney as SalesIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';

const DashboardCard = ({ title, value, icon, trend, trendValue, color }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: theme.shadows[3] }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Avatar sx={{ bgcolor: color, mb: 2 }}>
            {icon}
          </Avatar>
          <Typography 
            variant="body2" 
            color="textSecondary"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: trend === 'up' ? theme.palette.success.main : theme.palette.error.main
            }}
          >
            {trend === 'up' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
            {trendValue}%
          </Typography>
        </Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={trend === 'up' ? 75 : 25} 
          sx={{ 
            mt: 2, 
            height: 6, 
            borderRadius: 3,
            backgroundColor: theme.palette.grey[200],
            '& .MuiLinearProgress-bar': {
              backgroundColor: trend === 'up' ? theme.palette.success.main : theme.palette.error.main
            }
          }} 
        />
      </CardContent>
    </Card>
  );
};

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample data - replace with your actual data
  const dashboardData = [
    {
      title: "Total Users",
      value: "2,345",
      icon: <PeopleIcon />,
      trend: "up",
      trendValue: "12.5",
      color: theme.palette.primary.main
    },
    {
      title: "Categories",
      value: "24",
      icon: <CategoryIcon />,
      trend: "up",
      trendValue: "8.3",
      color: theme.palette.info.main
    },
    {
      title: "Products",
      value: "1,245",
      icon: <ProductsIcon />,
      trend: "down",
      trendValue: "4.2",
      color: theme.palette.warning.main
    },
    {
      title: "Total Sales",
      value: "$34,545",
      icon: <SalesIcon />,
      trend: "up",
      trendValue: "23.1",
      color: theme.palette.success.main
    }
  ];

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard Overview
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>
        Welcome back! Here's what's happening with your store today.
      </Typography>
      
      <Divider sx={{ mb: 4 }} />
      
      <Grid container spacing={3}>
        {dashboardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard {...item} />
          </Grid>
        ))}
      </Grid>
      
      {/* Additional dashboard sections can be added here */}
      <Box mt={4}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Recent Activity
        </Typography>
        <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[3] }}>
          <CardContent>
            <Typography color="textSecondary">
              Your recent store activities will appear here...
            </Typography>
            {/* Add your activity timeline or other components here */}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;