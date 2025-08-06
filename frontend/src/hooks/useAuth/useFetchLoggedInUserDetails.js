import React, { useEffect } from 'react'
import { selectLoggedInUser } from '../../features/auth/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddressByUserIdAsync } from '../../features/address/AddressSlice'
import { fetchWishlistByUserIdAsync } from '../../features/wishlist/WishlistSlice'
import { fetchCartByUserIdAsync } from '../../features/cart/CartSlice'
import { fetchAllCategoriesAsync } from '../../features/categories/CategoriesSlice'
import { fetchAllBrandsAsync } from '../../features/brands/BrandSlice'
import { fetchLoggedInUserByIdAsync } from '../../features/user/UserSlice'

export const useFetchLoggedInUserDetails = (deps) => {
    
    const loggedInUser=useSelector(selectLoggedInUser)
    const dispatch = useDispatch();

    useEffect(()=>{
        // Always fetch categories and brands regardless of authentication status
        dispatch(fetchAllBrandsAsync());
        dispatch(fetchAllCategoriesAsync());
        
        // If user is logged in and verified, fetch user-specific data
        if(deps && loggedInUser?.isVerified){
          dispatch(fetchLoggedInUserByIdAsync(loggedInUser?._id));
          
          if(!loggedInUser.isAdmin){
            dispatch(fetchCartByUserIdAsync(loggedInUser?._id));
            dispatch(fetchAddressByUserIdAsync(loggedInUser?._id));
            dispatch(fetchWishlistByUserIdAsync(loggedInUser?._id));
          }
        }
    },[deps])
}
