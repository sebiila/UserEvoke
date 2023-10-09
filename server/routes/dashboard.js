const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../config/db");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM userlist WHERE user_id = $1",
      [req.user] 
    ); 
 
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;