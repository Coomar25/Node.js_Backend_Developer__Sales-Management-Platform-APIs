const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");
const app = express();
const morgan = require("morgan");

const routes = require("./main.route");
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("<h1>Hello Folks</h1>");
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at port ${PORT}`);
});

module.exports = { app };
