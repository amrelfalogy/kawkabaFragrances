// const express = require("express");

// const router = express.Router();

// // define the products array to hold the data
// const products = [
//   {
//     id: 1,
//     name: "SPLENDID",
//     gender: "men",
//     season: "summer",
//     img: "assets/imgs/splendid.jpg",
//   },
//   {
//     id: 2,
//     name: "STRONGER WITH YOU",
//     gender: "men",
//     season: "winter",
//     img: "assets/imgs/stronger with you.jpg",
//   },
//   {
//     id: 3,
//     name: "ULTRA MALE",
//     gender: "men",
//     season: "spring",
//     img: "assets/imgs/ULTRA MALE.jpg",
//   },
//   {
//     id: 4,
//     name: "ROSES VANILLA",
//     gender: "men",
//     season: "fall",
//     img: "assets/imgs/roses vanille.jpg",
//   },
//   {
//     id: 5,
//     name: "DYLAN BLUE",
//     gender: "men",
//     season: "fall",
//     img: "assets/imgs/dylan blue.jpg",
//   },
//   {
//     id: 6,
//     name: "POLO RED",
//     gender: "men",
//     season: "winter",
//     img: "assets/imgs/polo red.jpg",
//   },
//   {
//     id: 7,
//     name: "Y YEAV SAINT LAURENT",
//     gender: "men",
//     season: "fall",
//     img: "assets/imgs/Y ysl.jpg",
//   },
//   {
//     id: 8,
//     name: "VERSACE EROS",
//     gender: "men",
//     season: "fall",
//     img: "assets/imgs/versace eros.jpg",
//   },
//   {
//     id: 9,
//     name: "CHAMPION",
//     gender: "men",
//     season: "summer",
//     img: "assets/imgs/champion.jpg",
//   },
//   {
//     id: 10,
//     name: "BOMB SHELL",
//     gender: "women",
//     season: "winter",
//     img: "assets/imgs/Bomb shell.jpg",
//   },
//   {
//     id: 11,
//     name: "ESCADA",
//     gender: "women",
//     season: "fall",
//     img: "assets/imgs/Escada collection.jpg",
//   },
//   {
//     id: 12,
//     name: "LOVE IS HEAVENLY",
//     gender: "women",
//     season: "winter",
//     img: "assets/imgs/love is heavenly.jpg",
//   },
//   {
//     id: 13,
//     name: "VERY SEXY NOW",
//     gender: "women",
//     season: "summer",
//     img: "assets/imgs/very sexy now.jpg",
//   },
//   {
//     id: 14,
//     name: "SCANDAL",
//     gender: "women",
//     season: "summer",
//     img: "assets/imgs/scandal.jpeg",
//   },
//   {
//     id: 15,
//     name: "BURBERRY HER",
//     gender: "women",
//     season: "fall",
//     img: "assets/imgs/burberry her.jpg",
//   },
//   {
//     id: 16,
//     name: "L INTERDIT ROUGE",
//     gender: "women",
//     season: "fall",
//     img: "assets/imgs/l interdit rouge.jpg",
//   },
//   {
//     id: 17,
//     name: "ANGLE NOVA",
//     gender: "women",
//     season: "winter",
//     img: "assets/imgs/angle nova.jpg",
//   },
//   {
//     id: 18,
//     name: "LEXTASE NINA",
//     gender: "women",
//     season: "winter",
//     img: "assets/imgs/Lextase nina.jpg",
//   },
//   {
//     id: 19,
//     name: "BLUE OUD",
//     gender: "unisex",
//     season: "winter",
//     img: "assets/imgs/oud1.jpeg",
//   },
//   {
//     id: 20,
//     name: "MADAWY ",
//     gender: "unisex",
//     season: "winter",
//     img: "assets/imgs/oud2.jpeg",
//   },
//   {
//     id: 21,
//     name: "ALMOBKHAR ",
//     gender: "unisex",
//     season: "winter",
//     img: "assets/imgs/oud3.jpeg",
//   },
//   {
//     id: 22,
//     name: "ASFHAN",
//     gender: "unisex",
//     season: "winter",
//     img: "assets/imgs/oud4.jpeg",
//   },
//   {
//     id: 23,
//     name: "ALQURASHY",
//     gender: "unisex",
//     season: "winter",
//     img: "assets/imgs/oud5.jpeg",
//   },
//   {
//     id: 24,
//     name: "SATAN MODE",
//     gender: "unisex",
//     season: "winter",
//     img: "assets/imgs/oud6.jpeg",
//   },
// ];

// // route to get all products
// router.get("/", (req, res) => {
//   res.json(products);
// });

// // route to get products by gender
// router.get("/:gender", (req, res) => {
//   const gender = req.params.for_gender;
//   const genderProducts = products.filter(
//     (product) => product.gender === gender,
//   );
//   res.status(200).json({ products: genderProducts });
// });

// module.exports = router;
