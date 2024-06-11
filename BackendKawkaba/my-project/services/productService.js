const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
// eslint-disable-next-line no-unused-vars
const { query } = require("express");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

// business logic

// @desc Get list of products
// @route GET /api/vi/products
// @ acess public
exports.getProducts = asyncHandler(async (req, res, next) => {
  // Build query
  const documentsCounts = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .pagenate(documentsCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  console.log("Query Conditions:", apiFeatures.mongooseQuery.getQuery());

  // Excute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;

  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});

// @desc Get specific product by id
// @route GET /api/vi/products/:id
// @ acess public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Create product
// @route POST api/vi/products
// @ acess private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  // async await
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc Update specific product by id
// @route PUT /api/vi/products/:id
// @ acess private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc Delete specific product by id
// @route DELETE /api/vi/products/:id
// @ acess private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ApiError(`No product for this id ${id}`, 404));
  }
  res.status(204).send();
});
// get New Arrival
exports.getNewArrivals = asyncHandler(async (req, res) => {
  try {
    const newArrivals = await Product.find({ isNewArrival: true });
    res.status(200).json({ results: newArrivals.length, data: newArrivals });
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    res.status(400).json({ error: "Failed to fetch new arrivals" });
  }
});

// get Best Sellers

exports.getBestSellers = asyncHandler(async (req, res) => {
  try {
    const bestSellers = await Product.find({ isBestSeller: true });
    res.status(200).json({ results: bestSellers.length, data: bestSellers });
  } catch (error) {
    console.error("Error fetchingbest Sellers:", error);
    res.status(400).json({ error: "Failed to fetch best" });
  }
});
