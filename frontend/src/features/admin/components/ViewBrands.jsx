import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TableRowSkeleton } from "../../../components/skeletons/SkeletonLoaders";

import {
  selectBrands,
  selectBrandStatus,
  deleteBrandAsync,
  fetchAllBrandsAsync,
} from "../../brands/BrandSlice";

const ViewBrands = () => {
  const brands = useSelector(selectBrands);
  const brandStatus = useSelector(selectBrandStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllBrandsAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      dispatch(deleteBrandAsync(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-brand/${id}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Brands
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/admin/add-brand")}
        >
          Add New Brand
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, width: "100%", overflowX: "auto" }}
      >
        <Table sx={{ width: "100%", tableLayout: "fixed", minWidth: "800px" }}>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ width: "10%", minWidth: "80px" }}>
                <strong>#</strong>
              </TableCell>
              <TableCell sx={{ width: "40%", minWidth: "250px" }}>
                <strong>Brand Name</strong>
              </TableCell>
              <TableCell
                sx={{ width: "30%", minWidth: "200px", textAlign: "center" }}
              >
                <strong>Logo</strong>
              </TableCell>
              <TableCell
                sx={{ width: "20%", minWidth: "150px" }}
                align="center"
              >
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brandStatus === "loading" ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableRowSkeleton columns={4} />
                </TableRow>
              ))
            ) : brands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    No brands found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              brands.map((brand, index) => (
                <TableRow
                  key={brand._id || brand.id}
                  sx={{ "&:hover": { backgroundColor: "#f0f8ff" } }}
                >
                  <TableCell sx={{ width: "10%" }}>
                    <Typography variant="body1" fontWeight="bold">
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "40%" }}>
                    <Typography variant="h6" fontWeight="bold">
                      {brand.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "30%", textAlign: "center" }}>
                    <Avatar
                      src={brand.image}
                      alt={brand.name}
                      variant="rounded"
                      sx={{
                        width: 80,
                        height: 80,
                        border: "2px solid #2196f3",
                        margin: "0 auto",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <Box display="flex" justifyContent="center" gap={1}>
                      <IconButton
                        onClick={() => handleEdit(brand._id || brand.id)}
                        color="primary"
                        title="Edit Brand"
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(brand._id || brand.id)}
                        color="error"
                        title="Delete Brand"
                      >
                        <FaTrash />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary Stats */}
      <Box sx={{ mt: 3 }}>
        <Chip
          label={`${brands.length} Total Brands`}
          color="primary"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default ViewBrands;
