const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

require("dotenv").config();

const SECRET_JWT = process.env.SECRET_JWT;

// User registration
const registerUser = async (req, res) => {
  // Data from req
  const { fullname, email, password } = req.body;

  try {
    // Check for existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
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
        fullname,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT Token
    const token = await jwt.sign({ userId: user.id }, SECRET_JWT);

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

module.exports = { registerUser };
