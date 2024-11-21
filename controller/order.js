const Orders = require("../models/orderModel");
const UserModel = require("../models/userModel");
const ShopItems = require("../models/shopModel");

exports.createOrder = async (req, res) => {
  const {
    userId,
    transactionId,
    status,
    transactionAmount,
    currencyCode,
    payerName,
    orderedItems,
    payerEmail,
    payerId, // Array of {productId, price, quantity}
  } = req.body;

  try {
    // Validate userId (check if the user exists)
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate each orderedItem (check if the product exists and price matches)
    for (let i = 0; i < orderedItems.length; i++) {
      const { productId, price, quantity } = orderedItems[i];

      const product = await ShopItems.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${productId} not found` });
      }

      // Optionally, validate if the price matches the price in the database
      if (price != product.price) {
        return res.status(400).json({
          message: `Price for product ${product.name} does not match`,
        });
      }

      // Ensure quantity is positive
      if (quantity <= 0) {
        return res
          .status(400)
          .json({ message: `Invalid quantity for product ${product.name}` });
      }
    }

    // Create the order object
    const newOrder = new Orders({
      transactionId,
      status,
      transactionAmount,
      currencyCode,
      payerName,
      userId,
      orderedItems,
      payerEmail,
      payerId,
    });

    // Save the order to the database
    const order = await newOrder.save();

    // Respond with the created order
    return res.status(201).json({
      status: "success",
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.fetchUserOrder = async (req, res) => {
  const { userId } = req.params; // Get userId from the request URL parameter

  try {
    // Fetch all orders for the user from the Order model
    const orders = await Orders.find({ userId }).populate(
      "orderedItems.productId"
    ); // Populate product details for each orderedItem

    // Return the orders as a response
    return res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
