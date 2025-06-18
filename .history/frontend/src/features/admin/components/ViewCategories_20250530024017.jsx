import React, { useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Avatar, 
  Typography, Box, Chip
} from '@mui/material';
import { FaEdit, FaTrash, FaFolder, FaFolderOpen } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  selectCategories,
  deleteCategoryAsync,
  fetchAllCategoriesAsync,
} from '../../categories/CategoriesSlice';

const ViewCategories = () => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  const handleDelete = (id, isSubcategory = false) => {
    const categoryType = isSubcategory ? 'subcategory' : 'category';
    if (window.confirm(`Are you sure you want to delete this ${categoryType}?`)) {
      dispatch(deleteCategoryAsync(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-category/${id}`);
  };

  // Get subcategories for a specific parent
  const getSubcategories = (parentId) => {
    return categories.filter(cat => cat.parent_id === parentId);
  };

  // Get only parent categories (parent_id is null)
  const parentCategories = categories.filter(cat => !cat.parent_id);

  const renderSubcategories = (parentId) => {
    const subcategories = getSubcategories(parentId);
    
    return subcategories.map((subcat, index) => (
      <TableRow 
        key={subcat.id || subcat._id} 
        sx={{ 
          backgroundColor: '#f8f9fa',
          '&:hover': { backgroundColor: '#e9ecef' }
        }}
      >
        <TableCell sx={{ pl: 4 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" color="text.secondary">
              ↳
            </Typography>
            <Typography variant="body2">
              {index + 1}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center" gap={2} pl={3}>
            <FaFolder color="#ffc107" size={16} />
            <Box>
              <Typography variant="body1" fontWeight={500}>
                {subcat.name}
              </Typography>
              <Chip 
                label="Subcategory" 
                size="small" 
                color="secondary" 
                variant="outlined"
                sx={{ mt: 0.5, fontSize: '0.7rem', height: '20px' }}
              />
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Avatar 
            src={subcat.categoryImage} 
            alt={subcat.name} 
            variant="rounded"
            sx={{ width: 50, height: 50 }}
          />
        </TableCell>
        <TableCell>
          <Typography variant="caption" color="text.secondary">
            Parent: {parentCategories.find(p => (p._id || p.id) === parentId)?.name}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <IconButton 
            onClick={() => handleEdit(subcat.id || subcat._id)} 
            color="primary"
            size="small"
            title="Edit Subcategory"
          >
            <FaEdit />
          </IconButton>
          <IconButton 
            onClick={() => handleDelete(subcat.id || subcat._id, true)} 
            color="error"
            size="small"
            title="Delete Subcategory"
          >
            <FaTrash />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Categories & Subcategories
      </Typography>
      
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>#</strong></TableCell>
              <TableCell><strong>Category Name</strong></TableCell>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parentCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="h6" color="text.secondary">
                    No categories found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              parentCategories.map((cat, index) => {
                const subcategories = getSubcategories(cat.id || cat._id);
                
                return (
                  <React.Fragment key={cat.id || cat._id}>
                    {/* Parent Category Row */}
                    <TableRow sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                      <TableCell>
                        <Typography variant="body1" fontWeight="bold">
                          {index + 1}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <FaFolderOpen color="#2196f3" size={20} />
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              {cat.name}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                              <Chip 
                                label="Main Category" 
                                size="small" 
                                color="primary" 
                                sx={{ fontSize: '0.7rem', height: '20px' }}
                              />
                              {subcategories.length > 0 && (
                                <Chip 
                                  label={`${subcategories.length} subcategorie${subcategories.length !== 1 ? 's' : ''}`}
                                  size="small" 
                                  color="info" 
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem', height: '20px' }}
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Avatar 
                          src={cat.categoryImage} 
                          alt={cat.name} 
                          variant="rounded"
                          sx={{ width: 60, height: 60 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="primary" fontWeight="bold">
                          Parent Category
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton 
                          onClick={() => handleEdit(cat.id || cat._id)} 
                          color="primary"
                          title="Edit Category"
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete(cat.id || cat._id)} 
                          color="error"
                          title="Delete Category"
                        >
                          <FaTrash />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    
                    {/* Subcategories Rows */}
                    {renderSubcategories(cat.id || cat._id)}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary Stats */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Chip 
          icon={<FaFolderOpen />}
          label={`${parentCategories.length} Main Categories`}
          color="primary"
          variant="filled"
        />
        <Chip 
          icon={<FaFolder />}
          label={`${categories.filter(cat => cat.parent_id).length} Subcategories`}
          color="secondary"
          variant="filled"
        />
        <Chip 
          label={`${categories.length} Total Categories`}
          color="success"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default ViewCategories;