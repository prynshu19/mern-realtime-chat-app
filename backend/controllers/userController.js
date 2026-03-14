const User = require("../models/User");

//   Search users
exports.searchUsers = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          username: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};

    const users = await User.find(keyword)
      .find({ _id: { $ne: req.user } })
      .select("-password");
    console.log("users:", users);

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Unable to search users",
    });
  }
};

// Friend Request
exports.sendFriendRequest = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user;

    if (receiverId === senderId) {
      return res.status(400).json({
        message: "Error, You can't send request to Yourself",
      });
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (receiver.friendRequests.includes(senderId)) {
      return res.status(400).json({
        message: "Request already sent",
      });
    }

    receiver.friendRequests.push(senderId);
    await receiver.save();

    res.json({
      message: "Friend request sent",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Accept Friend Request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const senderUserId = req.params.id;
    const currentUserId = req.user;
    console.log("senderUserId:", senderUserId);
    console.log("currentUserId:", currentUserId);

    const sender = await User.findById(senderUserId);
    const currentUser = await User.findById(currentUserId);

    if (!sender || !currentUser) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    if (!currentUser.friendRequests.includes(senderUserId)) {
      return res.status(400).json({
        message: "No Friend Request from this User",
      });
    }

    currentUser.friendRequests = currentUser.friendRequests.filter(
      (id) => id.toString() !== senderUserId,
    );

    currentUser.friends.push(senderUserId);
    sender.friends.push(currentUserId);

    await currentUser.save();
    await sender.save();

    res.json({
      message: "Friend Request accepted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Some error occurred while accepting friend request",
    });
  }
};
