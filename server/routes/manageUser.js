const router = require("express").Router();
const authorization = require("../middleware/authorization");

router.put("/user/:id", authorization, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Unauthorized" });
      }
  
      const { id } = req.params;
      const { name, email, password } = req.body;
  
      // Update user details in the database
  
      return res.json({ msg: "User updated successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.delete("/user/:id", authorization, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Unauthorized" });
      }
  
      const { id } = req.params;
  
      // Delete the user from the database
  
      return res.json({ msg: "User deleted successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

  router.post("/user", authorization, async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Unauthorized" });
      }
  
      const { name, email, password } = req.body;
  
      // Create a new user in the database
  
      return res.json({ msg: "User created successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

      router.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM userlist");

    return res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/*set as admin*/
// PUT request to set a user as an admin
router.put('/set-admin/:userId', authorization, async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Check if the authenticated user is an admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Only admins can perform this action' });
      }
  
      // Check if the user with the given ID exists in the user pool
      const userFromUserPool = await req.pool.query(
        'SELECT * FROM userlist WHERE user_id = $1',
        [userId]
      );
  
      if (userFromUserPool.rows.length === 0) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Update the user's role to 'admin' and move them to the admin pool
      await req.pool.query(
        'UPDATE userlist SET role = $1 WHERE user_id = $2',
        ['admin', userId]
      );
  
      // Return a success message
      res.json({ msg: 'User set as admin successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;