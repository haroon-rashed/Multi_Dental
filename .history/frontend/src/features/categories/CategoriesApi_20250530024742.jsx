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

// Fetch only main categories (parent_id: null)
export const fetchMainCategories = async () => {
  try {
    const res = await axiosi.get("/categories/categories");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch only subcategories (parent_id: not null)
export const fetchSubCategories = async () => {
  try {
    const res = await axiosi.get("/categories/subcategories");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addCategory = async (categoryData) => {
  try {
    // Sanitize parent_id
    if (categoryData.parent_id === "" || categoryData.parent_id === "null" || categoryData.parent_id === "undefined") {
      categoryData.parent_id = null;
    }
    const res = await axiosi.post("/categories/add", categoryData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateCategory = async ({ id, updatedData }) => {
  try {
    if (updatedData.parent_id === "" || updatedData.parent_id === "null" || updatedData.parent_id === "undefined") {
      updatedData.parent_id = null;
    }
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