import React from 'react'
import { ProductDetails } from '../features/products/components/ProductDetails'
import { Footer } from '../features/footer/Footer'
import UserNavbar from '../features/navigation/components/UserNavbar'

export const ProductDetailsPage = () => {
  return (
    <>
    <UserNavbar/>
    <ProductDetails/>
    <Footer/>
    </>
  )
}
