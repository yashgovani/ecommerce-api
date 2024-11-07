const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Category schema with embedded items
const shopItems = new Schema({
  title: {
    type: String,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
    unique: true, // Ensure routeName is unique for each category
  },
  items: [
    {
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
    },
  ], // Array of items in each category
});

// Create the Category model
const ShopItems = mongoose.model("ShopItems", shopItems);

// Export the model
module.exports = ShopItems;
