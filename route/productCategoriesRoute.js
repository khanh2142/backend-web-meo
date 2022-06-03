const express = require("express");
const route = express.Router();

const uploadProductCategoriesImage = require("../middleware/uploadProductCactegoriesImage");

const productCategoriesController = require("../controller/productCategoriesController");

route.get("/admin/procategories/", productCategoriesController.get);
route.get("/admin/procategories/create", productCategoriesController.create);
route.post(
  "/admin/procategories/create",
  uploadProductCategoriesImage.single("image"),
  productCategoriesController.createDB
);
route.get("/admin/procategories/edit/:id", productCategoriesController.edit);
route.post(
  "/admin/procategories/edit/:id",
  uploadProductCategoriesImage.single("image"),
  productCategoriesController.editDB
);
route.get(
  "/admin/procategories/delete/:id",
  productCategoriesController.deleteDB
);

module.exports = route;
