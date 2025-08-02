import React from 'react';
import { AppBar, Toolbar, Stack } from '@mui/material';
import { BrandLogo } from './BrandLogo';
import { NavigationActions } from './NavigationActions';
import { UserMenu } from './UserMenu';

export const MainNavbar = ({ isProductList = false }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <BrandLogo />

        {/* Right side actions */}
        <Stack
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          columnGap={2}
        >
          {/* Navigation Actions (Cart, Wishlist, Filters) */}
          <NavigationActions isProductList={isProductList} />
          
          {/* User Menu */}
          <UserMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
