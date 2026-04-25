require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");
const classRoutes = require("./routes/class.routes");
const parentRoutes = require("./routes/parent.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/classes", classRoutes);
app.use("/parents", parentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Public URL: https://rzr3xpmc-5000.asse.devtunnels.ms/`);
});