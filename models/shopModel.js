const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductCategory = require("./productModel");

const shopItems = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ProductCategory,
    required: true,
    validate: {
      validator: async function (value) {
        const category = await ProductCategory.findById(value);
        return category != null;
      },
      message: "Category ID does not exist in the ProductCategory collection",
    },
  },
});
// Create the Category model
const ShopItems = mongoose.model("ShopItems", shopItems, "ShopItems");

// Export the model
module.exports = ShopItems;
