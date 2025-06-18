import {
  Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Pagination, Select,
  Stack, Typography, useMediaQuery, useTheme, Accordion, AccordionSummary,
  AccordionDetails, FormGroup, FormControlLabel, Checkbox, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  selectBrands
} from '../../brands/BrandSlice';
import {
  selectCategories
} from '../../categories/CategoriesSlice';
import {
  deleteProductByIdAsync,
  fetchProductsAsync,
  selectProductIsFilterOpen,
  selectProductTotalResults,
  selectProducts,
  toggleFilters,
  undeleteProductByIdAsync
} from '../../products/ProductSlice';
import { ITEMS_PER_PAGE } from '../../../constants';

const sortOptions = [
  { name: "Price: low to high", sort: "price", order: "asc" },
  { name: "Price: high to low", sort: "price", order: "desc" },
];

export const AdminDashBoard = () => {
  const [filters, setFilters] = useState({});
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const theme = useTheme();

  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);
  const totalResults = useSelector(selectProductTotalResults);
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const is600 = useMediaQuery(theme.breakpoints.down(600));
  const is488 = useMediaQuery(theme.breakpoints.down(488));

  useEffect(() => {
    setPage(1);
  }, [totalResults]);

  useEffect(() => {
    const finalFilters = { ...filters };
    finalFilters['pagination'] = { page: page, limit: ITEMS_PER_PAGE };
    finalFilters['sort'] = sort;
    dispatch(fetchProductsAsync(finalFilters));
  }, [filters, sort, page]);

  const handleBrandFilters = (e) => {
    const filterSet = new Set(filters.brand || []);
    if (e.target.checked) filterSet.add(e.target.value);
    else filterSet.delete(e.target.value);
    setFilters({ ...filters, brand: Array.from(filterSet) });
  };

  const handleCategoryFilters = (e) => {
    const filterSet = new Set(filters.category || []);
    if (e.target.checked) filterSet.add(e.target.value);
    else filterSet.delete(e.target.value);
    setFilters({ ...filters, category: Array.from(filterSet) });
  };

  const handleProductDelete = (productId) => {
    dispatch(deleteProductByIdAsync(productId));
  };

  const handleProductUnDelete = (productId) => {
    dispatch(undeleteProductByIdAsync(productId));
  };

  const handleFilterClose = () => {
    dispatch(toggleFilters());
  };

  return (
    <>
      {/* Sidebar Filters */}
      <motion.div
        style={{
          position: "fixed",
          backgroundColor: "white",
          height: "100vh",
          padding: '1rem',
          overflowY: "scroll",
          width: is500 ? "100vw" : "30rem",
          zIndex: 500
        }}
        variants={{ show: { left: 0 }, hide: { left: -500 } }}
        initial={'hide'}
        transition={{ ease: "easeInOut", duration: .7, type: "spring" }}
        animate={isProductFilterOpen === true ? "show" : "hide"}
      >
        <Stack mb={'5rem'}>
          <Typography variant='h4'>New Arrivals</Typography>
          <IconButton onClick={handleFilterClose} style={{ position: "absolute", top: 15, right: 15 }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ClearIcon fontSize='medium' />
            </motion.div>
          </IconButton>

          <Stack rowGap={2} mt={4}>
            <Typography sx={{ cursor: "pointer" }} variant='body2'>Totes</Typography>
            <Typography sx={{ cursor: "pointer" }} variant='body2'>Backpacks</Typography>
            <Typography sx={{ cursor: "pointer" }} variant='body2'>Travel Bags</Typography>
            <Typography sx={{ cursor: "pointer" }} variant='body2'>Hip Bags</Typography>
            <Typography sx={{ cursor: "pointer" }} variant='body2'>Laptop Sleeves</Typography>
          </Stack>

          <Stack mt={2}>
            <Accordion>
              <AccordionSummary expandIcon={<AddIcon />} aria-controls="brand-filters" id="brand-filters">
                <Typography>Brands</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <FormGroup onChange={handleBrandFilters}>
                  {
                    brands?.map((brand) => (
                      <motion.div key={brand._id} style={{ width: "fit-content" }} whileHover={{ x: 5 }} whileTap={{ scale: 0.9 }}>
                        <FormControlLabel sx={{ ml: 1 }} control={<Checkbox />} label={brand.name} value={brand._id} />
                      </motion.div>
                    ))
                  }
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </Stack>

          <Stack mt={2}>
            <Accordion>
              <AccordionSummary expandIcon={<AddIcon />} aria-controls="category-filters" id="category-filters">
                <Typography>Category</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <FormGroup onChange={handleCategoryFilters}>
                  {
                    categories?.map((category) => (
                      <motion.div key={category._id} style={{ width: "fit-content" }} whileHover={{ x: 5 }} whileTap={{ scale: 0.9 }}>
                        <FormControlLabel sx={{ ml: 1 }} control={<Checkbox />} label={category.name} value={category._id} />
                      </motion.div>
                    ))
                  }
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Stack>
      </motion.div>

      {/* Main Content */}
      <Stack rowGap={5} mt={is600 ? 2 : 5} mb={'3rem'}>
        <Stack flexDirection={'row'} mr={'2rem'} justifyContent={'flex-end'} alignItems={'center'} columnGap={5}>
          <Stack alignSelf={'flex-end'} width={'12rem'}>
            <FormControl fullWidth>
              <InputLabel id="sort-dropdown">Sort</InputLabel>
              <Select
                variant='standard'
                labelId="sort-dropdown"
                label="Sort"
                onChange={(e) => setSort(e.target.value)}
                value={sort}
              >
                <MenuItem value={null}>Reset</MenuItem>
                {sortOptions.map((option, i) => (
                  <MenuItem key={i} value={option}>{option.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(product => (
                <TableRow key={product._id} sx={{ opacity: product.isDeleted ? 0.7 : 1 }}>
                  <TableCell>
                    <img src={product.thumbnail} alt={product.title} width="60" height="60" />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.brand?.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        component={Link}
                        to={`/admin/product-update/${product._id}`}
                        variant="contained"
                      >
                        Update
                      </Button>
                      {product.isDeleted ? (
                        <Button
                          onClick={() => handleProductUnDelete(product._id)}
                          color="error"
                          variant="outlined"
                        >
                          Un-delete
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleProductDelete(product._id)}
                          color="error"
                          variant="outlined"
                        >
                          Delete
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack alignSelf={is488 ? 'center' : 'flex-end'} mr={is488 ? 0 : 5} rowGap={2} p={is488 ? 1 : 0}>
          <Pagination
            size={is488 ? 'medium' : 'large'}
            page={page}
            onChange={(e, page) => setPage(page)}
            count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
            variant="outlined"
            shape="rounded"
          />
          <Typography textAlign={'center'}>
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, totalResults)} of {totalResults} results
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};
