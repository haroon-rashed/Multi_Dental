import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Avatar, 
  Typography, Box, Chip, Button, Collapse
} from '@mui/material';
import { FaEdit, FaTrash, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight, FaEye, FaEyeSlash } from 'react-icons/fa';
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
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [showAllSubcategories, setShowAllSubcategories] = useState(true);

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

  // Toggle specific category expansion
  const toggleCategoryExpansion = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Toggle all subcategories visibility
  const toggleAllSubcategories = () => {
    setShowAllSubcategories(!showAllSubcategories);
    if (!showAllSubcategories) {
      // If showing all, expand all categories that have subcategories
      const allParentIds = parentCategories
        .filter(cat => getSubcategories(cat._id || cat.id).length > 0)
        .map(cat => cat._id || cat.id);
      setExpandedCategories(new Set(allParentIds));
    } else {
      // If hiding all, collapse all categories
      setExpandedCategories(new Set());
    }
  };

  // Get subcategories for a specific parent - FIXED LOGIC
  const getSubcategories = (parentId) => {
    return categories.filter(cat => {
      // Handle different ways parent_id might be stored
      const catParentId = cat.parent_id?._id || cat.parent_id;
      const parentIdStr = String(parentId);
      const catParentIdStr = String(catParentId);
      
      // Check if this category has a parent_id that matches the given parentId
      return catParentId && catParentId !== null && catParentIdStr === parentIdStr;
    });
  };

  // Get only parent categories - IMPROVED LOGIC
  const parentCategories = categories.filter(cat => {
    // A parent category is one that has no parent_id or parent_id is null
    const parentId = cat.parent_id?._id || cat.parent_id;
    return !parentId || parentId === null;
  });

  const renderSubcategories = (parentId, parentName) => {
    const subcategories = getSubcategories(parentId);
    const isExpanded = expandedCategories.has(parentId);
    const shouldShow = showAllSubcategories || isExpanded;
    
    if (subcategories.length === 0) return null;

    return (
      <Collapse in={shouldShow} timeout="auto" unmountOnExit>
        {subcategories.map((subcat, index) => (
          <TableRow 
            key={`sub-${subcat._id || subcat.id}`}
            sx={{ 
              backgroundColor: '#f8f9fa',
              borderLeft: '4px solid #007bff',
              '&:hover': { backgroundColor: '#e3f2fd' }
            }}
          >
            <TableCell sx={{ pl: 6 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                  ↳
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {index + 1}
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box display="flex" alignItems="center" gap={2} pl={2}>
                <FaFolder color="#ff9800" size={18} />
                <Box>
                  <Typography variant="body1" fontWeight={500} color="text.primary">
                    {subcat.name}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <Chip 
                      label="Subcategory" 
                      size="small" 
                      color="warning" 
                      variant="outlined"
                      sx={{ fontSize: '0.7rem', height: '18px' }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      of {parentName}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Avatar 
                src={subcat.categoryImage} 
                alt={subcat.name} 
                variant="rounded"
                sx={{ 
                  width: 45, 
                  height: 45,
                  border: '2px solid #e0e0e0'
                }}
              />
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="warning.main" fontWeight="500">
                Subcategory
              </Typography>
            </TableCell>
            <TableCell align="center">
              <IconButton 
                onClick={() => handleEdit(subcat._id || subcat.id)} 
                color="primary"
                size="small"
                title="Edit Subcategory"
              >
                <FaEdit />
              </IconButton>
              <IconButton 
                onClick={() => handleDelete(subcat._id || subcat.id, true)} 
                color="error"
                size="small"
                title="Delete Subcategory"
              >
                <FaTrash />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </Collapse>
    );
  };

  // Calculate total subcategories - FIXED
  const totalSubcategories = categories.filter(cat => {
    const parentId = cat.parent_id?._id || cat.parent_id;
    return parentId && parentId !== null;
  }).length;

  // Debug logging - you can remove this after testing
  console.log('All categories:', categories);
  console.log('Parent categories:', parentCategories);
  console.log('Total subcategories:', totalSubcategories);

  return (
    <Box sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Categories & Subcategories
        </Typography>
        
        {/* Toggle Button for All Subcategories */}
        <Button
          variant={showAllSubcategories ? "contained" : "outlined"}
          color="primary"
          startIcon={showAllSubcategories ? <FaEyeSlash /> : <FaEye />}
          onClick={toggleAllSubcategories}
          sx={{ ml: 2 }}
        >
          {showAllSubcategories ? 'Hide All Subcategories' : 'Show All Subcategories'}
        </Button>
      </Box>
      
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
                const categoryId = cat._id || cat.id;
                const subcategories = getSubcategories(categoryId);
                const isExpanded = expandedCategories.has(categoryId);
                
                return (
                  <React.Fragment key={categoryId}>
                    {/* Parent Category Row */}
                    <TableRow sx={{ 
                      '&:hover': { backgroundColor: '#f0f8ff' },
                      backgroundColor: subcategories.length > 0 ? '#fafafa' : 'inherit'
                    }}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body1" fontWeight="bold">
                            {index + 1}
                          </Typography>
                          {subcategories.length > 0 && (
                            <IconButton
                              size="small"
                              onClick={() => toggleCategoryExpansion(categoryId)}
                              title={isExpanded ? "Collapse subcategories" : "Expand subcategories"}
                            >
                              {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <FaFolderOpen color="#2196f3" size={22} />
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
                          sx={{ 
                            width: 60, 
                            height: 60,
                            border: '2px solid #2196f3'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="primary" fontWeight="bold">
                          Parent Category
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton 
                          onClick={() => handleEdit(categoryId)} 
                          color="primary"
                          title="Edit Category"
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete(categoryId)} 
                          color="error"
                          title="Delete Category"
                        >
                          <FaTrash />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    
                    {/* Subcategories Rows */}
                    {renderSubcategories(categoryId, cat.name)}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary Stats */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Chip 
          icon={<FaFolderOpen />}
          label={`${parentCategories.length} Main Categories`}
          color="primary"
          variant="filled"
        />
        <Chip 
          icon={<FaFolder />}
          label={`${totalSubcategories} Subcategories`}
          color="warning"
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