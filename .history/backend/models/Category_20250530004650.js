const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  categoryImage: {
    type: String, 
    required: false 
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null
  }
});

module.exports = mongoose.model("Category", categorySchema);
