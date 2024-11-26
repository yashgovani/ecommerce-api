const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import Routers
const productCategoryRouter = require("../routes/product-category");
const shopItemsRouter = require("../routes/shop-item");
const orderRouter = require("../routes/order");
const authRouter = require("../routes/auth");

// Database Connection
const uri =
  "mongodb+srv://dhvyas143:OCaeCACoI26O1DDy@ecommerce-cluster.4o3k4.mongodb.net/";
const dbname = "ecommerce-data";

mongoose
  .connect(uri, { dbName: dbname })
  .then(() => console.log("DB connected successfully"))
  .catch((error) => console.error(error));

mongoose.connection.on("connected", () =>
  console.log("Mongoose connected to DB")
);
mongoose.connection.on("error", (err) => console.error(err.message));
mongoose.connection.on("disconnected", () =>
  console.log("Connection is disconnected")
);

// Initialize Express App
const app = express();
const router = express.Router();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Register Routers
app.use("/.netlify/functions/api/product-category", productCategoryRouter);
app.use("/.netlify/functions/api/shop-items", shopItemsRouter);
app.use("/.netlify/functions/api/user", authRouter);
app.use("/.netlify/functions/api/order", orderRouter);

// Handle base route

// Export handler for serverless
module.exports.handler = serverless(app);
