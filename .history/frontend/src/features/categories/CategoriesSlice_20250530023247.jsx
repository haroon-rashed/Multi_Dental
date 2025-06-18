// src/features/categories/CategoriesSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCategories,
  fetchMainCategories,
  fetchSubCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from './CategoriesApi';

const initialState = {
  status: 'idle',
  categories: [],
  mainCategories: [],
  subCategories: [],
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

export const fetchMainCategoriesAsync = createAsyncThunk(
  'categories/fetchMainCategoriesAsync',
  async () => {
    const categories = await fetchMainCategories();
    return categories;
  }
);

export const fetchSubCategoriesAsync = createAsyncThunk(
  'categories/fetchSubCategoriesAsync',
  async () => {
    const subCategories = await fetchSubCategories();
    return subCategories;
  }
);

export const addCategoryAsync = createAsyncThunk(
  'categories/addCategoryAsync',
  async (categoryData, { dispatch }) => {
    const result = await addCategory(categoryData);
    // Refresh all lists to keep them in sync
    dispatch(fetchAllCategoriesAsync());
    dispatch(fetchMainCategoriesAsync());
    dispatch(fetchSubCategoriesAsync());
    return result;
  }
);

export const updateCategoryAsync = createAsyncThunk(
  'categories/updateCategoryAsync',
  async ({ id, updatedData }, { dispatch }) => {
    const result = await updateCategory({ id, updatedData });
    // Refresh all lists to keep them in sync
    dispatch(fetchAllCategoriesAsync());
    dispatch(fetchMainCategoriesAsync());
    dispatch(fetchSubCategoriesAsync());
    return result;
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'categories/deleteCategoryAsync',
  async (id, { dispatch }) => {
    await deleteCategory(id);
    // Refresh all lists to keep them in sync
    dispatch(fetchAllCategoriesAsync());
    dispatch(fetchMainCategoriesAsync());
    dispatch(fetchSubCategoriesAsync());
  }
);

// Slice
const categorySlice = createSlice({
  name: 'CategoriesSlice',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Categories
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
      })
      
      // Fetch Main Categories
      .addCase(fetchMainCategoriesAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchMainCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.mainCategories = action.payload;
      })
      .addCase(fetchMainCategoriesAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error;
      })
      
      // Fetch Sub Categories
      .addCase(fetchSubCategoriesAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchSubCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategoriesAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error;
      })
      
      // Add Category
      .addCase(addCategoryAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addCategoryAsync.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.errors = null;
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error;
      })
      
      // Update Category
      .addCase(updateCategoryAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateCategoryAsync.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.errors = null;
      })
      .addCase(updateCategoryAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error;
      })
      
      // Delete Category
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteCategoryAsync.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.errors = null;
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error;
      });
  },
});

// Actions
export const { clearErrors } = categorySlice.actions;

// Selectors
export const selectCategoryStatus = (state) => state.CategoriesSlice.status;
export const selectCategories = (state) => state.CategoriesSlice.categories;
export const selectMainCategories = (state) => state.CategoriesSlice.mainCategories;
export const selectSubCategories = (state) => state.CategoriesSlice.subCategories;
export const selectCategoryErrors = (state) => state.CategoriesSlice.errors;

export default categorySlice.reducer;