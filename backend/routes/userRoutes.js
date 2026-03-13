const express = require("express");
const router = express.Router();

const { searchUsers } = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

// User search route
router.get("/search", protect, searchUsers);

module.exports = router;
