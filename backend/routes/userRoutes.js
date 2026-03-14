const express = require("express");
const router = express.Router();

const {
  searchUsers,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

// User search route
router.get("/search", protect, searchUsers);

// Friend request route
router.post("/send-request/:id", protect, sendFriendRequest);

// Friend request Accept request route
router.post("/accept-request/:id", protect, acceptFriendRequest);

// Friend request Reject request route
router.post("/reject-request/:id", protect, rejectFriendRequest);

// Export the router
router.get("/friend-requests", protect, getFriendRequests);

module.exports = router;
