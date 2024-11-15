const UserModel = require("../models/userModel");

exports.userSignUp = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const displayName = req.body.displayName;
  let newSignup = new UserModel({
    email,
    password,
    displayName,
  });
  newSignup
    .save()
    .then((user) => {
      res.status(200).send({
        status: "success",
        message: "successfully signed up",
        user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.userSignIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await UserModel.findOne({ email });
  if (!user || password !== user.password) {
    res.status(401).send({
      status: "failed",
      message: "Incorrect email or password",
    });
  } else {
    res.status(200).send({
      status: "success",
      message: "SignIn successful",
    });
  }
};
