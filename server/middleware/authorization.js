const jwt = require("jsonwebtoken");
require("dotenv").config();
const { userPool, adminPool } = require("../config/db");

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header("jwtToken");

  // Check if not token
  if (!token) {
      return res.status(403).json({ msg: "Authorization denied" });
  }

  // Verify token
  try {
      // It is going to give us the user id (user: { id: user.id })
      const payload = jwt.verify(token, process.env.jwtSecret);

      if (payload.user) {
          // Check the user's role and set the appropriate database pool
          if (payload.user.role === "admin") {
              req.pool = adminPool;
          } else {
              req.pool = userPool;
          }

          req.user = payload.user;
          next();
      } else {
          res.status(403).json({ msg: "Authorization denied" });
      }
  } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
  }
};