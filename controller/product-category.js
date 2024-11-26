const ProductCategory = require("../models/productModel");

exports.getProductCategory = async (req, res) => {
  const productCategories = await ProductCategory.find({ deletedAt: null });

  res.status(200).json({
    status: "success",
    results: productCategories.length,
    productCategories,
  });
};

exports.postProductCategory = async (req, res) => {
  const { title, imageUrl, size } = req.body;
  let newProduct = new ProductCategory({
    title,
    imageUrl,
    size,
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
  const category = await ProductCategory.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      status: "failed",
      message: "No product category found with that ID",
    });
  }

  if (category.deletedAt) {
    return res.status(400).json({
      status: "fail",
      message: "Category already deleted",
    });
  }

  category.deletedAt = new Date();
  await category.save();

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
    data: null,
  });
};

exports.updateProductCategory = async (req, res) => {
  const { title, imageUrl, size } = req.body;
  const productCategory = await ProductCategory.findByIdAndUpdate(
    req.params.id,
    { title, imageUrl, size },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!productCategory) {
    res.status(404).json({
      status: "failed",
      message: "No Category Found for Given Id",
    });
  }
  res.status(200).json({
    status: "success",
    message: "successfully updated product category",
    productCategory,
  });
};
