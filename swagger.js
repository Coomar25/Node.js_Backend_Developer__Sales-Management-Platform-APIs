const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Sales API",
    description: "API descriptions",
  },
  host: "localhost:3000/api",
  schemes: ["http"],
};
const outputFile = "./swagger-output.json";

const endpoints = ["./src/main.route"];

swaggerAutogen(outputFile, endpoints, doc)
  .then(() => {
    console.log("Swagger-output generated.");
  })
  .catch((err) => {
    console.error(err);
  });
