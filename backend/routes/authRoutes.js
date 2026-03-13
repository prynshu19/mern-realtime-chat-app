const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

// Sign Up Router
router.post("/signup", signup);

// Login Router
router.post("/login", login);

module.exports = router;
