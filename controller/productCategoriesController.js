const ProductCategoriesModel = require("../model/productCategoriesModel");

const get = (req, res) => {
  ProductCategoriesModel.find().then((data) => {
    res.render("admin/productCategories/index", { data: data });
  });
};

const create = (req, res) => {
  res.render("admin/productCategories/create");
};

const createDB = (req, res) => {
  const productCategories = new ProductCategoriesModel({
    type: req.body.type,
    image: req.file
      ? req.protocol + "://" + req.get("host") + "/" + req.file.originalname
      : "",
  });
  if (productCategories) {
    productCategories.save().then().catch();
    res.redirect("/admin/procategories");
  } else {
    res.send("failed");
  }
};

const edit = (req, res) => {
  const id = req.params.id;
  ProductCategoriesModel.findById(id)
    .then((data) => {
      res.render("admin/productCategories/edit", { data: data });
    })
    .catch((e) => console.log(e));
};

const editDB = (req, res) => {
  const id = req.params.id;

  const promise1 = ProductCategoriesModel.findById(id).then((data) => data);

  Promise.all([promise1])
    .then((values) => {
      if (values[0].type !== req.body.type && req.body.type) {
        ProductCategoriesModel.findByIdAndUpdate(id, {
          type: req.body.type,
        })
          .then(() => console.log("updated"))
          .catch((e) => {
            console.log("update failed");
          });
      }
      if (req.file) {
        ProductCategoriesModel.findByIdAndUpdate(id, {
          image:
            req.protocol +
            "://" +
            req.get("host") +
            "/" +
            req.file.originalname,
        })
          .then(() => console.log("updated"))
          .catch(() => console.log("update failed"));
      }
    })
    .then(() => {
      res.redirect("/admin/procategories");
    });
};

const deleteDB = (req, res) => {
  const id = req.params.id;
  ProductCategoriesModel.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/admin/procategories");
    })
    .catch(() => {
      console.log("delete failed");
    });
};

module.exports = { get, create, createDB, edit, editDB, deleteDB };
