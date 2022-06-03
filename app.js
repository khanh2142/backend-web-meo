const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");

const productRoute = require("./route/productRoute");
const productCategoriesRoute = require("./route/productCategoriesRoute");

const url =
  "mongodb+srv://khanh2142:khanh2142@cluster0.4xlgs.mongodb.net/catshop?retryWrites=true&w=majority";

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to db");
  })
  .catch(() => {
    console.log("connect to db failed");
  });

app.use(productRoute);
app.use(productCategoriesRoute);

const viewsPath = path.join(__dirname, "./view");
app.use(express.static("./public"));

app.set("views", viewsPath);
app.set("view engine", "pug");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
