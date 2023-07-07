const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productRoute");
const reportRoute = require("./routes/reportRoute");
const userRoute = require("./routes/userRoute");

const routes = require("express").Router();

routes.use("/users", userRoute);
routes.use("/products", productRoute);
routes.use("/orders", orderRoute);
routes.use("/reports", reportRoute);

module.exports = routes;
