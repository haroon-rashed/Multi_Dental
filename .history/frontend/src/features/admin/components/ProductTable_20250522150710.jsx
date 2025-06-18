import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function ProductTable() {
  const products = useSelector((state) => state.products);
  console.log(products);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom color="primary" fontWeight={600}>
        Product List
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price ($)</TableCell>
              <TableCell>Discount (%)</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products?.map((product) => (
              <TableRow key={product._id} hover>
                <TableCell>
                  <Avatar
                    variant="rounded"
                    src={product.images?.[0] || ""}
                    alt={product.title}
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>

                <TableCell>{product.title}</TableCell>
                <TableCell sx={{ maxWidth: 200 }}>
                  <Typography variant="body2" noWrap>
                    {product.description}
                  </Typography>
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.discountPercentage}</TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
                <TableCell>{product.brand?.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => console.log("Edit", product._id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => console.log("Delete", product._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
