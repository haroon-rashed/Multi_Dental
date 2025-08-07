import React from 'react'
import ProductTable from '../features/admin/components/ProductTable'
import UserNavbar from '../../../../frontend/src/features/navigation/components/UserNavbar'

const ProductTablePage = () => {
  return (
    <div>
      <UserNavbar/>
      <ProductTable/>
    </div>
  )
}

export default ProductTablePage
