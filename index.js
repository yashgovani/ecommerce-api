const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Signup = require("./models/userModel");
const productCategoryRouter = require("./routes/product-category");
const shopItemsRouter = require("./routes/shop-item");
const authRouter = require("./routes/auth");

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
app.use(cors());

app.use("/product-category", productCategoryRouter);
app.use("/shop-items", shopItemsRouter);
app.use("/user", authRouter);

// nodejs process to get exit
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
