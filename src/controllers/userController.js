const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

require("dotenv").config();

const SECRET_JWT = process.env.SECRET_JWT;

// User registration
const registerUser = async (req, res) => {
  // Data from req
  const { fullName, email, password } = req.body;

  try {
    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email." });
    }

    // Hash the password with salt 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        avatar: req.file?.path,
      },
    });

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id }, SECRET_JWT);

    res.status(201).json({
      message: "User registered successfully.",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while registering a user" });
  }
};

const loginUser = async (req, res) => {
  // Data from req
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found with this email." });
    }

    // Match password
    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ error: "Invalid Credentials." });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: existingUser.id, role: existingUser.role },
      SECRET_JWT
    );
    res.status(200).json({
      message: "User logged in successfully.",
      user: existingUser,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while logging in." });
  }
};

// User update
const updateUserById = async (req, res) => {
  const { fullName, email, password } = req.body;
  const userId = Number(req.params.id);
  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Payload of user data
    const updateData = {
      fullName: fullName,
      email: email,
    };

    if (password) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (req.file) {
      updateData.avatar = req.file?.path;
    }

    // Update the user data in database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    res.status(200).json({
      message: "User updated successfully.",
      updatedUser: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating user." });
  }
};

// Delete user
const deleteUserById = async (req, res) => {
  const userId = Number(req.params.id);
  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    await prisma.user.delete({ where: { id: userId } });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting user." });
  }
};

// Get users by id
const getUserById = async (req, res) => {
  const userId = Number(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { orders: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res
      .status(200)
      .json({ message: "User details retrieved successfully.", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while retrieving user details." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserById,
  deleteUserById,
  getUserById,
};
