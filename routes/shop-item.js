const express = require("express");
const shopItemsController = require("../controller/shop-item");

const router = express.Router();

router
  .route("/")
  .get(shopItemsController.fetchShopItems)
  .post(shopItemsController.createShopItems);

module.exports = router;
