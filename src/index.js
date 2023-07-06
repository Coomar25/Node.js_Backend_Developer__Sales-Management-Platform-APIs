const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const reportRoute = require("./routes/reportRoute");
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reports", reportRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server ready at ${PORT}`);
});
