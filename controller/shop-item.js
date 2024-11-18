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

    await newProduct.save().then((shopItem) => {
      res.status(201).send({
        status: "success",
        message: "product successfully added",
        shopItem,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product", error });
  }
};

exports.deleteShopItems = async (req, res) => {
  const shopItem = await ShopItems.findByIdAndDelete(req.params.id);
  if (!shopItem) {
    return next(
      res.status(204).json({
        status: "success",
        message: "No shop item found with that ID",
        data: null,
      })
    );
  }
  res.status(200).json({
    status: "success",
    message: "shop item deleted successfully",
    data: null,
  });
};

exports.updateShopItems = async (req, res) => {
  const shopItem = await ShopItems.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!shopItem) {
    return res.status(404).json({
      status: "failed",
      message: "No item Found for Given Id",
    });
  }
  res.status(200).json({
    status: "success",
    message: "successfully updated shop item",
    shopItem,
  });
};
