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

exports.addCategory = async (req, res) => {
  const { name, categoryImage, parent_id } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  try {
    const newCategory = await Category.create({
      name,
      categoryImage,
      parent_id: parent_id && parent_id !== "null" && parent_id !== "" ? parent_id : null

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
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, categoryImage, parent_id: parent_id || null },
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

// Delete category by ID
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
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
