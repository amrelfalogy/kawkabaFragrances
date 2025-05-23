// eslint-disable-next-line no-unused-vars
const fs = require("fs");
const products = require("../utils/Data/products.json");

function findMatches(products, searchGender, searchSeasons, searchMain) {
  return products.filter((product) => {
    const matchGender =
      searchGender.length === 0 ||
      (product.for_gender &&
        searchGender.some((gender) => {
          // Normalize gender values for stricter matching
          const normalizedGender = product.for_gender.toLowerCase().trim();
          if (gender.toLowerCase() === "men") {
            return normalizedGender === "for men" || normalizedGender === "for women and men";
          } else if (gender.toLowerCase() === "women") {
            return normalizedGender === "for women" || normalizedGender === "for women and men";
          } else {
            return normalizedGender === "unisex";
          }
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

function getRecommendations(gender, seasons, mainAccords) {
  const searchGender = gender ? [gender] : [];
  const searchSeasons = seasons || [];
  const searchMain = mainAccords || [];

  const result = findMatches(products, searchGender, searchSeasons, searchMain);
  console.log("Matched Products:", result); 
  
  const rankedProducts = rankProducts(result, searchMain);

  return rankedProducts.slice(0, 5);
  // return result.map((product) => product.name);
}

module.exports = {
  getRecommendations,
};