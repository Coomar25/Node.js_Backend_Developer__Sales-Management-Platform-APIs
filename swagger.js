const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Sales API",
    description: "API descriptions",
  },
  host: "localhost:3000",
  schemes: ["http"],
};
const outputFile = "./swagger-output.json";

const endpoints = ["./src/main.route"];

swaggerAutogen(outputFile, endpoints, doc)
  .then(() => {
    require("./src/index");
  })
  .catch((err) => {
    console.error(err);
  });
