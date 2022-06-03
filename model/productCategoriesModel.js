const mongoose = require("mongoose");
const { Schema } = mongoose;

const productCategoriesModel = new Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    type: { type: String },
    image: { type: String },
  },
  { collection: "product_categories" }
);

const ProductCategoiesModel = mongoose.model(
  "product_categories",
  productCategoriesModel
);

module.exports = ProductCategoiesModel;
