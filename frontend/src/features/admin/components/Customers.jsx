import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Grid,
  IconButton,
  Fade,
  Skeleton,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import {
  Search,
  People,
  Email,
  Person,
  Error,
  Refresh,
  PersonAdd,
  TrendingUp,
  Visibility,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Create Material-UI theme with custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a202c",
      secondary: "#4a5568",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 48px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#f8fafc",
          fontWeight: 600,
          textTransform: "uppercase",
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
        },
      },
    },
  },
});

// Styled components
const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  color: "white",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
}));

const StatsCard = styled(Card)(({ theme, color = "primary" }) => ({
  background: `linear-gradient(135deg, ${
    color === "primary"
      ? theme.palette.primary.light
      : color === "secondary"
      ? theme.palette.secondary.light
      : color === "success"
      ? "#4caf50"
      : theme.palette.info.light
  } 0%, ${
    color === "primary"
      ? theme.palette.primary.main
      : color === "secondary"
      ? theme.palette.secondary.main
      : color === "success"
      ? "#2e7d32"
      : theme.palette.info.main
  } 100%)`,
  color: "white",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    right: "-20%",
    width: "100%",
    height: "200%",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
    transform: "rotate(45deg)",
  },
}));

const AnimatedTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "scale(1.01)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
}));

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8000/auth/get-all-users"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Handle different possible response structures
        const usersArray = Array.isArray(data)
          ? data
          : data.users || data.data || [];

        setCustomers(usersArray);
        setFilteredCustomers(usersArray);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filter customers based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (customer) =>
          customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);

  const handleRetry = () => {
    window.location.reload();
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const stringToColor = (string) => {
    if (!string) return theme.palette.primary.main;
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };
  console.log(filteredCustomers);
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "background.default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
            }}
          >
            <CircularProgress size={60} sx={{ color: "white", mb: 3 }} />
            <Typography variant="h5" gutterBottom>
              Loading Customers
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Please wait while we fetch the data...
            </Typography>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "background.default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{ p: 6, textAlign: "center", borderRadius: 4 }}
          >
            <Error sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
            <Typography variant="h5" color="error" gutterBottom>
              Error Loading Data
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Failed to fetch customers: {error}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={handleRetry}
              size="large"
            >
              Try Again
            </Button>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          {/* Header Section */}
          <Fade in timeout={1000}>
            <Box sx={{ mb: 4 }}>
              <GradientBox sx={{ mb: 4 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <People sx={{ fontSize: 48 }} />
                  <Box>
                    <Typography variant="h4" component="h1">
                      Customer Management
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Manage and view all registered customers
                    </Typography>
                  </Box>
                </Box>
              </GradientBox>

              {/* Statistics Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard color="primary">
                    <CardContent sx={{ position: "relative", zIndex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ opacity: 0.9, mb: 1 }}
                          >
                            Total Customers
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            {customers.length}
                          </Typography>
                        </Box>
                        <People sx={{ fontSize: 48, opacity: 0.3 }} />
                      </Box>
                    </CardContent>
                  </StatsCard>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard color="success">
                    <CardContent sx={{ position: "relative", zIndex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ opacity: 0.9, mb: 1 }}
                          >
                            Filtered Results
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            {filteredCustomers.length}
                          </Typography>
                        </Box>
                        <Visibility sx={{ fontSize: 48, opacity: 0.3 }} />
                      </Box>
                    </CardContent>
                  </StatsCard>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard color="secondary">
                    <CardContent sx={{ position: "relative", zIndex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ opacity: 0.9, mb: 1 }}
                          >
                            Search Active
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            {searchTerm ? "Yes" : "No"}
                          </Typography>
                        </Box>
                        <Search sx={{ fontSize: 48, opacity: 0.3 }} />
                      </Box>
                    </CardContent>
                  </StatsCard>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <StatsCard color="info">
                    <CardContent sx={{ position: "relative", zIndex: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ opacity: 0.9, mb: 1 }}
                          >
                            Growth Rate
                          </Typography>
                          <Typography variant="h4" fontWeight="bold">
                            +12%
                          </Typography>
                        </Box>
                        <TrendingUp sx={{ fontSize: 48, opacity: 0.3 }} />
                      </Box>
                    </CardContent>
                  </StatsCard>
                </Grid>
              </Grid>

              {/* Search Bar */}
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search customers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    maxWidth: 400,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "background.paper",
                    },
                  }}
                />
              </Box>
            </Box>
          </Fade>

          {/* Table Section */}
          <Fade in timeout={1200}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                background: "background.paper",
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background:
                    "linear-gradient(90deg, #f8fafc 0%, #e2e8f0 100%)",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <People color="primary" />
                  Customer Directory
                </Typography>
              </Box>

              {filteredCustomers.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <People
                    sx={{ fontSize: 80, color: "text.disabled", mb: 2 }}
                  />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {searchTerm
                      ? "No customers found matching your search"
                      : "No customers available"}
                  </Typography>
                  {searchTerm && (
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => setSearchTerm("")}
                      sx={{ mt: 2 }}
                    >
                      Clear search
                    </Button>
                  )}
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ pl: 4 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            #
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Person fontSize="small" />
                            Name
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Email fontSize="small" />
                            Email
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredCustomers.map((customer, index) => (
                        <AnimatedTableRow
                          key={customer.id || customer._id || index}
                        >
                          <TableCell sx={{ pl: 4 }}>
                            <Chip
                              label={index + 1}
                              size="small"
                              sx={{
                                background:
                                  "linear-gradient(45deg, #1976d2, #9c27b0)",
                                color: "white",
                                fontWeight: "bold",
                                minWidth: 32,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Avatar
                                sx={{
                                  bgcolor: stringToColor(customer.name),
                                  width: 40,
                                  height: 40,
                                  fontWeight: "bold",
                                }}
                              >
                                {getInitials(customer.name)}
                              </Avatar>
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight="medium"
                                  color="text.primary"
                                >
                                  {customer.name || "N/A"}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Customer #{index + 1}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.primary">
                              {customer.email || "N/A"}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Registered user
                            </Typography>
                          </TableCell>
                        </AnimatedTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Fade>

          {/* Footer */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredCustomers.length} of {customers.length} customers
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CustomersPage;
