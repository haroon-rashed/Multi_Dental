const express=require("express")
const categoryController=require("../controllers/Category")
const router=express.Router()

router
    .get("/",categoryController.getAll)
    .post("/add", categoryController.addCategory)
    .put("/update/:id", categoryController.updateCategory)
    .delete("/delete/:id", categoryController.deleteCategory)

    
module.exports=router