const express = require("express");
const route = express.Router();

const protect = require("../middleware/authMiddleware");
const { sendMessage } = require("../controllers/messageController");

// Send Message Route
route.post("/send/:reciverId", protect, sendMessage);

module.exports = route;
