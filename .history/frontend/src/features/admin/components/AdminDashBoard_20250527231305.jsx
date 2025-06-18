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
    <Card sx={{ 
      height: '100%', 
      borderRadius: 2, 
      boxShadow: theme.shadows[3],
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[6]
      }
    }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Avatar sx={{ 
            bgcolor: color, 
            mb: 2,
            width: 56,
            height: 56
          }}>
            {React.cloneElement(icon, { fontSize: 'large' })}
          </Avatar>
          <Typography 
            variant="body2" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
              fontWeight: 500
            }}
          >
            {trend === 'up' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
            {trendValue}%
          </Typography>
        </Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.secondary }}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
          {value}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={trend === 'up' ? 75 : 25} 
          sx={{ 
            mt: 2, 
            height: 8, 
            borderRadius: 4,
            backgroundColor: theme.palette.grey[200],
            '& .MuiLinearProgress-bar': {
              backgroundColor: trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
              borderRadius: 4
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
    <Box sx={{ 
      p: isMobile ? 2 : 4,
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh'
    }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: theme.palette.text.primary }}>
        Dashboard Overview
      </Typography>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary }} mb={4}>
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
      
      {/* Recent Activity Section */}
      <Box mt={4}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: theme.palette.text.primary }}>
          Recent Activity
        </Typography>
        <Card sx={{ 
          borderRadius: 2, 
          boxShadow: theme.shadows[3],
          backgroundColor: theme.palette.background.paper
        }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                <PeopleIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  New user registered
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  5 minutes ago
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ bgcolor: theme.palette.success.main, mr: 2 }}>
                <SalesIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  New order received
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  12 minutes ago
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: theme.palette.warning.main, mr: 2 }}>
                <ProductsIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  New product added
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  1 hour ago
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;