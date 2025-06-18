const express=require("express")
const categoryController=require("../controllers/Category")
const router=express.Router()

router
    .get("/",categoryController.getAll)
    .post("/add", categoryController.addCategory)
    .put("/add", categoryController.updateCategory)
    .delete("/add", categoryController.deleteCategory)

    
module.exports=router