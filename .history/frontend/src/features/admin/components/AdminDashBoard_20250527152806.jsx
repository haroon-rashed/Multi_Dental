import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Pagination,
  Stack,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Undo as UndoIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { fetchProductsAsync, deleteProductByIdAsync, undeleteProductByIdAsync, selectProducts, selectProductTotalResults } from '../../products/ProductSlice';

const ITEMS_PER_PAGE = 10;

export const AdminProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [filters, setFilters] = useState({
    brand: [],
    category: []
  });
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const params = {
      pagination: { page, limit: ITEMS_PER_PAGE },
      sort,
      ...filters
    };
    dispatch(fetchProductsAsync(params));
  }, [dispatch, page, sort, filters]);

  const handleDelete = (productId) => {
    dispatch(deleteProductByIdAsync(productId));
  };

  const handleUnDelete = (productId) => {
    dispatch(undeleteProductByIdAsync(productId));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleBrandFilterChange = (event) => {
    const brandId = event.target.value;
    setFilters(prev => ({
      ...prev,
      brand: event.target.checked
        ? [...prev.brand, brandId]
        : prev.brand.filter(id => id !== brandId)
    }));
    setPage(1);
  };

  const handleCategoryFilterChange = (event) => {
    const categoryId = event.target.value;
    setFilters(prev => ({
      ...prev,
      category: event.target.checked
        ? [...prev.category, categoryId]
        : prev.category.filter(id => id !== categoryId)
    }));
    setPage(1);
  };

  const handleFilterDialogOpen = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterDialogClose = () => {
    setFilterDialogOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({ brand: [], category: [] });
    setSort('');
    setPage(1);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Product List</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={handleFilterDialogOpen}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/product-add"
          >
            Add Product
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>Discount (%)</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product._id}
                sx={{ opacity: product.isDeleted ? 0.7 : 1 }}
              >
                <TableCell>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>
                  {product.description.length > 50
                    ? `${product.description.substring(0, 50)}...`
                    : product.description}
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.discountPercentage}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.brand?.name || 'N/A'}</TableCell>
                <TableCell>{product.category?._id || 'N/A'}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      component={Link}
                      to={`/admin/product-update/${product._id}`}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    {product.isDeleted ? (
                      <IconButton
                        onClick={() => handleUnDelete(product._id)}
                        color="success"
                      >
                        <UndoIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => handleDelete(product._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3}>
        <Typography>
          Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{' '}
          {Math.min(page * ITEMS_PER_PAGE, totalResults)} of {totalResults} products
        </Typography>
        <Pagination
          count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onClose={handleFilterDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={handleFilterDialogClose}>
              <ClearIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sort}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="price:asc">Price: Low to High</MenuItem>
                <MenuItem value="price:desc">Price: High to Low</MenuItem>
                <MenuItem value="rating:desc">Highest Rated</MenuItem>
                <MenuItem value="discountPercentage:desc">Best Discount</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Brands
              </Typography>
              <Stack spacing={1}>
                {products.reduce((brands, product) => {
                  if (product.brand && !brands.some(b => b._id === product.brand._id)) {
                    brands.push(product.brand);
                  }
                  return brands;
                }, []).map((brand) => (
                  <FormControlLabel
                    key={brand._id}
                    control={
                      <Checkbox
                        checked={filters.brand.includes(brand._id)}
                        onChange={handleBrandFilterChange}
                        value={brand._id}
                      />
                    }
                    label={brand.name}
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Categories
              </Typography>
              <Stack spacing={1}>
                {products.reduce((categories, product) => {
                  if (product.category && !categories.some(c => c._id === product.category._id)) {
                    categories.push(product.category);
                  }
                  return categories;
                }, []).map((category) => (
                  <FormControlLabel
                    key={category._id}
                    control={
                      <Checkbox
                        checked={filters.category.includes(category._id)}
                        onChange={handleCategoryFilterChange}
                        value={category._id}
                      />
                    }
                    label={category.name}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterDialogClose}>Close</Button>
          <Button onClick={handleClearFilters} color="secondary">
            Clear All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};