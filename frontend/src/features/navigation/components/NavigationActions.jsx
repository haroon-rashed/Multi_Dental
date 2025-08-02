import React from 'react';
import {
  Badge,
  Button,
  Chip,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TuneIcon from '@mui/icons-material/Tune';
import { selectCartItems } from '../../cart/CartSlice';
import { selectWishlistItems } from '../../wishlist/WishlistSlice';
import {
  selectProductIsFilterOpen,
  toggleFilters,
} from '../../products/ProductSlice';

export const NavigationActions = ({ isProductList = false }) => {
  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  return (
    <Stack
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      columnGap={is480 ? 1 : 2}
    >
      {/* Filter Toggle - only show on product list pages */}
      {isProductList && (
        <Button
          onClick={() => dispatch(toggleFilters())}
          variant={isProductFilterOpen ? 'contained' : 'outlined'}
          size={is480 ? 'small' : 'medium'}
          startIcon={<TuneIcon />}
          sx={{
            minWidth: is480 ? 'auto' : '100px',
            px: is480 ? 1 : 2
          }}
        >
          {!is480 && 'Filters'}
        </Button>
      )}

      {/* Wishlist */}
      <Chip
        onClick={() => navigate('/wishlist')}
        icon={
          <Badge badgeContent={wishlistItems?.length} color="error">
            <FavoriteBorderIcon />
          </Badge>
        }
        label={!is480 ? 'Wishlist' : ''}
        variant="outlined"
        clickable
        sx={{
          '&:hover': {
            backgroundColor: 'primary.light',
            color: 'white'
          }
        }}
      />

      {/* Cart */}
      <Chip
        onClick={() => navigate('/cart')}
        icon={
          <Badge badgeContent={cartItems?.length} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        }
        label={!is480 ? 'Cart' : ''}
        variant="outlined"
        clickable
        sx={{
          '&:hover': {
            backgroundColor: 'primary.light',
            color: 'white'
          }
        }}
      />
    </Stack>
  );
};
