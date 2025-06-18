import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { addCategory, updateCategory } from '../../categories/CategoriesApi';
import { fetchAllCategoriesAsync, selectCategories } from '../../categories/CategoriesSlice';

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
    console.log("Edit Category ID from URL:", id);
    if (id) {
      const existing = categories.find(cat => cat.id === id || cat._id === id);
      console.log("Found category for editing:", existing);

      if (existing) {
        setCategoryName(existing.name || '');
        setImagePreview(existing.categoryImage || '');
        setImage(null);
      } else {
        console.warn("No matching category found.");
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

////////////////////////////
// 💅 Styled Components
////////////////////////////

const AddCategoryContainer = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.75rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const PlaceholderText = styled.p`
  color: #aaa;
  text-align: center;
  font-style: italic;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: #9e9e9e;
  }
`;
