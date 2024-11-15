const ShopItems = require("../models/shopModel");

exports.fetchShopItems = async (req, res) => {
  const shopItems = await ShopItems.find();
  res.status(200).send({
    status: "success",
    results: shopItems.length,
    shopItems,
  });
};

exports.createShopItems = async (req, res) => {
  try {
    const { name, imageUrl, price, categoryId } = req.body;

    if (!name || !imageUrl || !price || !categoryId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = new ShopItems({
      name,
      imageUrl,
      price,
      categoryId,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product", error });
  }
};
