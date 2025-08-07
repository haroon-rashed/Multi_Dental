import React from 'react';
import { Navbar } from '../features/navigation/components/Navbar';
import { ProductList } from '../features/products/components/ProductList';
import { Footer } from '../features/footer/Footer';
import { Container, Typography, Box } from '@mui/material';
import UserNavbar from '../features/navigation/components/UserNavbar';

export const ProductsPage = () => {
  return (
    <>
      {/* <Navbar isProductList={true} /> */}
      <UserNavbar/>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              textAlign: 'center',
              mb: 2
            }}
          >
            All Products
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ textAlign: 'center' }}
          >
            Discover our complete range of dental supplies and equipment
          </Typography>
        </Box>
      </Container>
      <ProductList />
      <Footer />
    </>
  );
};

export default ProductsPage;
