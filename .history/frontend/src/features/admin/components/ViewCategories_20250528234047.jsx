import React from 'react';
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
} from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectCategories,
  deleteCategoryAsync,
} from '../../categories/CategoriesSlice';
import { useNavigate } from 'react-router-dom';

const ViewCategories = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this category?');
    if (confirm) {
      dispatch(deleteCategoryAsync(id));
    }
  };

  const handleEdit = (category) => {
    navigate(`/admin/edit-category/${category.id || category._id}`, {
      state: { category }
    });
  };
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>#</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Image</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No categories found.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((cat, index) => (
              <TableRow key={cat.id || cat._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{cat.name}</TableCell>
                <TableCell>
                  <Avatar src={cat.categoryImage} alt={cat.name} variant="rounded" />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(cat.id || cat._id)} color="primary">
                    <FaEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cat.id || cat._id)} color="error">
                    <FaTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewCategories;
