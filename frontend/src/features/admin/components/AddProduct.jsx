import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductAsync,
  resetProductAddStatus,
  selectProductAddStatus,
  updateProductByIdAsync,
} from "../../products/ProductSlice";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { selectBrands } from "../../brands/BrandSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { toast } from "react-toastify";
import { axiosi } from "../../../config/axios";

const API_BASE_URL = "http://localhost:5000/api";

export const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [subcategories, setSubcategories] = useState([]);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({
    thumbnail: null,
    image0: null,
    image1: null,
    image2: null,
    image3: null,
  });
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productAddStatus = useSelector(selectProductAddStatus);
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const selectedCategoryId = watch("category");

  const uploadImageToCloudinary = async (file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ls8frk5v"); // Replace with your upload preset

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwtsjgcyf/image/upload", // Replace with your cloud name
        {
          method: "POST",
          body: data,
        }
      );

      const imageData = await res.json();
      return imageData.url;
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleImageChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviews((prev) => ({
        ...prev,
        [fieldName]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategoryId) {
        setSubcategories([]);
        return;
      }

      try {
        setIsLoadingSubcategories(true);
        const response = await axiosi.get(
          `/categories/${selectedCategoryId}/subcategories`
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Failed to load subcategories. Please try again.");
        setSubcategories([]);
      } finally {
        setIsLoadingSubcategories(false);
      }
    };

    fetchSubcategories();
  }, [selectedCategoryId]);

  useEffect(() => {
    if (productAddStatus === "fulfilled") {
      reset();
      toast.success("New product added");
      navigate("/admin/dashboard");
    } else if (productAddStatus === "rejected") {
      toast.error("Error adding product, please try again later");
    }
  }, [productAddStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus());
    };
  }, []);

  const handleAddProduct = async (data) => {
    setUploading(true);

    try {
      // Upload thumbnail
      const thumbnailFile = data.thumbnail[0];
      const thumbnailUrl = await uploadImageToCloudinary(thumbnailFile);
      if (!thumbnailUrl) {
        toast.error("Thumbnail upload failed");
        return;
      }

      // Upload product images
      const imageUploads = [
        uploadImageToCloudinary(data.image0[0]),
        uploadImageToCloudinary(data.image1[0]),
        uploadImageToCloudinary(data.image2[0]),
        uploadImageToCloudinary(data.image3[0]),
      ];

      const imageUrls = await Promise.all(imageUploads);

      // Filter out any failed uploads
      const filteredImageUrls = imageUrls.filter((url) => url !== null);
      if (filteredImageUrls.length < 4) {
        toast.warning("Some images failed to upload");
      }

      const newProduct = {
        title: data.title,
        brand: data.brand,
        category: data.category,
        description: data.description,
        price: data.price,
        discountPercentage: data.discountPercentage,
        stockQuantity: data.stockQuantity,
        thumbnail: thumbnailUrl, // Make sure this is included
        images: filteredImageUrls,
        ...(data.subcategory && { subcategory: data.subcategory }),
      };

      dispatch(addProductAsync(newProduct));
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack
      p={"0 16px"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
    >
      <Stack
        width={is1100 ? "100%" : "60rem"}
        rowGap={4}
        mt={is480 ? 4 : 6}
        mb={6}
        component={"form"}
        noValidate
        onSubmit={handleSubmit(handleAddProduct)}
      >
        {/* field area */}
        <Stack rowGap={3}>
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Title
            </Typography>
            <TextField
              {...register("title", { required: "Title is required" })}
            />
          </Stack>

          <Stack flexDirection={"row"}>
            <FormControl fullWidth>
              <InputLabel id="brand-selection">Brand</InputLabel>
              <Select
                {...register("brand", { required: "Brand is required" })}
                labelId="brand-selection"
                label="Brand"
              >
                {brands.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="category-selection">Category</InputLabel>
              <Select
                {...register("category", { required: "Category is required" })}
                labelId="category-selection"
                label="Category"
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {subcategories.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="subcategory-selection">
                Subcategory (Optional)
              </InputLabel>
              <Select
                {...register("subcategory")}
                labelId="subcategory-selection"
                label="Subcategory (Optional)"
                disabled={isLoadingSubcategories}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {subcategories.map((subcategory) => (
                  <MenuItem key={subcategory._id} value={subcategory._id}>
                    {subcategory.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Description
            </Typography>
            <TextField
              multiline
              rows={4}
              {...register("description", {
                required: "Description is required",
              })}
            />
          </Stack>

          <Stack flexDirection={"row"}>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Price
              </Typography>
              <TextField
                type="number"
                {...register("price", { required: "Price is required" })}
              />
            </Stack>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Discount {is480 ? "%" : "Percentage"}
              </Typography>
              <TextField
                type="number"
                {...register("discountPercentage", {
                  required: "discount percentage is required",
                })}
              />
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Stock Quantity
            </Typography>
            <TextField
              type="number"
              {...register("stockQuantity", {
                required: "Stock Quantity is required",
              })}
            />
          </Stack>

          {/* Thumbnail Upload */}
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Thumbnail *
            </Typography>
            <TextField
              type="file"
              inputProps={{ accept: "image/*" }}
              {...register("thumbnail", { required: "Thumbnail is required" })}
              onChange={(e) => handleImageChange(e, "thumbnail")}
            />
            {imagePreviews.thumbnail && (
              <img
                src={imagePreviews.thumbnail}
                alt="Thumbnail preview"
                style={{
                  marginTop: "10px",
                  maxWidth: "200px",
                  maxHeight: "200px",
                }}
              />
            )}
          </Stack>

          {/* Product Images Upload */}
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Product Images *
            </Typography>
            <Stack rowGap={2}>
              {[0, 1, 2, 3].map((index) => (
                <Stack key={index}>
                  <TextField
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    {...register(`image${index}`, {
                      required: "Image is required",
                    })}
                    onChange={(e) => handleImageChange(e, `image${index}`)}
                  />
                  {imagePreviews[`image${index}`] && (
                    <img
                      src={imagePreviews[`image${index}`]}
                      alt={`Product ${index} preview`}
                      style={{
                        marginTop: "10px",
                        maxWidth: "200px",
                        maxHeight: "200px",
                      }}
                    />
                  )}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>

        {/* action area */}
        <Stack
          flexDirection={"row"}
          alignSelf={"flex-end"}
          columnGap={is480 ? 1 : 2}
        >
          <Button
            size={is480 ? "medium" : "large"}
            variant="contained"
            type="submit"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Product"}
          </Button>
          <Button
            size={is480 ? "medium" : "large"}
            variant="outlined"
            color="error"
            component={Link}
            to={"/admin/dashboard"}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
