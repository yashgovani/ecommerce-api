const UserModel = require("../models/userModel");
const ProductCategory = require("../models/productModel");
const ShopItems = require("../models/shopModel");

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
      user,
    });
  }
};

exports.fetchDashboardData = async (req, res, next) => {
  try {
    // 1. Get the total count of ProductCategory
    const productCategoryCount = await ProductCategory.countDocuments();

    // 2. Get the total count of ShopItems
    const shopItemCount = await ShopItems.countDocuments();

    // 3. Aggregate shop items by categoryId and count how many items per category
    const categoryDistribution = await ProductCategory.aggregate([
      {
        $lookup: {
          from: "ShopItems", // The collection to join
          localField: "_id", // Field from ProductCategory collection
          foreignField: "categoryId", // Field from ShopItems collection
          as: "items", // Alias for the array of matching ShopItems
        },
      },
      {
        $project: {
          title: 1, // Include the category title
          itemCount: { $size: "$items" }, // Count the number of items in each category
        },
      },
    ]);

    // 4. Respond with the data
    res.json({
      productCategoryCount,
      shopItemCount,
      categoryDistribution,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
