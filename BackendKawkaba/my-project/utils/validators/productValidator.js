const { check } = require("express-validator");
const validatorMiddleware = require("../../Middlewares/validatorMiddleware");

exports.createProductValidator = [
  check("name")
    .notEmpty()
    .withMessage("Product required")
    .isLength({ min: 2 })
    .withMessage("Too short product name"),
  check("description")
    .notEmpty()
    .withMessage("product description is required")
    .isLength({ min: 20 })
    .withMessage("Too short product description")
    .isLength({ max: 2000 })
    .withMessage("Too long product description"),
  check("company")
    .notEmpty()
    .withMessage("product company is required")
    .isLength({ min: 3 })
    .withMessage("Too short product brand name")
    .isLength({ max: 32 })
    .withMessage("Too long product brand name"),
  check("for_gender")
    .notEmpty()
    .withMessage("Gender of the product is required")
    .isLength({ min: 3 })
    .withMessage("Too short product gender")
    .isLength({ max: 20 })
    .withMessage("Too long product gender"),
  check("main_accords")
    .notEmpty()
    .withMessage("Main accords are required")
    .isArray()
    .withMessage("Main accords should be an array"),
  check("season")
    .notEmpty()
    .withMessage("The season is required")
    .isLength({ min: 4 })
    .withMessage("Too short product season")
    .isLength({ max: 20 })
    .withMessage("Too long product season"),
  // check("quantity")
  //   .notEmpty()
  //   .withMessage("Product quantity is required")
  //   .isNumeric()
  //   .withMessage("Product quantity must be a number"),
  // check("sold")
  //   .optional()
  //   .isNumeric()
  //   .withMessage("Product quantity must be a number"),
  // check("price")
  //   .notEmpty()
  //   .withMessage("Product price is required")
  //   .isNumeric()
  //   .withMessage("Product price must be a number")
  //   .isLength({ max: 20000 })
  //   .withMessage("Too long product price"),
  // check("priceAfterDiscount")
  //   .optional()
  //   .isNumeric()
  //   .withMessage("Product priceAfterDiscount must be a number")
  //   .toFloat()
  //   .custom((value, { req }) => {
  //     if (req.body.price <= value) {
  //       throw new Error("priceAfterDiscount must be lower than price");
  //     }
  //     return true;
  //   }),

  check("image").notEmpty().withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of string"),
  check("rating")
    .optional()
    .isNumeric()
    .withMessage("Ratings Average must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal 5.0"),
  check("number_votes")
    .optional()
    .isNumeric()
    .withMessage("RatingQuantity must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating Quantity must be above or equal 1.0")
    .isLength({ max: 50000 })
    .withMessage("Rating Quantity must be below or equal 20000.0"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 2000 })
    .withMessage("Too long product price"),
  check("isNewArrival")
    .optional()
    .isBoolean()
    .withMessage("isNewArrival must be a boolean value"),
  check("isBestSeller")
    .optional()
    .isBoolean()
    .withMessage("isBestSeller must be a boolean value"),

  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];
