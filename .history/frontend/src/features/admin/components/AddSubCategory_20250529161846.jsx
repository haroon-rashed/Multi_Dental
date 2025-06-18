import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { selectCategories } from "../../categories/CategoriesSlice";
import { useSelector } from "react-redux";

const AddSubCategory = () => {
  // const [categories, setCategories] = useState([]);
  const categories = useSelector(selectCategories)
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8000/api/categories");
  //       setCategories(res.data.categories); // adjust key as per your API response
  //     } catch (error) {
  //       console.error("Failed to fetch categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategoryId || !subCategoryName.trim()) {
      alert("Please select a category and enter a subcategory name.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/subcategories", {
        categoryId: selectedCategoryId,
        name: subCategoryName,
      });

      alert("Subcategory added successfully!");
      setSubCategoryName("");
      setSelectedCategoryId("");
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("Failed to add subcategory");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add Sub Category
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-select-label">Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            label="Select Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Sub Category Name"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="warning"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Sub Category
        </Button>
      </form>
    </Box>
  );
};

export default AddSubCategory;
