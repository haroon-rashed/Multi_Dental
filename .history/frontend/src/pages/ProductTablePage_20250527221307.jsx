import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import ProductTable from '../features/admin/components/ProductTable'

const ProductTablePage = () => {
  const sidebarWidth = 240;
  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Top Navbar */}
            <Box sx={{ zIndex: 1201, width: "100%", position: "fixed", top: 0 }}>
              <Navbar isProductList={true} />
            </Box>
      
            {/* Sidebar and Content */}
            <Box sx={{ display: "flex", flex: 1, pt: '64px' /* Navbar height */ }}>
              {/* Sidebar */}
              <Box
                sx={{
                  width: sidebarWidth,
                  flexShrink: 0,
                  position: "fixed",
                  top: 64, // navbar height
                  left: 0,
                  bottom: 0,
                  bgcolor: "background.paper",
                  borderRight: "1px solid #ccc",
                  zIndex: 1200,
                }}
              >
                <AdminSidebar />
              </Box>
      
              {/* Dashboard Content */}
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  ml: `${sidebarWidth}px`,
                  p: 3,
                  overflowY: "auto",
                  height: "calc(100vh - 64px)",
                }}
              >
                <AdminDashBoard />
              </Box>
            </Box>
          </Box>
    </div>
  )
}

export default ProductTablePage
