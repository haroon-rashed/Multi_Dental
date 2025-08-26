import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProductAsync,
  resetProductAddStatus,
  selectProductAddStatus,
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
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      subcategory: "",
      title: "",
      description: "",
      price: "",
      discountPercentage: "",
      stockQuantity: "",
      brand: "",
      thumbnail: "",
      image0: "",
      image1: "",
      image2: "",
      image3: "",
    },
  });

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
  const fileInputRefs = {
    thumbnail: useRef(null),
    image0: useRef(null),
    image1: useRef(null),
    image2: useRef(null),
    image3: useRef(null),
  };

  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productAddStatus = useSelector(selectProductAddStatus);
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  const selectedCategoryId = watch("category");

  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ls8frk5v");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwtsjgcyf/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const imageData = await res.json();
      if (!imageData.url) {
        throw new Error("Image upload failed");
      }
      return imageData.url;
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviews((prev) => ({
        ...prev,
        [fieldName]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    reset({
      category: "",
      subcategory: "",
      title: "",
      description: "",
      price: "",
      discountPercentage: "",
      stockQuantity: "",
      brand: "",
      thumbnail: "",
      image0: "",
      image1: "",
      image2: "",
      image3: "",
    });
    setImagePreviews({
      thumbnail: null,
      image0: null,
      image1: null,
      image2: null,
      image3: null,
    });
    Object.values(fileInputRefs).forEach((ref) => {
      if (ref.current) {
        ref.current.value = "";
      }
    });
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
    setValue("subcategory", "");
  }, [selectedCategoryId, setValue]);

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus());
    };
  }, [dispatch]);

  const handleAddProduct = async (data) => {
    setUploading(true);

    try {
      // Upload thumbnail (required)
      const thumbnailFile = data.thumbnail[0];
      const thumbnailUrl = await uploadImageToCloudinary(thumbnailFile);
      if (!thumbnailUrl) {
        toast.error("Thumbnail upload failed");
        return;
      }

      // Upload product images (image0 required, others optional)
      const imageUploads = [
        uploadImageToCloudinary(data.image0[0]),
        data.image1[0]
          ? uploadImageToCloudinary(data.image1[0])
          : Promise.resolve(null),
        data.image2[0]
          ? uploadImageToCloudinary(data.image2[0])
          : Promise.resolve(null),
        data.image3[0]
          ? uploadImageToCloudinary(data.image3[0])
          : Promise.resolve(null),
      ];

      const imageUrls = await Promise.all(imageUploads);

      // Check for failed uploads (only for provided images)
      const providedImages = [
        data.image0[0],
        data.image1[0],
        data.image2[0],
        data.image3[0],
      ];
      const failedUploads = imageUrls
        .map((url, index) =>
          providedImages[index] && url === null ? index : null
        )
        .filter((index) => index !== null);

      if (!imageUrls[0]) {
        toast.error("Image 0 upload failed");
        return;
      }
      if (failedUploads.length > 0) {
        toast.warning(
          `Image${failedUploads.length > 1 ? "s" : ""} ${failedUploads.join(
            ", "
          )} failed to upload`
        );
      }

      // Filter out null URLs
      const filteredImageUrls = imageUrls.filter((url) => url !== null);

      // Use subcategory ID if selected, otherwise category ID
      const categoryId = data.subcategory || data.category;

      const newProduct = {
        title: data.title,
        brand: data.brand,
        category: categoryId,
        description: data.description,
        price: parseFloat(data.price),
        discountPercentage: parseFloat(data.discountPercentage),
        stockQuantity: parseInt(data.stockQuantity, 10),
        thumbnail: thumbnailUrl,
        images: filteredImageUrls,
      };

      // Dispatch product addition and wait for result
      await dispatch(addProductAsync(newProduct)).unwrap();

      // Reset form and show success toast
      resetForm();
      toast.success("New product added");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product, please try again later");
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
        <Stack rowGap={3}>
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Title
            </Typography>
            <TextField
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Stack>

          <Stack flexDirection={"row"} columnGap={2}>
            <FormControl fullWidth>
              <InputLabel id="brand-selection">Brand </InputLabel>
              <Select
                {...register("brand", { required: "Brand is required" })}
                labelId="brand-selection"
                label="Brand *"
                error={!!errors.brand}
                helperText={errors.brand?.message}
              >
                {brands.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="category-label">Category *</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                label="Category *"
                {...register("category", { required: "Category is required" })}
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {categories
                  .filter((category) => !category.parent_id)
                  .map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Stack>

          {selectedCategoryId && subcategories.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="subcategory-label">
                Subcategory (Optional)
              </InputLabel>
              <Select
                labelId="subcategory-label"
                id="subcategory"
                label="Subcategory (Optional)"
                {...register("subcategory")}
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
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Stack>

          <Stack flexDirection={"row"} columnGap={2}>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Price
              </Typography>
              <TextField
                type="number"
                {...register("price", { required: "Price is required" })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Stack>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Discount {is480 ? "%" : "Percentage"}
              </Typography>
              <TextField
                type="number"
                {...register("discountPercentage", {
                  required: "Discount percentage is required",
                })}
                error={!!errors.discountPercentage}
                helperText={errors.discountPercentage?.message}
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
              error={!!errors.stockQuantity}
              helperText={errors.stockQuantity?.message}
            />
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Thumbnail *
            </Typography>
            <TextField
              type="file"
              inputProps={{ accept: "image/*" }}
              {...register("thumbnail", { required: "Thumbnail is required" })}
              inputRef={fileInputRefs.thumbnail}
              onChange={(e) => handleImageChange(e, "thumbnail")}
              error={!!errors.thumbnail}
              helperText={errors.thumbnail?.message}
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

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Product Images (First image required, others optional)
            </Typography>
            <Stack rowGap={2}>
              {[0, 1, 2, 3].map((index) => (
                <Stack key={index}>
                  <TextField
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    {...register(`image${index}`, {
                      required: index === 0 ? "Image 0 is required" : false,
                    })}
                    inputRef={fileInputRefs[`image${index}`]}
                    onChange={(e) => handleImageChange(e, `image${index}`)}
                    error={!!errors[`image${index}`]}
                    helperText={errors[`image${index}`]?.message}
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
