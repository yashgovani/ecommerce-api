const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  displayName: {
    type: String,
    optional: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("UserModel", userModel, "user");

module.exports = User;
