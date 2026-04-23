const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
const authRoutes = require("./routes/auth.routes");

app.use("/auth", authRoutes);