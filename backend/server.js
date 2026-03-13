const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connnectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");

const app = express();

dotenv.config();

connnectDB();

// Connectiong Frontend to Backend
app.use(cors());

// Use Middleware to Parse req Body content
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
