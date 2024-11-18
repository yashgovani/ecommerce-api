const express = require("express");
const productCategoryController = require("../controller/product-category");

const router = express.Router();

router
  .route("/")
  .get(productCategoryController.getProductCategory)
  .post(productCategoryController.postProductCategory);

router
  .route("/:id")
  .delete(productCategoryController.deleteProductCategory)
  .put(productCategoryController.updateProductCategory);

module.exports = router;
