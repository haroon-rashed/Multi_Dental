import React from 'react'
import AdminSidebar from '../features/admin/components/AdminSidebar'
import { Box, Grid } from "@mui/material";
import AdminDashboard from '../features/admin/components/AdminDashboard';
export const AdminDashboardPage = () => {
  const sidebarWidth = 240;
  return (
    <>
       <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
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
          <AdminDashboard />
        </Box>
      </Box>
    </Box>
    </>
  )
}
