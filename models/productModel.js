const mongoose = require("mongoose");

const productCategories = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const ProductCategory = mongoose.model("ProductCategory", productCategories);

module.exports = ProductCategory;
