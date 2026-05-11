const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_123";
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const authRoutes = require("./src/routes/auth");
app.use("/api/auth", authRoutes);
const calcRoutes = require("./src/routes/calculator");
app.use("/api/calc", calcRoutes);
const profileRoutes = require("./src/routes/profile");
app.use("/api/profile", profileRoutes);
const historyRoutes = require("./src/routes/history");
app.use("/api/history", historyRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "C++alculator API сервер",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth (register, login)",
      calc: "/api/calc (calculate)",
      profile: "/api/profile (get, delete)",
      history: "/api/history (get)",
    },
  });
});
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   ✅ C++alculator API SERVER ЗАПУЩЕН   ║
║   🌐 http://localhost:${PORT}              ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
