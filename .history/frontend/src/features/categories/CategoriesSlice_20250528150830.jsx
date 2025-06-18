import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllCategories, deleteCategory } from './CategoriesApi';

// Initial state
const initialState = {
  status: 'idle',
  categories: [],
  errors: null,
};

// Async thunk to fetch all categories
export const fetchAllCategoriesAsync = createAsyncThunk(
  'categories/fetchAllCategoriesAsync',
  async () => {
    const categories = await fetchAllCategories();
    return categories;
  }
);

// Optional: Async thunk to delete a category (if you want to use it via dispatch)
export const deleteCategoryAsync = createAsyncThunk(
  'categories/deleteCategoryAsync',
  async (id, { dispatch }) => {
    await deleteCategory(id);
    dispatch(fetchAllCategoriesAsync()); // Refetch after delete
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

// Export reducer
export default categorySlice.reducer;
