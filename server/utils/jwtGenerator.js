const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (user_id, role) => {
  const payload = {
    user: {
      id: user_id,
      role: role,  
    },
  };
  

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;