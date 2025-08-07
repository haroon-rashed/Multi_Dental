import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import { addProductAsync, resetProductAddStatus, selectProductAddStatus,updateProductByIdAsync } from '../../products/ProductSlice'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useForm } from "react-hook-form"
import { selectBrands } from '../../brands/BrandSlice'
import { selectCategories } from '../../categories/CategoriesSlice'
import { toast } from 'react-toastify'
import { axiosi } from '../../../config/axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your base URL

export const AddProduct = () => {

    const {register, handleSubmit, reset, watch, formState: { errors }} = useForm()
    const [subcategories, setSubcategories] = useState([]);
    const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);

    const dispatch=useDispatch()
    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const productAddStatus=useSelector(selectProductAddStatus)
    const navigate=useNavigate()
    const theme=useTheme()
    const is1100=useMediaQuery(theme.breakpoints.down(1100))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    // Watch category changes to load subcategories
    const selectedCategoryId = watch("category");

    // Effect to load subcategories when category changes
    useEffect(() => {
        const fetchSubcategories = async () => {
            if (!selectedCategoryId) {
                setSubcategories([]);
                return;
            }
            
            try {
                setIsLoadingSubcategories(true);
                const response = await axiosi.get(`/categories/${selectedCategoryId}/subcategories`);
                setSubcategories(response.data);
            } catch (error) {
                console.error("Error fetching subcategories:", error);
                console.error("Error details:", {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                    url: error.config?.url
                });
                toast.error("Failed to load subcategories. Please try again.");
                setSubcategories([]);
            } finally {
                setIsLoadingSubcategories(false);
            }
        };

        fetchSubcategories();
    }, [selectedCategoryId]);

    useEffect(()=>{
        if(productAddStatus==='fulfilled'){
            reset()
            toast.success("New product added")
            navigate("/admin/dashboard")
        }
        else if(productAddStatus==='rejected'){
            toast.error("Error adding product, please try again later")
        }
    },[productAddStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetProductAddStatus())
        }
    },[])

    const handleAddProduct=(data)=>{
        const newProduct={
            ...data,
            images:[data.image0, data.image1, data.image2, data.image3],
            // Only include subcategory if one is selected
            ...(data.subcategory && { subcategory: data.subcategory })
        }
        delete newProduct.image0
        delete newProduct.image1
        delete newProduct.image2
        delete newProduct.image3
        delete newProduct.subcategory // Remove the subcategory from the root level

        dispatch(addProductAsync(newProduct))
    }

    
  return (
    <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} >
        

        <Stack width={is1100?"100%":"60rem"} rowGap={4} mt={is480?4:6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddProduct)}> 
            
            {/* feild area */}
            <Stack rowGap={3}>
                <Stack>
                    <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
                    <TextField {...register("title",{required:'Title is required'})}/>
                </Stack> 

                <Stack flexDirection={'row'} >

                    <FormControl fullWidth>
                        <InputLabel id="brand-selection">Brand</InputLabel>
                        <Select {...register("brand",{required:"Brand is required"})} labelId="brand-selection" label="Brand">
                            
                            {
                                brands.map((brand)=>(
                                    <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>


                    <FormControl fullWidth>
                        <InputLabel id="category-selection">Category</InputLabel>
                        <Select 
                            {...register("category",{required:"Category is required"})} 
                            labelId="category-selection" 
                            label="Category"
                            defaultValue=""
                        >
                            <MenuItem value="" disabled>Select a category</MenuItem>
                            {categories.map((category)=>(
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </Stack>

                {/* Subcategory Select - Only show if there are subcategories */}
                {subcategories.length > 0 && (
                    <FormControl fullWidth>
                        <InputLabel id="subcategory-selection">Subcategory (Optional)</InputLabel>
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
                    <Typography variant='h6' fontWeight={400}  gutterBottom>Description</Typography>
                    <TextField multiline rows={4} {...register("description",{required:"Description is required"})}/>
                </Stack>

                <Stack flexDirection={'row'}>
                    <Stack flex={1}>
                        <Typography variant='h6' fontWeight={400}  gutterBottom>Price</Typography>
                        <TextField type='number' {...register("price",{required:"Price is required"})}/>
                    </Stack>
                    <Stack flex={1}>
                        <Typography variant='h6' fontWeight={400}  gutterBottom>Discount {is480?"%":"Percentage"}</Typography>
                        <TextField type='number' {...register("discountPercentage",{required:"discount percentage is required"})}/>
                    </Stack>
                </Stack>

                <Stack>
                    <Typography variant='h6'  fontWeight={400} gutterBottom>Stock Quantity</Typography>
                    <TextField type='number' {...register("stockQuantity",{required:"Stock Quantity is required"})}/>
                </Stack>
                <Stack>
                    <Typography variant='h6'  fontWeight={400} gutterBottom>Thumbnail</Typography>
                    <TextField {...register("thumbnail",{required:"Thumbnail is required"})}/>
                </Stack>

                <Stack>
                    <Typography variant='h6'  fontWeight={400} gutterBottom>Product Images</Typography>

                    <Stack rowGap={2}>
   
                        <TextField {...register("image0",{required:"Image is required"})}/>
                        <TextField {...register("image1",{required:"Image is required"})}/>
                        <TextField {...register("image2",{required:"Image is required"})}/>
                        <TextField {...register("image3",{required:"Image is required"})}/>
    
                    </Stack>

                </Stack>

            </Stack>

            {/* action area */}
            <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480?1:2}>
                <Button size={is480?'medium':'large'} variant='contained' type='submit'>Add Product</Button>
                <Button size={is480?'medium':'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
            </Stack>

        </Stack>

    </Stack>
  )
}
