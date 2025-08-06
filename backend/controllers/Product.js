const { Schema, default: mongoose } = require("mongoose");
const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    const created = new Product(req.body);
    await created.save();
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error adding product, please trying again later" });
  }
};

exports.getAll = async (req, res) => {
  try {
    console.log("Fetching products with query:", req.query);

    const filter = { isDeleted: { $ne: true } };
    const sort = {};
    let skip = 0;
    let limit = 0;

    // Handle brand filter
    if (req.query.brand) {
      const brands = Array.isArray(req.query.brand)
        ? req.query.brand
        : [req.query.brand];
      filter.brand = { $in: brands };
      console.log("Filtering by brands:", brands);
    }

    // Handle category filter
    if (req.query.category) {
      const categories = Array.isArray(req.query.category)
        ? req.query.category
        : [req.query.category];
      filter.category = { $in: categories };
      console.log("Filtering by categories:", categories);
    }

    // Handle sorting
    if (req.query.sort) {
      sort[req.query.sort] = req.query.order === "desc" ? -1 : 1;
      console.log("Sorting by:", sort);
    }

    // Handle pagination
    if (req.query.page && req.query.limit) {
      const pageSize = parseInt(req.query.limit, 10);
      const page = parseInt(req.query.page, 10);
      skip = pageSize * (page - 1);
      limit = pageSize;
      console.log(
        `Pagination - Page: ${page}, PageSize: ${pageSize}, Skip: ${skip}, Limit: ${limit}`
      );
    }

    // First get the total count
    const totalDocs = await Product.countDocuments(filter);
    console.log("Total documents matching filter:", totalDocs);

    // Then get the paginated results
    const results = await Product.find(filter)
      .sort(sort)
      .populate("brand")
      .populate("category")
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    console.log(`Found ${results.length} products`);

    res.set("X-Total-Count", totalDocs);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error in getAll products:", error);
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findById(id)
      .populate("brand")
      .populate("category");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error getting product details, please try again later",
    });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating product, please try again later" });
  }
};

exports.undeleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const unDeleted = await Product.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    ).populate("brand");
    res.status(200).json(unDeleted);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error restoring product, please try again later" });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    ).populate("brand");
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error deleting product, please try again later" });
  }
};
