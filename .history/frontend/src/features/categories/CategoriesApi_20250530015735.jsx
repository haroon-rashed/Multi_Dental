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

export const addCategory = async (categoryData) => {
  try {
    // Sanitize parent_id
    if (categoryData.parent_id === "" || categoryData.parent_id === "null") {
      categoryData.parent_id = null;
    }

    const res = await axiosi.post("/categories/add", categoryData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


// Update a category (can include parent_id)
export const updateCategory = async ({ id, updatedData }) => {
  try {
    const res = await axiosi.put(`/categories/update/${id}`, updatedData);
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
