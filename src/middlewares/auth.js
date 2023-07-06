const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_JWT;

const isAdmin = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      if (user.role === "ADMIN") {
        next();
      } else {
        return res.status(401).json({ message: "Not Authorized" });
      }
    } else {
      return res.status(401).json({ message: "No token found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong with middleware" });
  }
};

module.exports = { isAdmin };
