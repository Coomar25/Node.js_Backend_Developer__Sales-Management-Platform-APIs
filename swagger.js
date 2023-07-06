const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";

const endpoints = ["./src/index.js"];

swaggerAutogen(outputFile, endpoints)
  .then(() => {
    require("./src/index");
  })
  .catch((err) => {
    console.error(err);
  });
