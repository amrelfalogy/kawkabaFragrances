// const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");

// business logic

// @desc Get list of categories
// @route GET /api/vi/categories
// @ acess public
exports.getCategories = factory.getAll(Category);

// exports.getCategories = asyncHandler(async (req, res) => {
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 5;
//   const skip = (page - 1) * limit;
//   const categories = await Category.find({}).skip(skip).limit(limit);
//   res.status(200).json({ results: categories.length, data: categories });
// });

// @desc Get specific category by id
// @route GET /api/vi/categories/:id
// @ acess public
exports.getCategory = factory.getOne(Category);

// exports.getCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const category = await Category.findById(id);
//   if (!category) {
//     return next(new ApiError(`No category for this id ${id}`, 404));
//   }
//   res.status(200).json({ data: category });
// });

// @desc Create category
// @route POST api/vi/categories
// @ acess private
exports.createCategory = factory.createOne(Category);

// exports.createCategory = asyncHandler(async (req, res) => {
//   // eslint-disable-next-line prefer-destructuring
//   const name = req.body.name;
//   // async await
//   const category = await Category.create({ name, slug: slugify(name) });
//   res.status(201).json({ data: category });
// });

// @desc Update specific category by id
// @route PUT /api/vi/categories/:id
// @ acess private
exports.updateCategory = factory.updateOne(Category);

// exports.updateCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   const category = await Category.findOneAndUpdate(
//     { _id: id },
//     { name },
//     { new: true },
//   );
//   if (!category) {
//     return next(new ApiError(`No category for this id ${id}`, 404));
//   }
//   res.status(200).json({ data: category });
// });

// @desc Delete specific category by id
// @route DELETE /api/vi/categories/:id
// @ acess private
exports.deleteCategory = factory.deleteOne(Category);

// exports.deleteCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const category = await Category.findByIdAndDelete(id);

//   if (!category) {
//     return next(new ApiError(`No category for this id ${id}`, 404));
//   }
//   res.status(204).send();
// });
