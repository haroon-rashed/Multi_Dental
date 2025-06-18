const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/SubCategory");

// CREATE
router.post("/", subCategoryController.createSubCategory);

// READ ALL
router.get("/", subCategoryController.getAllSubCategories);

// READ ONE
router.get("/:id", subCategoryController.getSubCategoryById);

// UPDATE
router.put("/:id", subCategoryController.updateSubCategory);

// DELETE
router.delete("/:id", subCategoryController.deleteSubCategory);

module.exports = router;
