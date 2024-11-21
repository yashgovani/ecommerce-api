const express = require("express");
const orderController = require("../controller/order");

const router = express.Router();

router.route("/create").post(orderController.createOrder);
router.route("/:userId").get(orderController.fetchUserOrder);

module.exports = router;
