// const express = require("express");
// const mongoose = require("mongoose");
// const http = require("http");
// const socketIo = require("socket.io");
// const cors = require("cors");
// const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
// const { mongoURI } = require("./config");
// const cron = require("node-cron");
// const { truncate } = require("fs");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//      allowedHeaders: ["Content-Type", "Authorization"],
//   }
// });

// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:3000",
// //       "http://localhost:5175",
// //       "http://localhost:5174",
// //     ],
// //     credentials: true,
// //   })
// // );
// app.use(
//   cors({
//     origin: "*", // allow all origins (use specific domain in production)
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ✅ Handle preflight requests
// app.options("*", cors());

// // ✅ Middleware
// app.use(express.json());
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// let users = {};
// let scheduledMessages = [];

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("registerUser", (username) => {
//     users[username] = socket.id;
//     console.log(`User registered: ${username}`);
//     io.emit("updateUsers", Object.keys(users));
//   });

//   socket.on("sendMessage", ({ sender, receiver, text }) => {
//     const recipientSocketId = users[receiver];
//     if (recipientSocketId) {
//       const message = {
//         sender,
//         text,
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       io.to(recipientSocketId).emit("receiveMessage", message);
//       console.log(
//         `Immediate message sent from ${sender} to ${receiver}: ${text}`
//       );
//     } else {
//       console.log(`User ${receiver} is not connected.`);
//     }
//   });

//   socket.on("scheduleMessage", ({ sender, receiver, text, date }) => {
//     const delay = new Date(date).getTime() - Date.now();

//     if (delay > 0) {
//       const job = setTimeout(() => {
//         const recipientSocketId = users[receiver];
//         if (recipientSocketId) {
//           const message = {
//             sender,
//             text,
//             timestamp: new Date().toLocaleTimeString(),
//           };
//           io.to(recipientSocketId).emit("receiveMessage", message);
//           console.log(
//             `Scheduled message sent from ${sender} to ${receiver}: ${text}`
//           );
//         }
//       }, delay);

//       scheduledMessages.push({
//         sender,
//         receiver,
//         text,
//         job,
//       });
//       console.log(`Scheduled message from ${sender} to ${receiver} at ${date}`);
//     } else {
//       console.log("The scheduled time is in the past.");
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     for (const username in users) {
//       if (users[username] === socket.id) {
//         delete users[username];
//         io.emit("updateUsers", Object.keys(users));
//         console.log(`User disconnected: ${username}`);
//         break;
//       }
//     }
//   });
// });

// app.get("/api/auth/active-users", (req, res) => {
//   res.json(Object.keys(users));
// });

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import axios from "axios";
import { pipeline } from "@xenova/transformers";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";
import { mongoURI } from "./config.js";

// ======================================
// APP + SERVER
// ======================================

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// ======================================
// MIDDLEWARE
// ======================================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());

// ======================================
// ROUTES
// ======================================

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ======================================
// DATABASE
// ======================================

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// ======================================
// USERS
// ======================================

let users = {};
let scheduledMessages = [];

// ======================================
// AI MODEL
// ======================================

let classifier;

// ======================================
// LOAD MODEL
// ======================================

async function loadModel() {
  classifier = await pipeline(
    "zero-shot-classification",
    "Xenova/distilbert-base-uncased-mnli"
  );

  console.log("🤖 AI Model Loaded");
}

await loadModel();

// ======================================
// LABELS
// ======================================

const labels = [
  "place order",
  "cancel order",
  "track order",
  "complaint",
  "other",
];

// ======================================
// PRODUCT CACHE
// ======================================

let cachedProducts = [];

// ======================================
// LOAD PRODUCTS
// ======================================

async function loadProducts() {
  if (cachedProducts.length) {
    return cachedProducts;
  }

  const res = await axios.get(
    "https://fakestoreapi.com/products"
  );

  cachedProducts = res.data;

  console.log("📦 Products Loaded");

  return cachedProducts;
}

// ======================================
// EXTRACT ITEMS
// ======================================

async function extractItems(text) {
  const products = await loadProducts();

  const lowerText = text.toLowerCase();

  return products
    .filter((p) =>
      lowerText.includes(
        p.title.toLowerCase().split(" ")[0]
      )
    )
    .map((p) => ({
      productId: p.id,
      title: p.title,
      price: p.price,
      category: p.category,
    }));
}

// ======================================
// EXTRACT QUANTITY
// ======================================

function extractQuantity(text) {
  const match = text.match(/\d+/);

  return match ? parseInt(match[0]) : 1;
}

// ======================================
// EXTRACT ADDRESS
// ======================================

function extractAddress(text) {
  const match = text.match(/to (.+)/i);

  return match ? match[1] : "not provided";
}

// ======================================
// GET INTENT
// ======================================

async function getIntent(text) {
  const result = await classifier(text, labels);

  return {
    intent: result.labels[0],
    confidence: result.scores[0],
  };
}

// ======================================
// ROUTE BY MEANING
// ======================================

function routeByMeaning(intent, items) {
  if (intent === "place order") {
    if (
      items.some((i) =>
        i.category?.includes("electronics")
      )
    ) {
      return "ELECTRONICS_STORE";
    }

    return "GENERAL_STORE";
  }

  if (intent === "cancel order") {
    return "ORDER_CANCEL_SERVICE";
  }

  if (intent === "track order") {
    return "ORDER_TRACKING_SERVICE";
  }

  return "MANUAL_SUPPORT";
}

// ======================================
// SOCKET CONNECTION
// ======================================

io.on("connection", (socket) => {
  console.log("⚡ Client Connected");

  // ====================================
  // REGISTER USER
  // ====================================

  socket.on("registerUser", (username) => {
    // normalize username
    username = username.trim().toLowerCase();

    users[username] = socket.id;

    console.log(`👤 User Registered: ${username}`);

    console.log("🟢 Active Users:", Object.keys(users));

    io.emit("updateUsers", Object.keys(users));
  });

  // ====================================
  // SEND MESSAGE
  // ====================================

  socket.on(
    "sendMessage",
    async ({ sender, receiver, text }) => {
      try {
        // normalize names
        sender = sender.trim().toLowerCase();
        receiver = receiver.trim().toLowerCase();

        // --------------------------------
        // BASE MESSAGE
        // --------------------------------

        const message = {
          sender,
          receiver,
          text,
          timestamp:
            new Date().toLocaleTimeString(),
        };

        // =================================
        // AI CLASSIFICATION
        // ONLY WHEN receiver = blinkeer
        // =================================

        if (receiver === "bliinker") {
          console.log(
            "🤖 Running AI Classification..."
          );

          // -------------------------------
          // INTENT
          // -------------------------------

          const { intent, confidence } =
            await getIntent(text);

          // -------------------------------
          // ITEMS
          // -------------------------------

          const items =
            await extractItems(text);

          // -------------------------------
          // QUANTITY
          // -------------------------------

          const quantity =
            extractQuantity(text);

          // -------------------------------
          // ADDRESS
          // -------------------------------

          const address =
            extractAddress(text);

          // -------------------------------
          // ORDER ITEMS
          // -------------------------------

          const orderItems = items.map(
            (i) => ({
              productId: i.productId,
              title: i.title,
              price: i.price,
              quantity,
              total:
                i.price * quantity,
            })
          );

          const totalAmount =
            orderItems.reduce(
              (sum, i) => sum + i.total,
              0
            );

          // -------------------------------
          // ORDER OBJECT
          // -------------------------------

          const order = {
            orderId: Date.now(),
            intent,
            confidence,
            items: orderItems,
            address,
            routedTo:
              routeByMeaning(
                intent,
                items
              ),
            totalAmount,
            status:
              intent ===
              "place order"
                ? "CONFIRMED"
                : "PENDING",
          };

          console.log(
            "🧾 AI ORDER:",
            order
          );

          // =================================
          // AUTO CHECKOUT
          // =================================

          let checkoutResponse = null;

          if (
            intent === "place order" &&
            orderItems.length > 0
          ) {
            try {
              const orderDetails = {
                customerName: sender,
                email: `${sender}@gmail.com`,
                address,

                items: orderItems.map(
                  (i) => ({
                    productId:
                      i.productId,
                    title: i.title,
                    price: i.price,
                    quantity:
                      i.quantity,
                  })
                ),

                totalAmount,
              };

              console.log(
                "📦 Checkout Payload:",
                orderDetails
              );

              checkoutResponse =
                await axios.post(
                  "https://ecommercestore-yxcj.onrender.com/api/orders/checkout",
                  orderDetails
                );

              console.log(
                "✅ Checkout Success"
              );
            } catch (err) {
              console.log(
                "❌ Checkout Failed:",
                err.message
              );
            }
          }

          // =================================
          // SEND AI RESPONSE
          // =================================

          const recipientSocketId =
            users[receiver];

          if (recipientSocketId) {
            io.to(
              recipientSocketId
            ).emit("receiveMessage", {
              ...message,

              ai: true,

              classification: {
                intent,
                confidence,

                order,

                checkout:
                  checkoutResponse?.data ||
                  null,
              },
            });

            console.log(
              `🤖 AI Result sent to ${receiver}`
            );
          } else {
            console.log(
              `❌ ${receiver} not online`
            );

            console.log(
              "Current users:",
              users
            );
          }

          return;
        }

        // =================================
        // NORMAL CHAT
        // =================================

        const recipientSocketId =
          users[receiver];

        if (recipientSocketId) {
          io.to(
            recipientSocketId
          ).emit(
            "receiveMessage",
            message
          );

          console.log(
            `📨 Message sent from ${sender} to ${receiver}`
          );
        } else {
          console.log(
            `❌ User ${receiver} not connected`
          );

          console.log(
            "Current users:",
            users
          );
        }
      } catch (err) {
        console.log(
          "❌ AI Error:",
          err.message
        );
      }
    }
  );

  // ====================================
  // SCHEDULE MESSAGE
  // ====================================

  socket.on(
    "scheduleMessage",
    ({
      sender,
      receiver,
      text,
      date,
    }) => {
      sender = sender.trim().toLowerCase();
      receiver =
        receiver.trim().toLowerCase();

      const delay =
        new Date(date).getTime() -
        Date.now();

      if (delay > 0) {
        const job = setTimeout(() => {
          const recipientSocketId =
            users[receiver];

          if (recipientSocketId) {
            const message = {
              sender,
              text,
              timestamp:
                new Date().toLocaleTimeString(),
            };

            io.to(
              recipientSocketId
            ).emit(
              "receiveMessage",
              message
            );

            console.log(
              `⏰ Scheduled message sent from ${sender} to ${receiver}`
            );
          }
        }, delay);

        scheduledMessages.push({
          sender,
          receiver,
          text,
          job,
        });

        console.log(
          `📅 Message Scheduled`
        );
      } else {
        console.log(
          "❌ Scheduled time is in the past"
        );
      }
    }
  );

  // ====================================
  // DISCONNECT
  // ====================================

  socket.on("disconnect", () => {
    console.log(
      "🔌 Client Disconnected"
    );

    for (const username in users) {
      if (
        users[username] === socket.id
      ) {
        delete users[username];

        io.emit(
          "updateUsers",
          Object.keys(users)
        );

        console.log(
          `❌ User disconnected: ${username}`
        );

        console.log(
          "🔴 Active Users:",
          Object.keys(users)
        );

        break;
      }
    }
  });
});

// ======================================
// ACTIVE USERS API
// ======================================

app.get(
  "/api/auth/active-users",
  (req, res) => {
    res.json(Object.keys(users));
  }
);

// ======================================
// TEST AI API
// ======================================

app.post("/samp", async (req, res) => {
  try {
    const { message } = req.body;

    const { intent, confidence } =
      await getIntent(message);

    const items =
      await extractItems(message);

    res.json({
      intent,
      confidence,
      items,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================================
// START SERVER
// ======================================

const PORT =
  process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(
    `🚀 Server Running On Port ${PORT}`
  );
});