import React, { useState } from 'react';
import styled from 'styled-components';
import { addCategory } from '../../features/categories/CategoriesApi';
import { useDispatch } from 'react-redux';
import { fetchAllCategoriesAsync } from '../../features/categories/CategoriesSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

// ...Styled components (same as before)...

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ls8frk5v");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwtsjgcyf/image/upload",
        data
      );

      return response.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName || !image) return;

    const imageUrl = await uploadImage();
    if (!imageUrl) return;

    const formData = {
      name: categoryName,
      categoryImage: imageUrl,
    };

    try {
      await addCategory(formData);
      dispatch(fetchAllCategoriesAsync());
      toast.success("Category added successfully!");
      setCategoryName('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Failed to add category:", error);
      toast.error("Failed to add category");
    }
  };

  return (
    <AddCategoryContainer>
      <Title>Add New Category</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="categoryName">Category Name</Label>
          <Input
            id="categoryName"
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="categoryImage">Category Image</Label>
          <Input
            id="categoryImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <ImagePreview>
            {imagePreview ? (
              <img src={imagePreview} alt="Category preview" />
            ) : (
              <PlaceholderText>Image preview will appear here</PlaceholderText>
            )}
          </ImagePreview>
        </FormGroup>

        <SubmitButton type="submit" disabled={loading || !categoryName || !image}>
          {loading ? "Uploading..." : "Add Category"}
        </SubmitButton>
      </form>
    </AddCategoryContainer>
  );
};

export default AddCategory;
