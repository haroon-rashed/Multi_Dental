import React, { useState, useEffect } from "react"; // Added useEffect import
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  selectBrands,
  fetchAllBrandsAsync,
  updateBrandAsync,
  createBrandAsync, // Changed from addBrandAsync to createBrandAsync
} from "../../brands/BrandSlice";

const AddBrand = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brands = useSelector(selectBrands);

  const [brandName, setBrandName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllBrandsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (id && brands.length > 0) {
      const existing = brands.find(
        (brand) => brand.id === id || brand._id === id
      );
      if (existing) {
        setBrandName(existing.name || "");
        setImagePreview(existing.image || "");
      }
    }
  }, [id, brands]);

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
    const trimmedName = brandName.trim();

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
      image: imageUrl,
    };

    try {
      if (id) {
        await dispatch(updateBrandAsync({ id, ...formData })).unwrap();
        toast.success("Brand updated successfully!");
      } else {
        await dispatch(createBrandAsync(formData)).unwrap(); // Changed to createBrandAsync
        toast.success("Brand added successfully!");
      }

      navigate("/admin/view-brands");
    } catch (err) {
      console.error("❌ Failed to save brand:", err);
      toast.error(err.message || "Save failed.");
    }
  };

  return (
    <AddBrandContainer>
      <Title>{id ? "Update Brand" : "Add New Brand"}</Title>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Brand Name *</Label>
          <Input
            type="text"
            placeholder="Enter brand name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Brand Image *</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!id}
          />
          <ImagePreview>
            {imagePreview ? (
              <img src={imagePreview} alt="Brand preview" />
            ) : (
              <PlaceholderText>Image preview will appear here</PlaceholderText>
            )}
          </ImagePreview>
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Uploading..." : id ? "Update Brand" : "Add Brand"}
        </SubmitButton>
      </form>
    </AddBrandContainer>
  );
};

export default AddBrand;

// Styled components (similar to your AddCategory styles)
const AddBrandContainer = styled.div`
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
