const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");


router.post("/register", validInfo, async (req, res) => {
    try {
      const { email, name, password } = req.body;
      const user = await req.pool.query("SELECT * FROM userlist");

      const role = user.rows.length === 0 ? "admin" : "user";
  
      if (user.rows.length > 0) {
        return res.status(401).send("User already exist!");
      }
      const saltRund = 10
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      let newUser = await pool.query(
        "INSERT INTO userlist (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
      );
  
      const jwtToken = jwtGenerator(newUser.rows[0].user_id);

      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


  router.post("/login", validInfo,  async (req, res) => {
   
  
    try {
      const { email, password } = req.body;
      const user = await pool.query("SELECT * FROM userlist WHERE user_email = $1", [
        email
      ]);
  
      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credential");
      }
  
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].user_password
      );
  
      if (!validPassword) {
        return res.status(401).json("Invalid Credential");
      }
      const jwtToken = jwtGenerator(user.rows[0].user_id);
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.get("/verify", authorization, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  

module.exports = router