const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserById,
  deleteUserById,
  getUserById,
} = require("../controllers/userController");
const { validateRegisterUser } = require("../validators/userValidator");
const upload = require("../helper/multer");

const userRoute = express.Router();

userRoute.post(
  "/register",
  upload.single("avatar"),
  validateRegisterUser,
  registerUser
);

userRoute.post("/login", loginUser);

userRoute.put("/update/:id", upload.single("avatar"), updateUserById);

userRoute.delete("/delete/:id", deleteUserById);

userRoute.get("/get-user/:id", getUserById);

module.exports = userRoute;
