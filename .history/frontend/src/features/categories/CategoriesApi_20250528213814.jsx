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
      const res = await axiosi.post("/categories/add", categoryData);
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  

// Delete a category by ID
export const deleteCategory = async (id) => {
  try {
    await axiosi.delete(`/categories/delete/${id}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
