require("dotenv").config();
const express = require("express");
const cors = require("cors");

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const studentRoutes = require("./routes/student.routes");
const classRoutes = require("./routes/class.routes");
const parentRoutes = require("./routes/parent.routes");
const teacherRoutes = require("./routes/teacher.routes");
const scheduleRoutes = require("./routes/schedule.routes");
const healthRoutes = require("./routes/health.routes");
const scheduleController = require("./controllers/schedule.controller");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/classes", classRoutes);
app.use("/parents", parentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/schedules", scheduleRoutes);
app.use("/health", healthRoutes);
app.get("/test-schedules", scheduleController.getSchedules);
app.get("/ping", (req, res) => res.send("pong"));
app.get("/", (req, res) => res.send("API is running..."));

app.listen(PORT, () => {
  console.log(`[${new Date().toLocaleString()}] Server running on http://localhost:${PORT}`);
  console.log(`Public URL: https://rzr3xpmc-5000.asse.devtunnels.ms/`);
});
