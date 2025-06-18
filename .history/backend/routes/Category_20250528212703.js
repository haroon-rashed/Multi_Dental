const express=require("express")
const categoryController=require("../controllers/Category")
const router=express.Router()

router
    .get("/",categoryController.getAll)
    .post("/add", categoryController.addCategory);
    .post("/add", categoryController.updatedCategory);
    .post("/add", categoryController.deleteCategory);

    
module.exports=router