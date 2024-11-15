const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  displayName: {
    type: String,
    optional: true,
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

const User = mongoose.model("Signup", userModel, "user");

module.exports = User;
