import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { addCategory, updateCategory } from '../../categories/CategoriesApi';
import { fetchAllCategoriesAsync, selectCategories } from '../../categories/CategoriesSlice';

const AddCategoryContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h2`
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f7fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #cbd5e0;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const PlaceholderText = styled.p`
  color: #a0aec0;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a67d8;
  }

  &:disabled {
    background-color: #c3dafe;
    cursor: not-allowed;
  }
`;

const AddCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = useSelector(selectCategories);

  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load existing category if editing
  useEffect(() => {
    if (id) {
      const existing = categories.find(cat => cat.id === id || cat._id === id);
      if (existing) {
        setCategoryName(existing.name);
        setImagePreview(existing.categoryImage);
      }
    }
  }, [id, categories]);

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
    if (!categoryName || (!image && !imagePreview)) return;

    let imageUrl = imagePreview;

    if (image) {
      const uploadedUrl = await uploadImage();
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const formData = {
      name: categoryName,
      categoryImage: imageUrl,
    };

    try {
      if (id) {
        await updateCategory(id, formData);
        toast.success("Category updated successfully!");
      } else {
        await addCategory(formData);
        toast.success("Category added successfully!");
      }

      dispatch(fetchAllCategoriesAsync());
      setCategoryName('');
      setImage(null);
      setImagePreview(null);
      navigate('/admin/categories'); // redirect after save
    } catch (error) {
      console.error("Failed to save category:", error);
      toast.error("Failed to save category");
    }
  };

  return (
    <AddCategoryContainer>
      <Title>{id ? 'Update Category' : 'Add New Category'}</Title>
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

        <SubmitButton type="submit" disabled={loading || !categoryName || (!image && !imagePreview)}>
          {loading
            ? 'Uploading...'
            : id
            ? 'Update Category'
            : 'Add Category'}
        </SubmitButton>
      </form>
    </AddCategoryContainer>
  );
};

export default AddCategory;
