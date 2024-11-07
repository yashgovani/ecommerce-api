const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
// importing schema model
const ProductCategory = require("./models/productModel");
const ShopItems = require("./models/shopModel");
const Signup = require("./models/signupModel");

const uri =
  "mongodb+srv://dhvyas143:OCaeCACoI26O1DDy@ecommerce-cluster.4o3k4.mongodb.net/";
const dbname = "ecommerce-data";

// URI connection
mongoose
  .connect(uri, { dbName: dbname })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

// Mongoose connected to database
mongoose.connection.on("connected", () => {
  console.log("Mongoose conncted to DB");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Connection is disconncted");
});

// Initializing express app
const app = express();

// Initializing the server
app.listen(3000, () => {
  console.log(`App running on port 3000...`);
});

// parsing the data when being communicated from express server to mongodb
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// adding a user to ecommerce db
app.post("/user", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let newSignup = new Signup({
    email,
    password,
  });
  newSignup
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/product-category", async (req, res) => {
  const productCategories = await ProductCategory.find();

  res.status(200).send({
    status: "success",
    results: productCategories.length,
    data: {
      productCategories,
    },
  });
});

app.get("/shop-item", async (req, res) => {
  const shopItems = await ShopItems.find();
  console.log(shopItems);
  res.status(200).send({
    status: "success",
    results: shopItems.length,
    data: {
      shopItems,
    },
  });
});

// nodejs process to get exit
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
