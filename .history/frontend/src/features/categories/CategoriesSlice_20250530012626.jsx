// src/features/categories/CategoriesSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from './CategoriesApi';

const initialState = {
  status: 'idle',
  categories: [],
  errors: null,
};

// Thunks
export const fetchAllCategoriesAsync = createAsyncThunk(
  'categories/fetchAllCategoriesAsync',
  async () => {
    const categories = await fetchAllCategories();
    return categories;
  }
);

export const addCategoryAsync = createAsyncThunk(
  'categories/addCategoryAsync',
  async (categoryData, { dispatch }) => {
    const result = await addCategory(categoryData);
    dispatch(fetchAllCategoriesAsync()); // Refresh list
    return result;
  }
);

export const updateCategoryAsync = createAsyncThunk(
  'categories/updateCategoryAsync',
  async ({ id, updatedData }, { dispatch }) => {
    const result = await updateCategory({ id, updatedData });
    dispatch(fetchAllCategoriesAsync()); // Refresh list
    return result;
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'categories/deleteCategoryAsync',
  async (id, { dispatch }) => {
    await deleteCategory(id);
    dispatch(fetchAllCategoriesAsync()); // Refresh list
  }
);

// Slice
const categorySlice = createSlice({
  name: 'CategoriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.categories = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error;
      });
  },
});

// Selectors
export const selectCategoryStatus = (state) => state.CategoriesSlice.status;
export const selectCategories = (state) => state.CategoriesSlice.categories;
export const selectCategoryErrors = (state) => state.CategoriesSlice.errors;

export default categorySlice.reducer;
