import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { AdminDashBoard } from '../features/admin/components/AdminDashBoard'
import AdminSidebar from '../features/admin/components/AdminSidebar'

export const AdminDashboardPage = () => {
  return (
    <>
    <Navbar isProductList={true}/>
    <div className="grid grid-cols-12">
    <div className='col-span-3'>
      <AdminSidebar/>
    </div>
    <div className="col-sapn-9">
    <AdminDashBoard/>
    </div>

    </div>
    </>
  )
}
