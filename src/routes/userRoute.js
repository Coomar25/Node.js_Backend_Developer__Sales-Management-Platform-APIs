const express = require("express");
const { registerUser } = require("../controllers/userController");
const { validateRegisterUser } = require("../validators/userValidator");
const upload = require("../helper/multer");

const userRoute = express.Router();

userRoute.post(
  "/register",
  upload.single("avatar"),
  validateRegisterUser,
  registerUser
);

module.exports = userRoute;
