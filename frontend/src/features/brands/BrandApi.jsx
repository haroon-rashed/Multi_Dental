import { axiosi } from "../../config/axios";

// Get all brands
export const fetchAllBrands = async () => {
  try {
    const res = await axiosi.get("/brands");
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create new brand
export const createBrand = async (brandData) => {
  try {
    const res = await axiosi.post("/brands", brandData);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update brand
export const updateBrand = async ({ id, ...brandData }) => {
  try {
    const res = await axiosi.put(`/brands/${id}`, brandData);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete brand
export const deleteBrand = async (id) => {
  try {
    const res = await axiosi.delete(`/brands/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
