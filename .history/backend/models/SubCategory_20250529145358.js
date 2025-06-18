const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subCategoryImage: {
    type: String,
    required: false
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
