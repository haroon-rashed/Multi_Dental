const express = require("express");
const categoryController = require("../controllers/Category");
const router = express.Router();

router
  .get("/", categoryController.getAll)
  .get("/categories", categoryController.getCategories) // Only main categories
  .get("/subcategories", categoryController.getSubCategories) // Only subcategories
  .post("/add", categoryController.addCategory)
  .put("/update/:id", categoryController.updateCategory)
  .delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;