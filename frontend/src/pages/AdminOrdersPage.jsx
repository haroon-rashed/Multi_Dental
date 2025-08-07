import React from 'react'
import { AdminOrders } from '../features/admin/components/AdminOrders'
import UserNavbar from '../features/navigation/components/UserNavbar'

export const AdminOrdersPage = () => {
  return (
    <>
    <UserNavbar/>
    <AdminOrders/>
    </>
  )
}
