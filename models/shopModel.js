const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductCategory = require("./productModel");

// Define the Category schema with embedded items
// const shopItems = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   routeName: {
//     type: String,
//     required: true,
//     unique: true, // Ensure routeName is unique for each category
//   },
//   items: [
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       imageUrl: {
//         type: String,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//     },
//   ], // Array of items in each category
// });

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
