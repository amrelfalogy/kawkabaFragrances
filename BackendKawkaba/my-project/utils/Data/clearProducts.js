const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../../config.env" });

const Product = require("../../models/productModel");

const clearProducts = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");

    await Product.deleteMany({});
    console.log("Products cleared successfully");
  } catch (err) {
    console.error("Error clearing products:", err);
  } finally {
    mongoose.connection.close();
  }
};

clearProducts();
