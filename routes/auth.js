
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Message = require("../models/Message");
const { jwtSecret } = require("../config");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send("User registered");
});


router.get("/users", async (req, res) => {
  const users = await User.find({}, "username"); 
  res.json(users);
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }

  
  const messages = await Message.find({
    $or: [{ sender: user._id }, { receiver: user._id }],
  })
    .populate("sender", "username")
    .populate("receiver", "username");

 
  const token = jwt.sign({ id: user._id }, jwtSecret);
  res.json({ token, username, messages });
});

module.exports = router;
