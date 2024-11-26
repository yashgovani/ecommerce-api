const mongoose = require("mongoose");

const productCategories = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategories,
  "ProductCategories"
);

module.exports = ProductCategory;
