const express = require("express");
const {
  getTotalSales,
  getTotalSalesByDay,
  getTotalSalesByWeek,
  getTotalSalesByMonth,
  getTopSellingProducts,
} = require("../controllers/reportController");

const reportRoute = express.Router();

reportRoute.get("/get-total-sales", getTotalSales);
reportRoute.get("/get-total-sales-by-day", getTotalSalesByDay);
reportRoute.get("/get-total-sales-by-week", getTotalSalesByWeek);
reportRoute.get("/get-total-sales-by-month", getTotalSalesByMonth);
reportRoute.get("/get-top-selling-products", getTopSellingProducts);

module.exports = reportRoute;
