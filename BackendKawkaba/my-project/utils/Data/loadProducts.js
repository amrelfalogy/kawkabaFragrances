const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({ path: "../../config.env" });

const Product = require("../../models/productModel"); // Ensure this path is correct

const loadProducts = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");

    // Load products from JSON file
    const productsFilePath = "./products.json";
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    // Insert products into the database
    await Product.insertMany(products);
    console.log("Products loaded successfully");
  } catch (err) {
    console.error("Error loading products:", err);
  } finally {
    mongoose.connection.close();
  }
};

loadProducts();
