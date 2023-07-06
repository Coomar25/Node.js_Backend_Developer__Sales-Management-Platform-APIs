const { body } = require("express-validator");

const validateReq = require("../helper/validationHelper");

const validateAddProduct = [
  body("name").notEmpty().withMessage("Please provide product's name."),

  body("price")
    .notEmpty()
    .withMessage("Please provide product's price")
    .isNumeric()
    .withMessage("Price should contain only numbers."),

  (req, res, next) => {
    validateReq(req, res, next);
  },
];

const validateUpdateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Please provide product's name.")
    .optional(),

  body("price")
    .notEmpty()
    .withMessage("Please provide product's price")
    .isNumeric()
    .withMessage("Price should contain only numbers.")
    .optional(),

  (req, res, next) => {
    validateReq(req, res, next);
  },
];
module.exports = { validateAddProduct, validateUpdateProduct };
