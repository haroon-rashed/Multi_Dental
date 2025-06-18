import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { addCategory, updateCategory } from '../../categories/CategoriesApi';
import { fetchAllCategoriesAsync, selectCategories } from '../../categories/CategoriesSlice';

// 💅 Styled Components (same as yours, unchanged for brevity)

const AddCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);

  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && categories.length > 0) {
      const existing = categories.find(cat => cat.id === id || cat._id === id);
      if (existing) {
        console.log("🟢 Prefilling form with category:", existing);
        setCategoryName(existing.name || '');
        setImagePreview(existing.categoryImage || '');
        setImage(null);
      } else {
        console.log("⚠️ Category not found for id:", id);
      }
    }
  }, [id, categories]);

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
      console.error("❌ Image upload error:", err);
      toast.error("Image upload failed.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = categoryName.trim();
    if (!trimmedName || (!image && !imagePreview)) {
      toast.error("Please fill all fields.");
      return;
    }

    let imageUrl = imagePreview;
    if (image) {
      const uploadedUrl = await uploadImage();
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const formData = {
      name: trimmedName,
      categoryImage: imageUrl,
    };

    try {
      if (id) {
        await updateCategory(id, formData);
        toast.success("Category updated!");
      } else {
        await addCategory(formData);
        toast.success("Category added!");
      }

      dispatch(fetchAllCategoriesAsync());
      navigate('/admin/view-category');
    } catch (err) {
      console.error("❌ Failed to save category:", err);
      toast.error("Save failed.");
    }
  };

  return (
    <AddCategoryContainer>
      <Title>{id ? 'Update Category' : 'Add New Category'}</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Category Name</Label>
          <Input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Category Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!id}
          />
          <ImagePreview>
            {imagePreview ? (
              <img src={imagePreview} alt="Category preview" />
            ) : (
              <PlaceholderText>Image preview will appear here</PlaceholderText>
            )}
          </ImagePreview>
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Uploading...' : id ? 'Update Category' : 'Add Category'}
        </SubmitButton>
      </form>
    </AddCategoryContainer>
  );
};

export default AddCategory;
