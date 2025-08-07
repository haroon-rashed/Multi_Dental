const Brand = require("../models/Brand");

// Get all brands
exports.getAll = async (req, res) => {
  try {
    const result = await Brand.find({});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching brands" });
  }
};

// Create a new brand
exports.create = async (req, res) => {
  try {
    const { name, image } = req.body;

    // Validate input
    if (!name || !image) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    const newBrand = new Brand({ name, image });
    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating brand" });
  }
};

// Update a brand
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    // Validate input
    if (!name || !image) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { name, image },
      { new: true, runValidators: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json(updatedBrand);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating brand" });
  }
};

// Delete a brand
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting brand" });
  }
};
