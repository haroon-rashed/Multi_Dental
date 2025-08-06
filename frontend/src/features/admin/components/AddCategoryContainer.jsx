import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { addCategoryAsync, updateCategoryAsync } from '../../categories/CategoriesSlice';
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
  const [parentId, setParentId] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPopular, setIsPopular] = useState(false);

  // Get only main categories (parent_id is null) for the dropdown
  const mainCategories = categories.filter(cat => !cat.parent_id);

  useEffect(() => {
    // Fetch categories when component mounts
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (id && categories.length > 0) {
      const existing = categories.find(cat => cat.id === id || cat._id === id);
      if (existing) {
        setCategoryName(existing.name || '');
        setImagePreview(existing.categoryImage || '');
        setParentId(existing.parent_id || '');
        setIsFeatured(!!existing.isFeatured);
        setIsPopular(!!existing.isPopular);
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
      data.append("upload_preset", "ls8frk5v"); // Replace with your Cloudinary preset

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dwtsjgcyf/image/upload", // Replace with your Cloudinary cloud name
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
      toast.error("Please fill all required fields.");
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
      parent_id: parentId || null, // Use parent_id to match backend field
      isFeatured: Boolean(isFeatured),
      isPopular: Boolean(isPopular)
    };

    try {
      if (id) {
        await dispatch(updateCategoryAsync({ id, updatedData: formData })).unwrap();
        toast.success("Category updated successfully!");
      } else {
        await dispatch(addCategoryAsync(formData)).unwrap();
        toast.success(`${parentId ? 'Subcategory' : 'Category'} added successfully!`);
      }

      navigate('/admin/view-category');
    } catch (err) {
      console.error("❌ Failed to save category:", err);
      toast.error(err.message || "Save failed.");
    }
  };

  const handleParentChange = (e) => {
    setParentId(e.target.value);
  };

  return (
    <AddCategoryContainer>
      <Title>
        {id 
          ? 'Update Category' 
          : parentId 
            ? 'Add New Subcategory' 
            : 'Add New Category'
        }
      </Title>
      
      {parentId && (
        <CategoryInfo>
          <InfoText>
            This will be created as a <strong>subcategory</strong> under: 
            <strong> {mainCategories.find(cat => (cat._id || cat.id) === parentId)?.name}</strong>
          </InfoText>
        </CategoryInfo>
      )}
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Category Name *</Label>
          <Input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Parent Category (optional)</Label>
          <Select
            value={parentId}
            onChange={handleParentChange}
          >
            <option value="">-- None (Main Category) --</option>
            {mainCategories
              .filter(cat => (cat.id || cat._id) !== id) // prevent setting self as parent
              .map(cat => (
                <option key={cat.id || cat._id} value={cat.id || cat._id}>
                  {cat.name}
                </option>
              ))}
          </Select>
          <HelpText>
            {parentId 
              ? "Selected category will be the parent of this subcategory" 
              : "Leave empty to create a main category"
            }
          </HelpText>
        </FormGroup>

        <FormGroup>
          <Label>Category Image *</Label>
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

        <FormGroup>
          <Label>Category Options</Label>
          <CheckboxContainer>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <CheckboxText>Featured Category</CheckboxText>
            </CheckboxLabel>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
              />
              <CheckboxText>Popular Category</CheckboxText>
            </CheckboxLabel>
          </CheckboxContainer>
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading 
            ? 'Uploading...' 
            : id 
              ? 'Update Category' 
              : parentId 
                ? 'Add Subcategory'
                : 'Add Category'
          }
        </SubmitButton>
      </form>
    </AddCategoryContainer>
  );
};

export default AddCategory;

// ---------------- Styled Components ----------------

const AddCategoryContainer = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.75rem;
  color: #333;
`;

const CategoryInfo = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
  border-radius: 4px;
`;

const InfoText = styled.p`
  margin: 0;
  color: #1565c0;
  font-size: 0.9rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }
`;

const HelpText = styled.small`
  display: block;
  margin-top: 0.5rem;
  color: #666;
  font-style: italic;
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ddd;
  }
`;

const PlaceholderText = styled.span`
  color: #666;
  font-style: italic;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  padding: 4px 0;
  transition: all 0.2s;
  border-radius: 4px;
  padding: 8px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #00A8CC;
`;

const CheckboxText = styled.span`
  font-size: 15px;
  color: #333;
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
  transition: background-color 0.3s;

  &:hover:not(:disabled) {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #9e9e9e;
    cursor: not-allowed;
  }
`;