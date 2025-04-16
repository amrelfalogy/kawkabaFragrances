const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    // slug: {
    //   type: String,
    //   required: true,
    //   lowercase: true,
    // },
    description: {
      type: String,
      trim: true,
      required: [true, "product description is required"],
      minlength: [20, "Too short product description"],
    },
    company: {
      type: String,
      required: [true, "The brand of this product is required"],
      minlength: [3, "Too short product brand name"],
      maxlength: [64, "Too long product brand name"],
    },
    for_gender: {
      type: String,
      required: [true, "Gender of the product is required"],
      minlength: [3, "Too short product gender"],
      maxlength: [20, "Too long product gender"],
    },
    season: {
      type: String,
      required: [true, "season of the product is required"],
      minlength: [4, "Too short product gender"],
      maxlength: [20, "Too long product gender"],
    },
    main_accords: {
      type: [String],
      default: [],
    },

    // quantity: {
    //   type: Number,
    //   required: [true, "product quantity is required"],
    // },
    // sold: {
    //   type: Number,
    //   default: 0,
    // },
    price: {
      type: Number,
      required: [true, "product price is required"],
      trim: true,
      max: [20000, "Too long product price"],
    },
    // priceAfterDiscount: {
    //   type: Number,
    // },

    image: {
      type: String,
      required: [true, "image cover is required"],
    },
    images: [String],

    rating: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
      default: 0,
    },
    number_votes: {
      type: Number,
      min: [1, "Rating must be above or equal 1"],
      max: [50000, "Rating must be below or equal 20000"],
      default: 0,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
