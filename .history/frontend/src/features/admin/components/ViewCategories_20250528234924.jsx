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
} from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import { selectCategories } from '../../categories/CategoriesSlice';
import { deleteCategory } from '../../categories/CategoriesApi';
import { useNavigate } from 'react-router-dom';

const ViewCategories = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this category?");
    if (confirm) {
      dispatch(deleteCategory(id));
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
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
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
            categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.id}</TableCell>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.description}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(cat.id)} color="primary">
                    <FaEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cat.id)} color="error">
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