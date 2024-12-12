const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const { mongoURI } = require("./config");
const cron = require("node-cron");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5175",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

let users = {};
let scheduledMessages = [];

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("registerUser", (username) => {
    users[username] = socket.id;
    console.log(`User registered: ${username}`);
    io.emit("updateUsers", Object.keys(users));
  });

  socket.on("sendMessage", ({ sender, receiver, text }) => {
    const recipientSocketId = users[receiver];
    if (recipientSocketId) {
      const message = {
        sender,
        text,
        timestamp: new Date().toLocaleTimeString(),
      };
      io.to(recipientSocketId).emit("receiveMessage", message);
      console.log(
        `Immediate message sent from ${sender} to ${receiver}: ${text}`
      );
    } else {
      console.log(`User ${receiver} is not connected.`);
    }
  });

  socket.on("scheduleMessage", ({ sender, receiver, text, date }) => {
    const delay = new Date(date).getTime() - Date.now();

    if (delay > 0) {
      const job = setTimeout(() => {
        const recipientSocketId = users[receiver];
        if (recipientSocketId) {
          const message = {
            sender,
            text,
            timestamp: new Date().toLocaleTimeString(),
          };
          io.to(recipientSocketId).emit("receiveMessage", message);
          console.log(
            `Scheduled message sent from ${sender} to ${receiver}: ${text}`
          );
        }
      }, delay);

      scheduledMessages.push({
        sender,
        receiver,
        text,
        job,
      });
      console.log(`Scheduled message from ${sender} to ${receiver} at ${date}`);
    } else {
      console.log("The scheduled time is in the past.");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    for (const username in users) {
      if (users[username] === socket.id) {
        delete users[username];
        io.emit("updateUsers", Object.keys(users));
        console.log(`User disconnected: ${username}`);
        break;
      }
    }
  });
});

app.get("/api/auth/active-users", (req, res) => {
  res.json(Object.keys(users));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
