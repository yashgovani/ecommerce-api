const express = require("express");
const shopItemsController = require("../controller/shop-item");

const router = express.Router();

router
  .route("/")
  .get(shopItemsController.fetchShopItems)
  .post(shopItemsController.createShopItems);

router
  .route("/:id")
  .delete(shopItemsController.deleteShopItems)
  .put(shopItemsController.updateShopItems);

router
  .route("/categories-with-items")
  .get(shopItemsController.categoriesWithItems);

module.exports = router;
