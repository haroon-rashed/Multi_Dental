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

  const toggleCategoryExpansion = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleAllSubcategories = () => {
    setShowAllSubcategories(!showAllSubcategories);
    if (!showAllSubcategories) {
      const allParentIds = parentCategories
        .filter(cat => getSubcategories(cat._id || cat.id).length > 0)
        .map(cat => cat._id || cat.id);
      setExpandedCategories(new Set(allParentIds));
    } else {
      setExpandedCategories(new Set());
    }
  };

  const getSubcategories = (parentId) => {
    return categories.filter(cat => {
      const catParentId = cat.parent_id?._id || cat.parent_id;
      const parentIdStr = String(parentId);
      const catParentIdStr = String(catParentId);
      return catParentId && catParentId !== null && catParentIdStr === parentIdStr;
    });
  };

  const parentCategories = categories.filter(cat => {
    const parentId = cat.parent_id?._id || cat.parent_id;
    return !parentId || parentId === null;
  });

  const renderSubcategories = (parentId, parentName) => {
    const subcategories = getSubcategories(parentId);
    const isExpanded = expandedCategories.has(parentId);
    const shouldShow = showAllSubcategories || isExpanded;
    
    if (subcategories.length === 0) return null;

    return (
      <Collapse 
        in={shouldShow} 
        timeout="auto" 
        unmountOnExit
        sx={{ 
          width: '100%',
          '& .MuiCollapse-wrapper': {
            width: '100%'
          },
          '& .MuiCollapse-wrapperInner': {
            width: '100%'
          }
        }}
      >
        <Box sx={{ width: '100%' }}>
          {subcategories.map((subcat, index) => (
            <TableRow 
              key={`sub-${subcat._id || subcat.id}`}
              sx={{ 
                backgroundColor: '#f8f9fa',
                borderLeft: '4px solid #ff9800',
                '&:hover': { backgroundColor: '#fff8e1' },
                width: '100%',
                display: 'table-row'
              }}
            >
              <TableCell sx={{ pl: 6, width: '10%', minWidth: '80px' }}>
                <Box display="flex" alignItems="center" gap={1} sx={{ flexWrap: 'nowrap' }}>
                  <Typography variant="body2" color="warning.main" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
                    ↳
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
                    {index + 1}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ width: '40%', minWidth: '250px' }}>
                <Box display="flex" alignItems="center" gap={2} sx={{ flexWrap: 'nowrap' }}>
                  <FaFolder color="#ff9800" size={22} style={{ flexShrink: 0 }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ 
                      wordBreak: 'break-word',
                      hyphens: 'auto'
                    }}>
                      {subcat.name}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={0.5} sx={{ flexWrap: 'wrap' }}>
                      <Chip 
                        label="Subcategory" 
                        size="small" 
                        color="warning" 
                        sx={{ fontSize: '0.7rem', height: '20px', flexShrink: 0 }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ 
                        wordBreak: 'break-word',
                        flex: 1,
                        minWidth: 0
                      }}>
                        of {parentName}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </TableCell>
              <TableCell sx={{ width: '15%', textAlign: 'center', minWidth: '100px' }}>
                <Avatar 
                  src={subcat.categoryImage} 
                  alt={subcat.name} 
                  variant="rounded"
                  sx={{ 
                    width: 60, 
                    height: 60,
                    border: '2px solid #ff9800',
                    margin: '0 auto'
                  }}
                />
              </TableCell>
              <TableCell sx={{ width: '15%', minWidth: '120px' }}>
                <Typography variant="body2" color="warning.main" fontWeight="bold">
                  Subcategory
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: '20%', minWidth: '150px' }}>
                <Box display="flex" justifyContent="center" gap={1} sx={{ flexWrap: 'nowrap' }}>
                  <IconButton 
                    onClick={() => handleEdit(subcat._id || subcat.id)} 
                    color="warning"
                    title="Edit Subcategory"
                    sx={{ flexShrink: 0 }}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(subcat._id || subcat.id, true)} 
                    color="error"
                    title="Delete Subcategory"
                    sx={{ flexShrink: 0 }}
                  >
                    <FaTrash />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </Box>
      </Collapse>
    );
  };

  const totalSubcategories = categories.filter(cat => {
    const parentId = cat.parent_id?._id || cat.parent_id;
    return parentId && parentId !== null;
  }).length;

  return (
    <Box sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Categories & Subcategories
        </Typography>
        
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
      
      <TableContainer component={Paper} sx={{ boxShadow: 3, width: '100%', overflowX: 'auto' }}>
        <Table sx={{ width: '100%', tableLayout: 'fixed', minWidth: '800px' }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ width: '10%', minWidth: '80px' }}><strong>#</strong></TableCell>
              <TableCell sx={{ width: '40%', minWidth: '250px' }}><strong>Category Name</strong></TableCell>
              <TableCell sx={{ width: '15%', minWidth: '100px', textAlign: 'center' }}><strong>Image</strong></TableCell>
              <TableCell sx={{ width: '15%', minWidth: '120px' }}><strong>Type</strong></TableCell>
              <TableCell sx={{ width: '20%', minWidth: '150px' }} align="center"><strong>Actions</strong></TableCell>
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
                      backgroundColor: subcategories.length > 0 ? '#fafafa' : 'inherit',
                      width: '100%',
                      display: 'table-row'
                    }}>
                      <TableCell sx={{ width: '10%', pl: 2 }}>
                        <Box display="flex" alignItems="center" gap={1} sx={{ flexWrap: 'nowrap' }}>
                          <Typography variant="body1" fontWeight="bold" sx={{ flexShrink: 0 }}>
                            {index + 1}
                          </Typography>
                          {subcategories.length > 0 && (
                            <IconButton
                              size="small"
                              onClick={() => toggleCategoryExpansion(categoryId)}
                              title={isExpanded ? "Collapse subcategories" : "Expand subcategories"}
                              sx={{ flexShrink: 0 }}
                            >
                              {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ width: '40%' }}>
                        <Box display="flex" alignItems="center" gap={2} sx={{ flexWrap: 'nowrap' }}>
                          <FaFolderOpen color="#2196f3" size={22} style={{ flexShrink: 0 }} />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ 
                              wordBreak: 'break-word',
                              hyphens: 'auto'
                            }}>
                              {cat.name}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1} mt={0.5} sx={{ flexWrap: 'wrap' }}>
                              <Chip 
                                label="Main Category" 
                                size="small" 
                                color="primary" 
                                sx={{ fontSize: '0.7rem', height: '20px', flexShrink: 0 }}
                              />
                              {subcategories.length > 0 && (
                                <Chip 
                                  label={`${subcategories.length} subcategorie${subcategories.length !== 1 ? 's' : ''}`}
                                  size="small" 
                                  color="info" 
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem', height: '20px', flexShrink: 0 }}
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ width: '15%', textAlign: 'center' }}>
                        <Avatar 
                          src={cat.categoryImage} 
                          alt={cat.name} 
                          variant="rounded"
                          sx={{ 
                            width: 60, 
                            height: 60,
                            border: '2px solid #2196f3',
                            margin: '0 auto'
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: '15%' }}>
                        <Typography variant="body2" color="primary" fontWeight="bold">
                          Parent Category
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ width: '20%' }}>
                        <Box display="flex" justifyContent="center" gap={1} sx={{ flexWrap: 'nowrap' }}>
                          <IconButton 
                            onClick={() => handleEdit(categoryId)} 
                            color="primary"
                            title="Edit Category"
                            sx={{ flexShrink: 0 }}
                          >
                            <FaEdit />
                          </IconButton>
                          <IconButton 
                            onClick={() => handleDelete(categoryId)} 
                            color="error"
                            title="Delete Category"
                            sx={{ flexShrink: 0 }}
                          >
                            <FaTrash />
                          </IconButton>
                        </Box>
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