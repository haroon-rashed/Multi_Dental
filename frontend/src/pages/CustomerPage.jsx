import React from "react";
import { Box } from "@mui/material";
import AdminSidebar from "../features/admin/components/AdminSidebar";
import Customers from "../features/admin/components/Customers";
export const CustomerPage = () => {
  const sidebarWidth = 240;
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Top Navbar */}
        <Box
          sx={{ zIndex: 1201, width: "100%", position: "fixed", top: 0 }}
        ></Box>

        {/* Sidebar and Content */}
        <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
          {/* Sidebar */}
          <Box
            sx={{
              width: sidebarWidth,
              flexShrink: 0,
              position: "fixed",
              top: 64,
              left: 0,
              bottom: 0,
              bgcolor: "background.paper",
              borderRight: "1px solid #ccc",
              zIndex: 1200,
            }}
          >
            <AdminSidebar />
          </Box>

          {/* Main Content */}
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
            <Customers />
          </Box>
        </Box>
      </Box>
    </>
  );
};
