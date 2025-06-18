import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import { AdminDashBoard } from '../features/admin/components/AdminDashBoard'
import AdminSidebar from '../features/admin/components/AdminSidebar'

export const AdminDashboardPage = () => {
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
      {/* Top Navbar */}
      <Navbar isProductList={true} />

      {/* Main content area with sidebar and dashboard */}
      <Grid container>
        {/* Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <AdminSidebar />
        </Grid>

        {/* Dashboard */}
        <Grid item xs={12} sm={8} md={9}>
          <Box sx={{ p: 3 }}>
            <AdminDashBoard />
          </Box>
        </Grid>
      </Grid>
    </Box>

    </>
  )
}
