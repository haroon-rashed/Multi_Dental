import React from 'react'
import { Wishlist } from '../features/wishlist/components/Wishlist'
import { Footer } from '../features/footer/Footer'
import UserNavbar from '../features/navigation/components/UserNavbar'

export const WishlistPage = () => {
  return (
    <>
    <UserNavbar/>
    <Wishlist/>
    <Footer/>
    </>
  )
}
