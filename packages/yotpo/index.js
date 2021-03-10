// TODO: Documentation

/**
 * Yotpo API access files
 */

const Yotpo = require("./src/Yotpo.js");
const YotpoProduct = require("./src/products/YotpoProduct.js");
const uploadYotpoProductFeed = require("./src/products/uploadYotpoProductFeed.js");
const YotpoPurchase = require("./src/purchases/YotpoPurchase.js");
const YotpoReview = require("./src/reviews/YotpoReview.js");

module.exports = {
  Yotpo,
  YotpoProduct,
  YotpoPurchase,
  YotpoReview,
  uploadYotpoProductFeed,
};
