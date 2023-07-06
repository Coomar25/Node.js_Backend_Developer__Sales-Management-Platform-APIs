const express = require("express");
const {
  addOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  getAllOrdersByUser,
  getAllOrdersByProduct,
} = require("../controllers/orderController");

const orderRoute = express.Router();

orderRoute.post("/add-order", addOrder);
orderRoute.put("/update-order/:id", updateOrder);
orderRoute.delete("/delete-order/:id", deleteOrder);
orderRoute.get("/get-all-orders", getAllOrders);
orderRoute.get("/get-order-by-id/:id", getOrderById);
orderRoute.get("/get-all-orders-by-user/:userId", getAllOrdersByUser);
orderRoute.get("/get-all-orders-by-product/:productId", getAllOrdersByProduct);

module.exports = orderRoute;
