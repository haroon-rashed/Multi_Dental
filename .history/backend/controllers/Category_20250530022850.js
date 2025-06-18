const Category = require("../models/Category");

exports.getAll = async (req, res) => {
  try {
    const result = await Category.find({}).populate("parent_id", "name");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// Get only main categories (parent_id is null)
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ parent_id: null }).populate("parent_id", "name");
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// Get only subcategories (parent_id is not null)
exports.getSubCategories = async (req, res) => {
  try {
    const subcategories = await Category.find({ parent_id: { $ne: null } }).populate("parent_id", "name");
    res.status(200).json(subcategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching subcategories" });
  }
};

exports.addCategory = async (req, res) => {
  const { name, categoryImage, parent_id } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  try {
    // Validate parent_id if provided
    if (parent_id && parent_id !== "null" && parent_id !== "" && parent_id !== "undefined") {
      const parentExists = await Category.findById(parent_id);
      if (!parentExists) {
        return res.status(400).json({ message: "Parent category not found" });
      }
    }

    const newCategory = await Category.create({
      name,
      categoryImage,
      parent_id: (parent_id && parent_id !== "null" && parent_id !== "" && parent_id !== "undefined") ? parent_id : null
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, categoryImage, parent_id } = req.body;

  try {
    // Prevent category from being its own parent
    if (parent_id && parent_id.toString() === id) {
      return res.status(400).json({ message: "A category cannot be its own parent" });
    }

    // Validate parent_id if provided
    if (parent_id && parent_id !== "null" && parent_id !== "" && parent_id !== "undefined") {
      const parentExists = await Category.findById(parent_id);
      if (!parentExists) {
        return res.status(400).json({ message: "Parent category not found" });
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { 
        name, 
        categoryImage, 
        parent_id: (parent_id && parent_id !== "null" && parent_id !== "" && parent_id !== "undefined") ? parent_id : null 
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if category has subcategories
    const hasSubcategories = await Category.findOne({ parent_id: id });
    if (hasSubcategories) {
      return res.status(400).json({ 
        message: "Cannot delete category that has subcategories. Delete subcategories first." 
      });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};