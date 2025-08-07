import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosi } from "../../config/axios";

// API Functions
export const fetchAllBrands = async () => {
  try {
    const res = await axiosi.get("/brands");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createBrand = async (brandData) => {
  try {
    const res = await axiosi.post("/brands", brandData);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateBrand = async ({ id, ...brandData }) => {
  try {
    const res = await axiosi.put(`/brands/${id}`, brandData);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteBrand = async (id) => {
  try {
    const res = await axiosi.delete(`/brands/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Slice Configuration
const initialState = {
  status: "idle",
  brands: [],
  errors: null,
  operationStatus: "idle",
  operationError: null,
};

export const fetchAllBrandsAsync = createAsyncThunk(
  "brands/fetchAllBrandsAsync",
  async () => {
    return await fetchAllBrands();
  }
);

export const createBrandAsync = createAsyncThunk(
  "brands/createBrandAsync",
  async (brandData) => {
    return await createBrand(brandData);
  }
);

export const updateBrandAsync = createAsyncThunk(
  "brands/updateBrandAsync",
  async ({ id, ...brandData }) => {
    return await updateBrand({ id, ...brandData });
  }
);

export const deleteBrandAsync = createAsyncThunk(
  "brands/deleteBrandAsync",
  async (id) => {
    return await deleteBrand(id);
  }
);

const brandSlice = createSlice({
  name: "BrandSlice", // Must match exactly how it's registered in store
  initialState,
  reducers: {
    resetOperationStatus: (state) => {
      state.operationStatus = "idle";
      state.operationError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Brands
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = action.payload;
      })
      .addCase(fetchAllBrandsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.error;
      })

      // Create Brand
      .addCase(createBrandAsync.pending, (state) => {
        state.operationStatus = "loading";
      })
      .addCase(createBrandAsync.fulfilled, (state, action) => {
        state.operationStatus = "succeeded";
        state.brands.push(action.payload);
      })
      .addCase(createBrandAsync.rejected, (state, action) => {
        state.operationStatus = "failed";
        state.operationError = action.error;
      })

      // Update Brand
      .addCase(updateBrandAsync.pending, (state) => {
        state.operationStatus = "loading";
      })
      .addCase(updateBrandAsync.fulfilled, (state, action) => {
        state.operationStatus = "succeeded";
        const index = state.brands.findIndex(
          (brand) => brand._id === action.payload._id
        );
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
      })
      .addCase(updateBrandAsync.rejected, (state, action) => {
        state.operationStatus = "failed";
        state.operationError = action.error;
      })

      // Delete Brand
      .addCase(deleteBrandAsync.pending, (state) => {
        state.operationStatus = "loading";
      })
      .addCase(deleteBrandAsync.fulfilled, (state, action) => {
        state.operationStatus = "succeeded";
        state.brands = state.brands.filter(
          (brand) => brand._id !== action.meta.arg
        );
      })
      .addCase(deleteBrandAsync.rejected, (state, action) => {
        state.operationStatus = "failed";
        state.operationError = action.error;
      });
  },
});

// Action and Selector Exports
export const { resetOperationStatus } = brandSlice.actions;

// Selectors must use "BrandSlice" to match store configuration
export const selectBrandStatus = (state) => state.BrandSlice.status;
export const selectBrands = (state) => state.BrandSlice.brands;
export const selectBrandErrors = (state) => state.BrandSlice.errors;
export const selectOperationStatus = (state) => state.BrandSlice.operationStatus;
export const selectOperationError = (state) => state.BrandSlice.operationError;

export default brandSlice.reducer;