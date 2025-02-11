const ShopItems = require("../models/shopModel");
const ProductCategory = require("../models/productModel");

exports.fetchShopItems = async (req, res) => {
  const shopItems = await ShopItems.find({ deletedAt: null });
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
  const shopItem = await ShopItems.findById(req.params.id);

  if (!shopItem) {
    return next(
      res.status(404).json({
        status: "failed",
        message: "No shop item found with that ID",
        data: null,
      })
    );
  }
  if (shopItem.deletedAt) {
    return res.status(400).json({
      status: "fail",
      message: "Shop Item already deleted",
    });
  }

  shopItem.deletedAt = new Date();
  await shopItem.save();

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

exports.categoriesWithItems = async (req, res) => {
  try {
    // Step 1: Fetch all categories
    const categories = await ProductCategory.find();

    // Step 2: For each category, get the items associated with it
    const result = [];

    for (const category of categories) {
      const items = await ShopItems.find({ categoryId: category._id });

      result.push({
        _id: category._id,
        title: category.title,
        items: items,
      });
    }

    // Send the result as response
    res.status(200).json({
      status: "success",
      message: "successfully fetched category with items",
      shopItems: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
