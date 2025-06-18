import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import ProductTable from '../features/admin/components/ProductTable'

const ProductTablePage = () => {
  return (
    <div>
      <Navbar/>
      <ProductTable/>
    </div>
  )
}

export default ProductTablePage
