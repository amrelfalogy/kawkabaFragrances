const fs = require("fs");

// Load the products from the JSON file
const productsFilePath = "./products.json";
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

// Function to convert main_accords string to an array
const convertMainAccords = (mainAccordsStr) => {
  // Example of the original format: "{'aromatic': 100.0, 'fresh spicy': 89.1444, ...}"
  // Remove the braces and split by commas to get key-value pairs
  const pairs = mainAccordsStr.replace(/[{}]/g, "").split(",");

  // Extract the keys (accord names) and return as an array
  return pairs.map((pair) => pair.split(":")[0].trim().replace(/['"]/g, ""));
};

// Update each product
products.forEach((product) => {
  if (typeof product.main_accords === "string") {
    product.main_accords = convertMainAccords(product.main_accords);
  }
  // eslint-disable-next-line no-undef
  if (typeof product._id !== "string" || !ObjectId.isValid(product._id)) {
    delete product._id;
  }

  // Ensure price field is present
  if (!product.price) {
    product.price = 300; // Default value if price is missing
  }

  //  New arrival
  if (!product.isNewArrival) {
    product.isNewArrival = false; // Default value if new arrival is missing
  }

  // Best seller
  if (!product.isBestSeller) {
    product.isBestSeller = false; // Default value if best seller is missing
  }
});

// Save the updated products back to the JSON file
fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

console.log("Products updated successfully");
