const User = require("../models/User");
const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  try {
    const reciverId = req.params.reciverId;
    const senderId = req.user;
    const { text } = req.body;
    console.log("text: ", text);

    if (!text) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const reciver = await User.findById(reciverId);

    if (!reciver) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    const message = await Message.create({
      sender: senderId,
      reciver: reciverId,
      text,
    });

    return res.status(201).json(message);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
