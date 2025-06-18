// src/features/categories/CategoriesApi.js
import { axiosi } from "../../config/axios";

// Fetch all categories
export const fetchAllCategories = async () => {
  try {
    const res = await axiosi.get("/categories");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add a category
export const addCategory = async (categoryData) => {
  try {
    const res = await axiosi.post("/categories/add", categoryData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a category
export const updateCategory = async ({ id, updatedData }) => {
  try {
    const res = await axiosi.put(`/categories/update/${id}`, updatedData);
    console.log("Update response:", res.data);
    console.log('id', id)
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a category
export const deleteCategory = async (id) => {
  try {
    await axiosi.delete(`/categories/delete/${id}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
