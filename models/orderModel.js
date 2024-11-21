const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserModel = require("./userModel"); // Assuming the user model file is named userModel.js
const ShopItems = require("./shopModel"); // Assuming the product model file is named productModel.js

// Define the Order schema
const orderSchema = new Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true, // Ensure the transaction ID is unique
  },
  status: {
    type: String,
    enum: ["COMPLETED", "REJECTED", "FAILED"], // Enum to enforce the allowed status values
    required: true,
  },
  transactionTime: {
    type: Date,
    required: true,
    default: Date.now, // Automatically set the transaction time to the current date and time
  },
  transactionAmount: {
    type: Number,
    required: true,
  },
  currencyCode: {
    type: String,
    required: true,
  },
  payerName: {
    type: String,
    required: true,
  },
  payerEmail: {
    type: String,
    required: true,
  },
  payerId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModel, // Reference to the User model
    required: true,
  },
  orderedItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ShopItems, // Reference to the ShopItems model
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
