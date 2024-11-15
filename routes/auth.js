const express = require("express");
const authController = require("../controller/auth");

const router = express.Router();

router.route("/signup").post(authController.userSignUp);
router.route("/signin").post(authController.userSignUp);

module.exports = router;
