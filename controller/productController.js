const ProductCategoriesModel = require("../model/productCategoriesModel");
const ProductModel = require("../model/productModel");

const get = (req, res) => {
  const id = req.params.id;

  const promise1 = ProductModel.find({ type: id });

  const promise2 = ProductCategoriesModel.findById(id);

  Promise.all([promise1, promise2])
    .then((values) => {
      res.render("admin/product/index", { data: values[0], type: values[1] });
    })
    .catch((e) => {
      console.log(e);
    });
};

const create = (req, res) => {
  ProductCategoriesModel.find().then((data) => {
    res.render("admin/product/create", { data: data });
  });
};

const createDB = (req, res) => {
  if (req.files) {
    const images = req.files.map((item, index) => {
      if (index < 6) {
        return item;
      }
    });
    if (images.length > 6) {
      images.length = 6;
    }
    const imagesUrl = images.map((item) => {
      return req.protocol + "://" + req.get("host") + "/" + item.originalname;
    });

    const { name, type, gender, age, color, price, price_sale, inject } =
      req.body;

    const newProduct = new ProductModel({
      name: name,
      type: type,
      gender: gender,
      age: age,
      color: color,
      price: price,
      price_sale: price_sale,
      inject: inject,
      images: imagesUrl,
    }); 

    if (newProduct) {
      newProduct
        .save()
        .then(() => {
          console.log("inserted into db");
        })
        .catch(() => {
          console.log("insert failed");
        });
      res.redirect("/admin/product/" + type);
    }
  }
};

const deleteDB = (req, res) => {
  const id = req.params.id;
  ProductModel.findByIdAndDelete(id)
    .then(() => {
      console.log("deleted");
      res.redirect("back");
    })
    .catch(() => {
      console.log("delete failed");
    });
};

const edit = (req, res) => {
  const id = req.params.id;
  ProductModel.findById(id).then((data) => {
    res.render("admin/product/edit", { data: data });
  });
};

const editDB = (req, res) => {
  const id = req.params.id;
  console.log(id, req.body, req.files);
};

const test = (req, res) => {
  res.send(req.body);
};

module.exports = { get, create, createDB, deleteDB, edit, editDB, test };
