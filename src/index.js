const express = require("express");
const app = express();
const morgan = require("morgan");
const userRoute = require("./routes/userRoute");
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoute);
// app.use("/api/products");
// app.use("/api/orders/");
// app.use("/api/reports");

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
