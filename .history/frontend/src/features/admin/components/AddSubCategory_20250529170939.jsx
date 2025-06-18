import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { selectCategories } from "../../categories/CategoriesSlice";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const AddSubCategory = () => {
  const categories = useSelector(selectCategories);
  const location = useLocation();
  const navigate = useNavigate();
  const editData = location.state?.subcategory;

  const [selectedCategoryId, setSelectedCategoryId] = useState(editData?.categoryId?._id || "");
  const [subCategoryName, setSubCategoryName] = useState(editData?.name || "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(editData?.subCategoryImage || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setSubCategoryName(editData.name);
      setSelectedCategoryId(editData.categoryId?._id || "");
      setImagePreview(editData.subCategoryImage || "");
    }
  }, [editData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ls8frk5v");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dwtsjgcyf/image/upload",
        data
      );
      return res.data.url;
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Image upload failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategoryId || !subCategoryName.trim()) {
      toast.error("Please select a category and enter a subcategory name.");
      return;
    }

    let imageUrl = imagePreview;

    if (image) {
      const uploadedUrl = await uploadImage();
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    try {
      if (editData) {
        // Update mode
        await axios.put(`http://localhost:8000/api/subcategories/${editData._id}`, {
          categoryId: selectedCategoryId,
          name: subCategoryName,
          subCategoryImage: imageUrl,
        });
        toast.success("Subcategory updated successfully!");
      } else {
        // Create mode
        await axios.post("http://localhost:8000/api/subcategories", {
          categoryId: selectedCategoryId,
          name: subCategoryName,
          subCategoryImage: imageUrl,
        });
        toast.success("Subcategory added successfully!");
      }

      // Reset or navigate
      navigate("/view-subcategories"); // go back to list page
    } catch (error) {
      console.error("Error saving subcategory:", error);
      toast.error("Failed to save subcategory");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3, boxShadow: 2, borderRadius: 2, backgroundColor: "#fff" }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        {editData ? "Edit Sub Category" : "Add Sub Category"}
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
              <MenuItem key={cat._id || cat.id} value={cat._id || cat.id}>
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

        <FormControl fullWidth margin="normal">
          <InputLabel shrink>Sub Category Image</InputLabel>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <ImagePreview>
              <img src={imagePreview} alt="Preview" />
            </ImagePreview>
          )}
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Uploading..." : editData ? "Update Sub Category" : "Add Sub Category"}
        </Button>
      </form>
    </Box>
  );
};

export default AddSubCategory;

const ImagePreview = styled.div`
  margin-top: 1rem;
  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
