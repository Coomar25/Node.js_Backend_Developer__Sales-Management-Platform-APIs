const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
} = require("../controllers/productController");

const { isAdmin } = require("../middlewares/auth");
const upload = require("../helper/multer");
const {
  validateAddProduct,
  validateUpdateProduct,
} = require("../validators/productValidator");

const productRoute = express.Router();

productRoute.post(
  "/add-product",
  isAdmin,
  upload.single("image"),
  validateAddProduct,
  addProduct
);
productRoute.put(
  "/update-product/:id",
  isAdmin,
  upload.single("image"),
  validateUpdateProduct,
  updateProduct
);
productRoute.delete("/delete-product/:id", isAdmin, deleteProduct);
productRoute.get("/get-product/:id", getProductById);
productRoute.get("/get-all-products", getAllProducts);

module.exports = productRoute;
