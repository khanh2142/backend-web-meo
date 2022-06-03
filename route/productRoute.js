const express = require("express");

const route = express.Router();

const productController = require("../controller/productController");
const upload = require("../middleware/uploadProductCactegoriesImage");
const uploadImage = require("../middleware/uploadProductCactegoriesImage");

route.post("/test", uploadImage.single("image"), productController.test);
route.get("/admin/product/edit/:id", productController.edit);
route.post(
  "/admin/product/edit/:id",
  upload.array("image"),
  productController.editDB
);
route.get("/admin/product/delete/:id", productController.deleteDB);
route.get("/admin/product/create", productController.create);
route.post(
  "/admin/product/create",
  uploadImage.array("image"),
  productController.createDB
);
route.get("/admin/product/:id", productController.get);

module.exports = route;
