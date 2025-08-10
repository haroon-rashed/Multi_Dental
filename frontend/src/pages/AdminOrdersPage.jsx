import React from "react";
import { AdminOrders } from "../features/admin/components/AdminOrders";
import { Box } from "@mui/material";
import AdminSidebar from "../features/admin/components/AdminSidebar";
export const AdminOrdersPage = () => {
  const sidebarWidth = 240;
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Sidebar and Content */}
        <Box sx={{ display: "flex", flex: 1, pt: "64px" /* Navbar height */ }}>
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
            <AdminOrders />
          </Box>
        </Box>
      </Box>
    </>
  );
};
