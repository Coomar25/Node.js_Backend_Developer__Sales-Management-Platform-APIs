const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserById,
  deleteUserById,
  getUserById,
} = require("../controllers/userController");
const {
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
} = require("../validators/userValidator");
const upload = require("../helper/multer");
const { isAdmin } = require("../middlewares/auth");

const userRoute = express.Router();

userRoute.post(
  "/register",
  upload.single("avatar"),
  validateRegisterUser,
  registerUser
);

userRoute.post("/login", validateLoginUser, loginUser);

userRoute.put(
  "/update/:id",
  upload.single("avatar"),
  validateUpdateUser,
  updateUserById
);

userRoute.delete("/delete/:id", isAdmin, deleteUserById);

userRoute.get("/get-user/:id", getUserById);

module.exports = userRoute;
