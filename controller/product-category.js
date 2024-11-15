const ProductCategory = require("../models/productModel");

exports.getProductCategory = async (req, res) => {
  const productCategories = await ProductCategory.find();
  res.status(200).send({
    status: "success",
    results: productCategories.length,
    productCategories,
  });
};

exports.postProductCategory = async (req, res) => {
  const { title, imageUrl, id } = req.body;
  let newProduct = new ProductCategory({
    title,
    imageUrl,
    id,
  });
  newProduct
    .save()
    .then((product) => {
      res.status(200).send({
        status: "success",
        message: "product successfully added",
        product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProductCategory = async (req, res) => {
  const category = await ProductCategory.deleteOne({ id: req.params.id });
  if (!category) {
    return next(
      res.status(204).json({
        status: "success",
        message: "No product category found with that ID",
        data: null,
      })
    );
  }
  res.status(200).json({
    status: "success",
    message: "category deleted successfully",
    data: null,
  });
};
