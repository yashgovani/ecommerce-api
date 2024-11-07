const mongoose = require("mongoose");

const signupModel = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Signup = mongoose.model("Signup", signupModel);

module.exports = Signup;
