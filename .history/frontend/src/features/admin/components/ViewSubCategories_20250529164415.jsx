import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Avatar,
  Paper,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const ViewSubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/subcategories");
      setSubCategories(res.data.subCategories || []);
    } catch (err) {
      console.error("Failed to fetch subcategories:", err);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await axios.delete(`http://localhost:8000/api/subcategories/${id}`);
        setSubCategories((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete subcategory");
      }
    }
  };

  const handleEdit = (id) => {
    // You can navigate to edit form with this id
    console.log("Edit subcategory ID:", id);
    // e.g., navigate(`/edit-subcategory/${id}`);
  };

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        View Sub Categories
      </Typography>

      <Paper elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Sr No</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Subcategory</strong></TableCell>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No subcategories found.
                </TableCell>
              </TableRow>
            ) : (
              subCategories.map((sub, index) => (
                <TableRow key={sub._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{sub.category?.name || "N/A"}</TableCell>
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>
                    <Avatar
                      src={sub.subCategoryImage}
                      alt={sub.name}
                      variant="rounded"
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(sub._id)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(sub._id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ViewSubCategories;
