import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Avatar, Typography, Box,
} from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  selectCategories,
  deleteCategoryAsync,
} from '../../categories/CategoriesSlice';

const ViewCategories = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm('Delete this category?')) {
      dispatch(deleteCategoryAsync(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-category/${id}`);
  };

  const renderSubcategories = (parentId) => {
    return categories
      .filter(cat => cat.parentId === parentId)
      .map((subcat, index) => (
        <TableRow key={subcat.id || subcat._id} sx={{ backgroundColor: '#f9f9f9' }}>
          <TableCell></TableCell>
          <TableCell>
            <Box pl={4}>
              <Typography variant="body2">
                {subcat.name} <Typography variant="caption" color="text.secondary">(Subcategory)</Typography>
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Avatar src={subcat.categoryImage} alt={subcat.name} variant="rounded" />
          </TableCell>
          <TableCell align="center">
            <IconButton onClick={() => handleEdit(subcat.id || subcat._id)} color="primary">
              <FaEdit />
            </IconButton>
            <IconButton onClick={() => handleDelete(subcat.id || subcat._id)} color="error">
              <FaTrash />
            </IconButton>
          </TableCell>
        </TableRow>
      ));
  };

  const parentCategories = categories.filter(cat => !cat.parentId);

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
          {parentCategories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No categories found.
              </TableCell>
            </TableRow>
          ) : (
            parentCategories.map((cat, index) => (
              <React.Fragment key={cat.id || cat._id}>
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {cat.name} <Typography variant="caption" color="text.secondary">(Parent)</Typography>
                  </TableCell>
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
                {renderSubcategories(cat.id || cat._id)}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewCategories;
