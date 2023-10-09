const express = require('express');
 
const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 8800;
app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/jwtAuth"))
app.use("/dashboard", require("./routes/dashboard"))
app.use("/api", require("./routes/manageUser"))


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

 