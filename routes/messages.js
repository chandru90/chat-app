const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  const { senderId, receiverId, text } = req.body;
  const message = new Message({ sender: senderId, receiver: receiverId, text });
  await message.save();
  res.status(201).send("Message sent");
});

router.get("/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;
  const messages = await Message.find({
    $or: [
      { sender: userId, receiver: friendId },
      { sender: friendId, receiver: userId },
    ],
  })
    .populate("sender", "username")
    .populate("receiver", "username");
  res.json(messages);
});

module.exports = router;

