// eslint-disable-next-line no-unused-vars
const fs = require("fs");
const Product = require("../models/productModel"); // Import the Product model

function findMatches(products, searchGender, searchSeasons, searchMain) {
  return products.filter((product) => {
    const matchGender =
      searchGender.length === 0 ||
      (product.for_gender &&
        searchGender.some((gender) => {
          const formattedGender = product.for_gender.toLowerCase().trim();
          return (
            formattedGender === `for ${gender.toLowerCase()}` ||
            formattedGender === "for women and men"
          );
        }));

    const matchSeasons =
      searchSeasons.length === 0 ||
      (product.season &&
        searchSeasons.some((season) => product.season.includes(season)));

    const matchMain =
      searchMain.length === 0 ||
      (product.main_accords &&
        Array.isArray(product.main_accords) &&
        searchMain.some((accord) => product.main_accords.includes(accord)));

    return matchGender && matchSeasons && matchMain;
  });
}

function rankProducts(products, searchMain) {
  return products.sort((a, b) => {
    const aAccordsMatched = searchMain.filter((accord) =>
      a.main_accords.includes(accord),
    ).length;
    const bAccordsMatched = searchMain.filter((accord) =>
      b.main_accords.includes(accord),
    ).length;
    return bAccordsMatched - aAccordsMatched; // Higher matches come first
  });
}

async function getRecommendations(gender, seasons, mainAccords) {
  try {
    // Fetch all products from MongoDB
    const allProducts = await Product.find();

    // Find matches based on gender, seasons, and accords
    const matchedProducts = findMatches(
      allProducts,
      gender,
      seasons,
      mainAccords,
    );

    // Rank the matched products
    const rankedProducts = rankProducts(matchedProducts, mainAccords);

    // Return the top 5 products, including `_id`
    return rankedProducts.slice(0, 5);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

module.exports = {
  getRecommendations,
};
