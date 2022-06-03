const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModel = new Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    type: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, maxlength: 255 },
    images: { type: Array },
    color: { type: String, maxlength: 255 },
    price: { type: Number },
    price_sale: { type: Number },
    gender: { type: Number },
    inject: { type: Number },
    age: { type: Number },
  },
  { collection: "product" }
);

const ProductModel = mongoose.model("product", productModel);

module.exports = ProductModel;
