import React from 'react'
import { Cart } from '../features/cart/components/Cart'
import {Footer} from '../features/footer/Footer'
import UserNavbar from '../features/navigation/components/UserNavbar'

export const CartPage = () => {
  return (
    <>
    <UserNavbar/>
    <Cart/>
    <Footer/>
    </>
  )
}
