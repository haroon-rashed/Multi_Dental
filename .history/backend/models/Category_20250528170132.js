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
  }
});

module.exports = mongoose.model("Category", categorySchema);
