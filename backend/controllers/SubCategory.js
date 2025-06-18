const SubCategory = require("../models/SubCategory");

// CREATE SubCategory
exports.createSubCategory = async (req, res) => {
  try {
    const { name, subCategoryImage, categoryId } = req.body;

    const newSubCategory = new SubCategory({ name, subCategoryImage, categoryId });
    await newSubCategory.save();

    res.status(201).json({ message: "SubCategory created successfully", subCategory: newSubCategory });
  } catch (err) {
    res.status(500).json({ error: "Failed to create subcategory", details: err.message });
  }
};

// READ all SubCategories
exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("categoryId", "name");
    res.status(200).json(subCategories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subcategories", details: err.message });
  }
};

// READ single SubCategory
exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate("categoryId", "name");

    if (!subCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }

    res.status(200).json(subCategory);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subcategory", details: err.message });
  }
};

// UPDATE SubCategory
exports.updateSubCategory = async (req, res) => {
  try {
    const { name, subCategoryImage, categoryId } = req.body;

    const updated = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, subCategoryImage, categoryId },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "SubCategory not found" });
    }

    res.status(200).json({ message: "SubCategory updated", subCategory: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update subcategory", details: err.message });
  }
};

// DELETE SubCategory
exports.deleteSubCategory = async (req, res) => {
  try {
    const deleted = await SubCategory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "SubCategory not found" });
    }

    res.status(200).json({ message: "SubCategory deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete subcategory", details: err.message });
  }
};
