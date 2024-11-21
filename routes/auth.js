const express = require("express");
const authController = require("../controller/auth");

const router = express.Router();

router.route("/signup").post(authController.userSignUp);
router.route("/signin").post(authController.userSignIn);
router.route("/dashboard").get(authController.fetchDashboardData);

module.exports = router;
