// // const express = require("express");
// // const mongoose = require("mongoose");
// // const http = require("http");
// // const socketIo = require("socket.io");
// // const cors = require("cors");
// // const authRoutes = require("./routes/auth");
// // const messageRoutes = require("./routes/messages");
// // const { mongoURI } = require("./config");
// // const cron = require("node-cron");
// // const { truncate } = require("fs");

// // const app = express();
// // const server = http.createServer(app);
// // const io = socketIo(server, {
// //   cors: {
// //     origin: "*",
// //     methods: ["GET", "POST"],
// //      allowedHeaders: ["Content-Type", "Authorization"],
// //   }
// // });

// // // app.use(
// // //   cors({
// // //     origin: [
// // //       "http://localhost:3000",
// // //       "http://localhost:5175",
// // //       "http://localhost:5174",
// // //     ],
// // //     credentials: true,
// // //   })
// // // );
// // app.use(
// //   cors({
// //     origin: "*", // allow all origins (use specific domain in production)
// //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );

// // // ✅ Handle preflight requests
// // app.options("*", cors());

// // // ✅ Middleware
// // app.use(express.json());
// // app.use("/api/auth", authRoutes);
// // app.use("/api/messages", messageRoutes);

// // mongoose
// //   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log("MongoDB connected"))
// //   .catch((err) => console.error(err));

// // let users = {};
// // let scheduledMessages = [];

// // io.on("connection", (socket) => {
// //   console.log("New client connected");

// //   socket.on("registerUser", (username) => {
// //     users[username] = socket.id;
// //     console.log(`User registered: ${username}`);
// //     io.emit("updateUsers", Object.keys(users));
// //   });

// //   socket.on("sendMessage", ({ sender, receiver, text }) => {
// //     const recipientSocketId = users[receiver];
// //     if (recipientSocketId) {
// //       const message = {
// //         sender,
// //         text,
// //         timestamp: new Date().toLocaleTimeString(),
// //       };
// //       io.to(recipientSocketId).emit("receiveMessage", message);
// //       console.log(
// //         `Immediate message sent from ${sender} to ${receiver}: ${text}`
// //       );
// //     } else {
// //       console.log(`User ${receiver} is not connected.`);
// //     }
// //   });

// //   socket.on("scheduleMessage", ({ sender, receiver, text, date }) => {
// //     const delay = new Date(date).getTime() - Date.now();

// //     if (delay > 0) {
// //       const job = setTimeout(() => {
// //         const recipientSocketId = users[receiver];
// //         if (recipientSocketId) {
// //           const message = {
// //             sender,
// //             text,
// //             timestamp: new Date().toLocaleTimeString(),
// //           };
// //           io.to(recipientSocketId).emit("receiveMessage", message);
// //           console.log(
// //             `Scheduled message sent from ${sender} to ${receiver}: ${text}`
// //           );
// //         }
// //       }, delay);

// //       scheduledMessages.push({
// //         sender,
// //         receiver,
// //         text,
// //         job,
// //       });
// //       console.log(`Scheduled message from ${sender} to ${receiver} at ${date}`);
// //     } else {
// //       console.log("The scheduled time is in the past.");
// //     }
// //   });

// //   socket.on("disconnect", () => {
// //     console.log("Client disconnected");
// //     for (const username in users) {
// //       if (users[username] === socket.id) {
// //         delete users[username];
// //         io.emit("updateUsers", Object.keys(users));
// //         console.log(`User disconnected: ${username}`);
// //         break;
// //       }
// //     }
// //   });
// // });

// // app.get("/api/auth/active-users", (req, res) => {
// //   res.json(Object.keys(users));
// // });

// // const PORT = process.env.PORT || 3001;
// // server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// // import express from "express";
// // import mongoose from "mongoose";
// // import http from "http";
// // import { Server } from "socket.io";
// // import cors from "cors";
// // import axios from "axios";
// // import { pipeline } from "@xenova/transformers";

// // import authRoutes from "./routes/auth.js";
// // import messageRoutes from "./routes/messages.js";
// // import { mongoURI } from "./config.js";

// // // ======================================
// // // APP + SERVER
// // // ======================================

// // const app = express();

// // const server = http.createServer(app);

// // const io = new Server(server, {
// //   cors: {
// //     origin: "*",
// //     methods: ["GET", "POST"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   },
// // });

// // // ======================================
// // // MIDDLEWARE
// // // ======================================

// // app.use(
// //   cors({
// //     origin: "*",
// //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );

// // app.use(express.json());

// // // ======================================
// // // ROUTES
// // // ======================================

// // app.use("/api/auth", authRoutes);
// // app.use("/api/messages", messageRoutes);

// // // ======================================
// // // DATABASE
// // // ======================================

// // mongoose
// //   .connect(mongoURI)
// //   .then(() => console.log("✅ MongoDB Connected"))
// //   .catch((err) => console.log("❌ Mongo Error:", err));

// // // ======================================
// // // USERS
// // // ======================================

// // let users = {};
// // let scheduledMessages = [];

// // // ======================================
// // // AI MODEL
// // // ======================================

// // let classifier;

// // // ======================================
// // // LOAD MODEL
// // // ======================================

// // async function loadModel() {
// //   classifier = await pipeline(
// //     "zero-shot-classification",
// //     "Xenova/distilbert-base-uncased-mnli"
// //   );

// //   console.log("🤖 AI Model Loaded");
// // }

// // await loadModel();

// // // ======================================
// // // LABELS
// // // ======================================

// // const labels = [
// //   "place order",
// //   "cancel order",
// //   "track order",
// //   "complaint",
// //   "other",
// // ];

// // // ======================================
// // // PRODUCT CACHE
// // // ======================================

// // let cachedProducts = [];

// // // ======================================
// // // LOAD PRODUCTS
// // // ======================================

// // async function loadProducts() {
// //   try {
// //     if (cachedProducts.length) {
// //       return cachedProducts;
// //     }

// //     const res = await axios.get(
// //       "https://fakestoreapi.com/products"
// //     );

// //     cachedProducts = res.data;

// //     console.log("📦 Products Loaded");

// //     return cachedProducts;
// //   } catch (err) {
// //     console.log(
// //       "❌ Product Load Error:",
// //       err.message
// //     );

// //     return [];
// //   }
// // }

// // // ======================================
// // // EXTRACT ITEMS
// // // ======================================

// // async function extractItems(text) {
// //   const products = await loadProducts();

// //   const lowerText = text.toLowerCase();

// //   return products
// //     .filter((p) =>
// //       lowerText.includes(
// //         p.title.toLowerCase().split(" ")[0]
// //       )
// //     )
// //     .map((p) => ({
// //       productId: p.id,
// //       title: p.title,
// //       price: p.price,
// //       category: p.category,
// //     }));
// // }

// // // ======================================
// // // EXTRACT QUANTITY
// // // ======================================

// // function extractQuantity(text) {
// //   const match = text.match(/\d+/);

// //   return match ? parseInt(match[0]) : 1;
// // }

// // // ======================================
// // // EXTRACT ADDRESS
// // // ======================================

// // function extractAddress(text) {
// //   const match = text.match(/to (.+)/i);

// //   return match ? match[1] : "not provided";
// // }

// // // ======================================
// // // GET INTENT
// // // ======================================

// // async function getIntent(text) {
// //   const result = await classifier(text, labels);

// //   return {
// //     intent: result.labels[0],
// //     confidence: result.scores[0],
// //   };
// // }

// // // ======================================
// // // ROUTE BY MEANING
// // // ======================================

// // function routeByMeaning(intent, items) {
// //   if (intent === "place order") {
// //     if (
// //       items.some((i) =>
// //         i.category?.includes("electronics")
// //       )
// //     ) {
// //       return "ELECTRONICS_STORE";
// //     }

// //     return "GENERAL_STORE";
// //   }

// //   if (intent === "cancel order") {
// //     return "ORDER_CANCEL_SERVICE";
// //   }

// //   if (intent === "track order") {
// //     return "ORDER_TRACKING_SERVICE";
// //   }

// //   return "MANUAL_SUPPORT";
// // }

// // // ======================================
// // // SOCKET CONNECTION
// // // ======================================

// // io.on("connection", (socket) => {
// //   console.log("⚡ Client Connected");

// //   // ====================================
// //   // REGISTER USER
// //   // ====================================

// //   socket.on("registerUser", (username) => {
// //     try {
// //       username = username.trim().toLowerCase();

// //       users[username] = socket.id;

// //       console.log(
// //         `👤 User Registered: ${username}`
// //       );

// //       io.emit(
// //         "updateUsers",
// //         Object.keys(users)
// //       );
// //     } catch (err) {
// //       console.log(
// //         "❌ Register Error:",
// //         err.message
// //       );
// //     }
// //   });

// //   // ====================================
// //   // SEND MESSAGE
// //   // ====================================

// //   socket.on(
// //     "sendMessage",
// //     async ({ sender, receiver, text }) => {
// //       try {
// //         sender = sender.trim().toLowerCase();

// //         receiver =
// //           receiver.trim().toLowerCase();

// //         // =================================
// //         // BASE MESSAGE
// //         // =================================

// //         const message = {
// //           sender,
// //           receiver,
// //           text,
// //           timestamp:
// //             new Date().toLocaleTimeString(),
// //         };

// //         // =================================
// //         // AI BOT SECTION
// //         // =================================

// //         if (receiver === "bliinkr") {
// //           console.log(
// //             "🤖 Running AI Classification..."
// //           );

// //           // =================================
// //           // GET INTENT
// //           // =================================

// //           const { intent, confidence } =
// //             await getIntent(text);

// //           console.log(
// //             "🧠 Intent:",
// //             intent
// //           );

// //           // =================================
// //           // EXTRACT ITEMS
// //           // =================================

// //           const items =
// //             await extractItems(text);

// //           console.log(
// //             "🛒 Items:",
// //             items
// //           );

// //           // =================================
// //           // EXTRACT QUANTITY
// //           // =================================

// //           const quantity =
// //             extractQuantity(text);

// //           // =================================
// //           // EXTRACT ADDRESS
// //           // =================================

// //           const address =
// //             extractAddress(text);

// //           // =================================
// //           // ORDER ITEMS
// //           // =================================

// //           const orderItems = items.map(
// //             (i) => ({
// //               productId: i.productId,
// //               title: i.title,
// //               price: i.price,
// //               quantity,
// //               total:
// //                 i.price * quantity,
// //             })
// //           );

// //           // =================================
// //           // TOTAL AMOUNT
// //           // =================================

// //           const totalAmount =
// //             orderItems.reduce(
// //               (sum, item) =>
// //                 sum + item.total,
// //               0
// //             );

// //           // =================================
// //           // ORDER OBJECT
// //           // =================================

// //           const order = {
// //             orderId: Date.now(),

// //             intent,

// //             confidence,

// //             items: orderItems,

// //             address,

// //             routedTo:
// //               routeByMeaning(
// //                 intent,
// //                 items
// //               ),

// //             totalAmount,

// //             status:
// //               intent ===
// //               "place order"
// //                 ? "CONFIRMED"
// //                 : "PENDING",
// //           };

// //           console.log(
// //             "🧾 AI ORDER:",
// //             JSON.stringify(
// //               order,
// //               null,
// //               2
// //             )
// //           );

// //           // =================================
// //           // AUTO CHECKOUT
// //           // =================================

// //           let checkoutResponse = null;

// //           if (
// //             intent === "place order" &&
// //             orderItems.length > 0
// //           ) {
// //             try {
// //               const orderDetails = {
// //                 customerName: sender,

// //                 email: `${sender}@gmail.com`,

// //                 address,

// //                 items: orderItems.map(
// //                   (i) => ({
// //                     productId:
// //                       i.productId,

// //                     title: i.title,

// //                     price: i.price,

// //                     quantity:
// //                       i.quantity,
// //                   })
// //                 ),

// //                 totalAmount,
// //               };

// //               console.log(
// //                 "📦 Checkout Payload:"
// //               );

// //               console.log(
// //                 JSON.stringify(
// //                   orderDetails,
// //                   null,
// //                   2
// //                 )
// //               );

// //               // =================================
// //               // CHECKOUT API
// //               // =================================

// //               const response =
// //                 await axios.post(
// //                   "https://ecommercestore-yxcj.onrender.com/api/orders/checkout",
// //                   orderDetails,
// //                   {
// //                     headers: {
// //                       "Content-Type":
// //                         "application/json",
// //                     },

// //                     timeout: 30000,
// //                   }
// //                 );

// //               checkoutResponse =
// //                 response.data;

// //               console.log(
// //                 "✅ Checkout Success"
// //               );

// //               console.log(
// //                 checkoutResponse
// //               );
// //             } catch (err) {
// //               console.log(
// //                 "❌ Checkout Failed"
// //               );

// //               if (err.response) {
// //                 console.log(
// //                   "STATUS:",
// //                   err.response.status
// //                 );

// //                 console.log(
// //                   "DATA:",
// //                   err.response.data
// //                 );
// //               } else {
// //                 console.log(
// //                   err.message
// //                 );
// //               }
// //             }
// //           }

// //           // =================================
// //           // SEND AI RESPONSE
// //           // =================================

// //           const recipientSocketId =
// //             users[receiver];

// //           if (recipientSocketId) {
// //             io.to(
// //               recipientSocketId
// //             ).emit("receiveMessage", {
// //               ...message,

// //               ai: true,

// //               classification: {
// //                 intent,

// //                 confidence,

// //                 order,

// //                 checkout:
// //                   checkoutResponse ||
// //                   null,
// //               },
// //             });

// //             console.log(
// //               `🤖 AI Response Sent To ${receiver}`
// //             );
// //           } else {
// //             console.log(
// //               `❌ ${receiver} Not Online`
// //             );
// //           }

// //           return;
// //         }

// //         // =================================
// //         // NORMAL CHAT
// //         // =================================

// //         const recipientSocketId =
// //           users[receiver];

// //         if (recipientSocketId) {
// //           io.to(
// //             recipientSocketId
// //           ).emit(
// //             "receiveMessage",
// //             message
// //           );

// //           console.log(
// //             `📨 Message Sent From ${sender} To ${receiver}`
// //           );
// //         } else {
// //           console.log(
// //             `❌ User ${receiver} Not Connected`
// //           );
// //         }
// //       } catch (err) {
// //         console.log(
// //           "❌ AI Error:",
// //           err.message
// //         );
// //       }
// //     }
// //   );

// //   // ====================================
// //   // SCHEDULE MESSAGE
// //   // ====================================

// //   socket.on(
// //     "scheduleMessage",
// //     ({
// //       sender,
// //       receiver,
// //       text,
// //       date,
// //     }) => {
// //       try {
// //         sender =
// //           sender.trim().toLowerCase();

// //         receiver =
// //           receiver.trim().toLowerCase();

// //         const delay =
// //           new Date(date).getTime() -
// //           Date.now();

// //         if (delay <= 0) {
// //           return console.log(
// //             "❌ Scheduled Time In Past"
// //           );
// //         }

// //         const job = setTimeout(() => {
// //           const recipientSocketId =
// //             users[receiver];

// //           if (recipientSocketId) {
// //             const message = {
// //               sender,
// //               receiver,
// //               text,

// //               timestamp:
// //                 new Date().toLocaleTimeString(),
// //             };

// //             io.to(
// //               recipientSocketId
// //             ).emit(
// //               "receiveMessage",
// //               message
// //             );

// //             console.log(
// //               `⏰ Scheduled Message Sent`
// //             );
// //           }
// //         }, delay);

// //         scheduledMessages.push({
// //           sender,
// //           receiver,
// //           text,
// //           job,
// //         });

// //         console.log(
// //           "📅 Message Scheduled"
// //         );
// //       } catch (err) {
// //         console.log(
// //           "❌ Schedule Error:",
// //           err.message
// //         );
// //       }
// //     }
// //   );

// //   // ====================================
// //   // DISCONNECT
// //   // ====================================

// //   socket.on("disconnect", () => {
// //     console.log(
// //       "🔌 Client Disconnected"
// //     );

// //     for (const username in users) {
// //       if (
// //         users[username] === socket.id
// //       ) {
// //         delete users[username];

// //         io.emit(
// //           "updateUsers",
// //           Object.keys(users)
// //         );

// //         console.log(
// //           `❌ User Disconnected: ${username}`
// //         );

// //         break;
// //       }
// //     }
// //   });
// // });

// // // ======================================
// // // ACTIVE USERS API
// // // ======================================

// // app.get(
// //   "/api/auth/active-users",
// //   (req, res) => {
// //     res.json(Object.keys(users));
// //   }
// // );

// // // ======================================
// // // TEST AI API
// // // ======================================

// // app.post("/samp", async (req, res) => {
// //   try {
// //     const { message } = req.body;

// //     const { intent, confidence } =
// //       await getIntent(message);

// //     const items =
// //       await extractItems(message);

// //     res.json({
// //       success: true,
// //       intent,
// //       confidence,
// //       items,
// //     });
// //   } catch (err) {
// //     res.status(500).json({
// //       success: false,
// //       error: err.message,
// //     });
// //   }
// // });

// // // ======================================
// // // HEALTH CHECK
// // // ======================================

// // app.get("/", (req, res) => {
// //   res.json({
// //     success: true,
// //     message:
// //       "🚀 AI Chat Server Running",
// //   });
// // });

// // // ======================================
// // // START SERVER
// // // ======================================

// // const PORT =
// //   process.env.PORT || 3001;

// // server.listen(PORT, () => {
// //   console.log(
// //     `🚀 Server Running On Port ${PORT}`
// //   );
// // });














// import express from "express";
// import mongoose from "mongoose";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import axios from "axios";
// import { pipeline } from "@xenova/transformers";

// import authRoutes from "./routes/auth.js";
// import messageRoutes from "./routes/messages.js";
// import { mongoURI } from "./config.js";

// // ======================================
// // APP + SERVER
// // ======================================

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// // ======================================
// // MIDDLEWARE
// // ======================================

// app.use(cors());
// app.use(express.json());

// // ======================================
// // ROUTES
// // ======================================

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // ======================================
// // DB
// // ======================================

// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ Mongo Error:", err));

// // ======================================
// // USERS MEMORY
// // ======================================

// let users = {};

// // ======================================
// // AI MODEL
// // ======================================

// let classifier;

// async function loadModel() {
//   classifier = await pipeline(
//     "zero-shot-classification",
//     "Xenova/distilbert-base-uncased-mnli"
//   );

//   console.log("🤖 AI Model Loaded");
// }

// await loadModel();

// const labels = [
//   "place order",
//   "cancel order",
//   "track order",
//   "complaint",
//   "other",
// ];

// // ======================================
// // HELPERS
// // ======================================

// function extractQuantity(text) {
//   const match = text.match(/\d+/);
//   return match ? parseInt(match[0]) : 1;
// }

// function extractAddress(text) {
//   const match = text.match(/to (.+)/i);
//   return match ? match[1] : "not provided";
// }

// function routeByMeaning(intent) {
//   if (intent === "place order") return "STORE";
//   if (intent === "cancel order") return "CANCEL_SERVICE";
//   if (intent === "track order") return "TRACKING";
//   return "SUPPORT";
// }

// // ======================================
// // SOCKET.IO
// // ======================================

// io.on("connection", (socket) => {
//   console.log("⚡ Client Connected");

//   // REGISTER USER
//   socket.on("registerUser", (username) => {
//     username = username.trim().toLowerCase();
//     users[username] = socket.id;

//     io.emit("updateUsers", Object.keys(users));
//   });

//   // SEND MESSAGE
//   socket.on("sendMessage", async ({ sender, receiver, text }) => {
//     try {
//       sender = sender.trim().toLowerCase();
//       receiver = receiver.trim().toLowerCase();

//       const message = {
//         sender,
//         receiver,
//         text,
//         timestamp: new Date().toLocaleTimeString(),
//       };

//       // ======================================
//       // NORMAL CHAT
//       // ======================================

//       if (receiver !== "bliinkr") {
//         const socketId = users[receiver];

//         if (socketId) {
//           io.to(socketId).emit("receiveMessage", message);
//         }

//         return;
//       }

//       // ======================================
//       // AI FLOW (ONLY WHEN receiver = bliinkr)
//       // ======================================

//       console.log("🤖 AI Processing...");

//       const { intent, confidence } = await classifier(text, labels);

//       const quantity = extractQuantity(text);
//       const address = extractAddress(text);

//       const orderItems = [
//         {
//           productId: Date.now(),
//           title: "Auto Product",
//           price: 100,
//           quantity,
//           total: 100 * quantity,
//         },
//       ];

//       const totalAmount = orderItems.reduce(
//         (sum, i) => sum + i.total,
//         0
//       );

//       const order = {
//         orderId: Date.now(),
//         intent,
//         confidence,
//         items: orderItems,
//         address,
//         routedTo: routeByMeaning(intent),
//         totalAmount,
//         status:
//           intent === "place order"
//             ? "CONFIRMED"
//             : "PENDING",
//       };

//       console.log("🧾 ORDER CREATED:", order);

//       // ======================================
//       // 🔥 SEND TO DASHBOARD (ONLY ONCE)
//       // ======================================

//       io.emit("newOrder", {
//         sender,
//         order,
//         timestamp: new Date().toLocaleTimeString(),
//       });
// console.log("🚀 New order created:", order);
//       // ======================================
//       // OPTIONAL CHECKOUT
//       // ======================================

//       let checkoutResponse = null;

//       if (intent === "place order") {
//         try {
//           const response = await axios.post(
//             "https://ecommercestore-yxcj.onrender.com/api/orders/checkout",
//             {
//               customerName: sender,
//               address,
//               items: orderItems,
//               totalAmount,
//             }
//           );

//           checkoutResponse = response.data;
//         } catch (err) {
//           console.log("Checkout error:", err.message);
//         }
//       }

//       // ======================================
//       // SEND RESPONSE BACK TO USER
//       // ======================================

//       const socketId = users[sender];

//       if (socketId) {
//         io.to(socketId).emit("receiveMessage", {
//           sender: "bliinkr",
//           text: "Order processed successfully",
//           ai: true,
//           classification: {
//             intent,
//             confidence,
//             order,
//             checkout: checkoutResponse,
//           },
//         });
//       }
//     } catch (err) {
//       console.log("AI ERROR:", err.message);
//     }
//   });

//   // DISCONNECT
//   socket.on("disconnect", () => {
//     for (let user in users) {
//       if (users[user] === socket.id) {
//         delete users[user];
//         io.emit("updateUsers", Object.keys(users));
//         break;
//       }
//     }
//   });
// });

// // ======================================
// // API
// // ======================================

// app.get("/api/auth/active-users", (req, res) => {
//   res.json(Object.keys(users));
// });

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "AI Chat Server Running",
//   });
// });

// // ======================================
// // START SERVER
// // ======================================

// const PORT = process.env.PORT || 3001;

// server.listen(PORT, () => {
//   console.log(`🚀 Server running on ${PORT}`);
// });





// import express from "express";
// import mongoose from "mongoose";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import axios from "axios";
// import { pipeline } from "@xenova/transformers";

// import authRoutes from "./routes/auth.js";
// import messageRoutes from "./routes/messages.js";
// import { mongoURI } from "./config.js";

// // ======================================
// // APP + SERVER
// // ======================================

// const app = express();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// // ======================================
// // MIDDLEWARE
// // ======================================

// app.use(cors());
// app.use(express.json());

// // ======================================
// // ROUTES
// // ======================================

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // ======================================
// // DATABASE
// // ======================================

// mongoose
//   .connect(mongoURI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//   })
//   .catch((err) => {
//     console.log("❌ Mongo Error:", err.message);
//   });

// // ======================================
// // USERS MEMORY
// // ======================================

// let users = {};

// // ======================================
// // AI MODEL
// // ======================================

// let classifier;

// // ======================================
// // LOAD AI MODEL
// // ======================================

// async function loadModel() {
//   try {
//     classifier = await pipeline(
//       "zero-shot-classification",
//       "Xenova/distilbert-base-uncased-mnli"
//     );

//     console.log("🤖 AI Model Loaded");
//   } catch (err) {
//     console.log("❌ Model Load Error:", err.message);
//   }
// }

// // ======================================
// // LABELS
// // ======================================

// const labels = [
//   "place order",
//   "cancel order",
//   "track order",
//   "complaint",
//   "other",
// ];

// // ======================================
// // PRODUCT CACHE
// // ======================================

// let cachedProducts = [];

// // ======================================
// // LOAD PRODUCTS
// // ======================================

// async function loadProducts() {
//   try {
//     const response = await axios.get(
//       "https://fakestoreapi.com/products"
//     );

//     cachedProducts = response.data;

//     console.log(
//       `📦 ${cachedProducts.length} Products Loaded`
//     );
//   } catch (err) {
//     console.log(
//       "❌ Product Load Error:",
//       err.message
//     );
//   }
// }

// // ======================================
// // EXTRACT PRODUCTS FROM MESSAGE
// // ======================================

// async function extractItems(text) {
//   const lowerText = text.toLowerCase();

//   return cachedProducts
//     .filter((product) => {
//       return lowerText.includes(
//         product.title.toLowerCase().split(" ")[0]
//       );
//     })
//     .map((product) => ({
//       productId: product.id,
//       title: product.title,
//       price: product.price,
//       category: product.category,
//     }));
// }

// // ======================================
// // EXTRACT QUANTITY
// // ======================================

// function extractQuantity(text) {
//   const match = text.match(/\d+/);

//   return match ? parseInt(match[0]) : 1;
// }

// // ======================================
// // EXTRACT ADDRESS
// // ======================================

// function extractAddress(text) {
//   const match = text.match(/to (.+)/i);

//   return match ? match[1] : "not provided";
// }

// // ======================================
// // ROUTING LOGIC
// // ======================================

// function routeByMeaning(intent, items) {
//   if (intent === "place order") {
//     if (
//       items.some((i) =>
//         i.category?.includes("electronics")
//       )
//     ) {
//       return "ELECTRONICS_STORE";
//     }

//     return "GENERAL_STORE";
//   }

//   if (intent === "cancel order") {
//     return "ORDER_CANCEL_SERVICE";
//   }

//   if (intent === "track order") {
//     return "ORDER_TRACKING_SERVICE";
//   }

//   return "MANUAL_SUPPORT";
// }

// // ======================================
// // START AI + PRODUCTS
// // ======================================

// await loadModel();

// await loadProducts();

// console.log("🚀 AI + Products Ready");

// // ======================================
// // SOCKET.IO
// // ======================================

// io.on("connection", (socket) => {
//   console.log("⚡ Client Connected");

//   // ====================================
//   // REGISTER USER
//   // ====================================

//   socket.on("registerUser", (username) => {
//     try {
//       username = username.trim().toLowerCase();

//       users[username] = socket.id;

//       console.log(
//         `👤 User Registered: ${username}`
//       );

//       io.emit(
//         "updateUsers",
//         Object.keys(users)
//       );
//     } catch (err) {
//       console.log(
//         "❌ Register Error:",
//         err.message
//       );
//     }
//   });

//   // ====================================
//   // SEND MESSAGE
//   // ====================================

//   socket.on(
//     "sendMessage",
//     async ({ sender, receiver, text }) => {
//       try {
//         sender = sender.trim().toLowerCase();

//         receiver =
//           receiver.trim().toLowerCase();

//         const message = {
//           sender,
//           receiver,
//           text,
//           timestamp:
//             new Date().toLocaleTimeString(),
//         };

//         // =================================
//         // NORMAL CHAT
//         // =================================

//         if (receiver !== "bliinkr") {
//           const recipientSocketId =
//             users[receiver];

//           if (recipientSocketId) {
//             io.to(
//               recipientSocketId
//             ).emit(
//               "receiveMessage",
//               message
//             );

//             console.log(
//               `📨 Message Sent From ${sender} To ${receiver}`
//             );
//           } else {
//             console.log(
//               `❌ User ${receiver} Not Connected`
//             );
//           }

//           return;
//         }

//         // =================================
//         // AI FLOW
//         // =================================

//         console.log(
//           "🤖 AI Processing..."
//         );

//         // =================================
//         // GET INTENT
//         // =================================

//         const result =
//           await classifier(text, labels);

//         const intent =
//           result.labels[0];

//         const confidence =
//           result.scores[0];

//         console.log(
//           "🧠 Intent:",
//           intent
//         );

//         // =================================
//         // EXTRACT ITEMS
//         // =================================

//         const items =
//           await extractItems(text);

//         console.log(
//           "🛒 Matched Products:",
//           items
//         );

//         // =================================
//         // EXTRACT QUANTITY
//         // =================================

//         const quantity =
//           extractQuantity(text);

//         // =================================
//         // EXTRACT ADDRESS
//         // =================================

//         const address =
//           extractAddress(text);

//         // =================================
//         // ORDER ITEMS
//         // =================================

//         const orderItems = items.map(
//           (item) => ({
//             productId:
//               item.productId,

//             title: item.title,

//             price: item.price,

//             quantity,

//             total:
//               item.price * quantity,
//           })
//         );

//         // =================================
//         // TOTAL AMOUNT
//         // =================================

//         const totalAmount =
//           orderItems.reduce(
//             (sum, item) =>
//               sum + item.total,
//             0
//           );

//         // =================================
//         // ORDER OBJECT
//         // =================================

//         const order = {
//           orderId: Date.now(),

//           intent,

//           confidence,

//           items: orderItems,

//           address,

//           routedTo:
//             routeByMeaning(
//               intent,
//               items
//             ),

//           totalAmount,

//           status:
//             intent ===
//             "place order"
//               ? "CONFIRMED"
//               : "PENDING",
//         };

//         console.log(
//           "🧾 ORDER CREATED:"
//         );

//         console.log(
//           JSON.stringify(
//             order,
//             null,
//             2
//           )
//         );

//         // =================================
//         // SEND TO DASHBOARD
//         // =================================

//         io.emit("newOrder", {
//           sender,
//           order,
//           timestamp:
//             new Date().toLocaleTimeString(),
//         });

//         console.log(
//           "🚀 New Order Emitted"
//         );

//         // =================================
//         // CHECKOUT API
//         // =================================

//         let checkoutResponse = null;

//         if (
//           intent === "place order" &&
//           orderItems.length > 0
//         ) {
//           try {
//             const response =
//               await axios.post(
//                 "https://ecommercestore-yxcj.onrender.com/api/orders/checkout",
//                 {
//                   customerName:
//                     sender,

//                   address,

//                   items: orderItems,

//                   totalAmount,
//                 }
//               );

//             checkoutResponse =
//               response.data;

//             console.log(
//               "✅ Checkout Success"
//             );
//           } catch (err) {
//             console.log(
//               "❌ Checkout Error:",
//               err.message
//             );
//           }
//         }

//         // =================================
//         // SEND RESPONSE TO USER
//         // =================================

//         const senderSocketId =
//           users[sender];

//         if (senderSocketId) {
//           io.to(
//             senderSocketId
//           ).emit("receiveMessage", {
//             sender: "bliinkr",

//             receiver: sender,

//             text:
//               orderItems.length > 0
//                 ? "✅ Order processed successfully"
//                 : "❌ No matching products found",

//             timestamp:
//               new Date().toLocaleTimeString(),

//             ai: true,

//             classification: {
//               intent,

//               confidence,

//               order,

//               checkout:
//                 checkoutResponse,
//             },
//           });

//           console.log(
//             "🤖 AI Response Sent"
//           );
//         }
//       } catch (err) {
//         console.log(
//           "❌ AI ERROR:",
//           err.message
//         );
//       }
//     }
//   );

//   // ====================================
//   // DISCONNECT
//   // ====================================

//   socket.on("disconnect", () => {
//     console.log(
//       "🔌 Client Disconnected"
//     );

//     for (const username in users) {
//       if (
//         users[username] === socket.id
//       ) {
//         delete users[username];

//         io.emit(
//           "updateUsers",
//           Object.keys(users)
//         );

//         console.log(
//           `❌ User Disconnected: ${username}`
//         );

//         break;
//       }
//     }
//   });
// });

// // ======================================
// // ACTIVE USERS API
// // ======================================

// app.get(
//   "/api/auth/active-users",
//   (req, res) => {
//     res.json(Object.keys(users));
//   }
// );

// // ======================================
// // HEALTH CHECK
// // ======================================

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message:
//       "🚀 AI Chat Server Running",
//   });
// });

// // ======================================
// // START SERVER
// // ======================================

// const PORT =
//   process.env.PORT || 3001;

// server.listen(PORT, () => {
//   console.log(
//     `🚀 Server Running On Port ${PORT}`
//   );
// });

// import express from "express";
// import mongoose from "mongoose";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import axios from "axios";
// import { pipeline } from "@xenova/transformers";

// import authRoutes from "./routes/auth.js";
// import messageRoutes from "./routes/messages.js";
// import { mongoURI } from "./config.js";

// // ======================
// // APP + SERVER
// // ======================
// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// // ======================
// // MIDDLEWARE
// // ======================
// app.use(cors());
// app.use(express.json());

// // ======================
// // ROUTES
// // ======================
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // ======================
// // DB
// // ======================
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ Mongo Error:", err.message));

// // ======================
// // USERS
// // ======================
// let users = {};

// // ======================
// // AI MODEL
// // ======================
// let classifier;

// async function loadModel() {
//   classifier = await pipeline(
//     "zero-shot-classification",
//     "Xenova/distilbert-base-uncased-mnli"
//   );
//   console.log("🤖 AI Model Loaded");
// }

// // ======================
// // LABELS
// // ======================
// const labels = [
//   "place order",
//   "cancel order",
//   "track order",
//   "complaint",
//   "other",
// ];

// // ======================
// // PRODUCTS CACHE
// // ======================
// let cachedProducts = [];

// async function loadProducts() {
//   try {
//     const res = await axios.get("https://fakestoreapi.com/products");
//     cachedProducts = res.data;
//     console.log(`📦 ${cachedProducts.length} Products Loaded`);
//   } catch (err) {
//     console.log("❌ Product Load Error:", err.message);
//   }
// }

// // ======================
// // EXTRACT ITEMS
// // ======================
// async function extractItems(text) {
//   const lowerText = text.toLowerCase();

//   return cachedProducts
//     .filter((p) =>
//       lowerText.includes(p.title.toLowerCase().split(" ")[0])
//     )
//     .map((p) => ({
//       productId: p.id,
//       title: p.title,
//       price: p.price,
//       category: p.category,
//     }));
// }

// // ======================
// // QUANTITY
// // ======================
// function extractQuantity(text) {
//   const match = text.match(/\d+/);
//   return match ? parseInt(match[0]) : 1;
// }

// // ======================
// // ADDRESS
// // ======================
// function extractAddress(text) {
//   const match = text.match(/to (.+)/i);
//   return match ? match[1] : null; // 🔥 FIX: null instead of "not provided"
// }

// // ======================
// // ROUTING
// // ======================
// function routeByMeaning(intent, items) {
//   if (intent === "place order") {
//     if (items.some((i) => i.category?.includes("electronics"))) {
//       return "ELECTRONICS_STORE";
//     }
//     return "GENERAL_STORE";
//   }

//   if (intent === "cancel order") return "ORDER_CANCEL_SERVICE";
//   if (intent === "track order") return "ORDER_TRACKING_SERVICE";

//   return "MANUAL_SUPPORT";
// }

// // ======================
// // INIT
// // ======================
// await loadModel();
// await loadProducts();

// console.log("🚀 AI + Products Ready");

// // ======================
// // SOCKET
// // ======================
// io.on("connection", (socket) => {
//   console.log("⚡ Client Connected");

//   // ======================
//   // REGISTER USER
//   // ======================
//   socket.on("registerUser", (username) => {
//     username = username.trim().toLowerCase();
//     users[username] = socket.id;

//     io.emit("updateUsers", Object.keys(users));
//   });

//   // ======================
//   // MESSAGE
//   // ======================
//   socket.on("sendMessage", async ({ sender, receiver, text }) => {
//     try {
//       sender = sender.trim().toLowerCase();
//       receiver = receiver.trim().toLowerCase();

//       const message = {
//         sender,
//         receiver,
//         text,
//         timestamp: new Date().toLocaleTimeString(),
//       };

//       // ======================
//       // NORMAL CHAT
//       // ======================
//       if (receiver !== "bliinkr") {
//         const socketId = users[receiver];

//         if (socketId) {
//           io.to(socketId).emit("receiveMessage", message);
//         }
//         return;
//       }

//       // ======================
//       // AI FLOW
//       // ======================
//       const result = await classifier(text, labels);
//       const intent = result.labels[0];
//       const confidence = result.scores[0];

//       const items = await extractItems(text);
//       const quantity = extractQuantity(text);
//       const address = extractAddress(text);

//       const orderItems = items.map((item) => ({
//         productId: item.productId,
//         title: item.title,
//         price: item.price,
//         quantity,
//         total: item.price * quantity,
//       }));

//       const totalAmount = orderItems.reduce(
//         (sum, item) => sum + item.total,
//         0
//       );

//       const order = {
//         orderId: Date.now(),
//         intent,
//         confidence,
//         items: orderItems,
//         address ,
//         routedTo: routeByMeaning(intent, items),
//         totalAmount,
//         status: intent === "place order" ? "CONFIRMED" : "PENDING",
//       };

//       io.emit("newOrder", {
//         sender,
//         order,
//         timestamp: new Date().toLocaleTimeString(),
//       });

//       // ======================
//       // CHECKOUT (FIXED + DEBUG READY)
//       // ======================
//       let checkoutResponse = null;

//       if (intent === "place order" && orderItems.length > 0) {
//         try {
//           const cleanedItems = orderItems.map((i) => ({
//             productId: i.productId,
//             title: i.title,
//             price: i.price,
//             quantity: i.quantity,
//           }));

//           const payload = {
//             customerName: sender,
//             address,
//             items: cleanedItems,
//             totalAmount: Number(totalAmount),
//           };

//           console.log("📦 CHECKOUT PAYLOAD:");
//           console.log(JSON.stringify(payload, null, 2));

//           const response = await axios.post(
//             "https://ecommercestore-yxcj.onrender.com/api/orders/checkout",
//             payload,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               timeout: 30000,
//             }
//           );

//           checkoutResponse = response.data;

//           console.log("✅ Checkout Success");
//         } catch (err) {
//           console.log("❌ Checkout Error:");

//           if (err.response) {
//             console.log("STATUS:", err.response.status);

//             const data = err.response.data;

//             console.log("FULL ERROR:");
//             console.log(JSON.stringify(data, null, 2));

//             // 🔥 FIELD EXTRACTION
//             if (data?.missingFields) {
//               console.log("🚨 Missing Fields:", data.missingFields);
//             }

//             if (data?.errors) {
//               console.log("🚨 Validation Errors:");
//               Object.keys(data.errors).forEach((f) => {
//                 console.log(`- ${f}: ${data.errors[f].message}`);
//               });
//             }

//             if (data?.message) {
//               console.log("MESSAGE:", data.message);
//             }
//           } else {
//             console.log("NETWORK ERROR:", err.message);
//           }
//         }
//       }

//       // ======================
//       // RESPONSE TO USER
//       // ======================
//       const socketId = users[sender];

//       if (socketId) {
//         io.to(socketId).emit("receiveMessage", {
//           sender: "bliinkr",
//           receiver: sender,
//           text:
//             orderItems.length > 0
//               ? "✅ Order processed successfully"
//               : "❌ No matching products found",
//           timestamp: new Date().toLocaleTimeString(),
//           ai: true,
//           classification: {
//             intent,
//             confidence,
//             order,
//             checkout: checkoutResponse,
//           },
//         });
//       }
//     } catch (err) {
//       console.log("❌ AI ERROR:", err.message);
//     }
//   });

//   // ======================
//   // DISCONNECT
//   // ======================
//   socket.on("disconnect", () => {
//     for (const user in users) {
//       if (users[user] === socket.id) {
//         delete users[user];
//         io.emit("updateUsers", Object.keys(users));
//         break;
//       }
//     }
//   });
// });

// // ======================
// // HEALTH CHECK
// // ======================
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "🚀 AI Chat Server Running",
//   });
// });

// // ======================
// // START SERVER
// // ======================
// const PORT = process.env.PORT || 3001;

// server.listen(PORT, () => {
//   console.log(`🚀 Server Running On Port ${PORT}`);
// });


























// import express from "express";
// import mongoose from "mongoose";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import axios from "axios";
// import { pipeline } from "@xenova/transformers";

// import authRoutes from "./routes/auth.js";
// import messageRoutes from "./routes/messages.js";
// import { mongoURI } from "./config.js";

// // ======================
// // APP + SERVER
// // ======================
// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// // ======================
// // MIDDLEWARE
// // ======================
// app.use(cors());
// app.use(express.json());

// // ======================
// // ROUTES
// // ======================
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // ======================
// // DB
// // ======================
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ Mongo Error:", err.message));

// // ======================
// // USERS
// // ======================
// let users = {};

// // ======================
// // AI MODEL
// // ======================
// let classifier;

// async function loadModel() {
//   classifier = await pipeline(
//     "zero-shot-classification",
//     "Xenova/distilbert-base-uncased-mnli"
//   );
//   console.log("🤖 AI Model Loaded");
// }

// // ======================
// // LABELS
// // ======================
// const labels = [
//   "place order",
//   "cancel order",
//   "track order",
//   "complaint",
//   "other",
// ];

// // ======================
// // PRODUCTS CACHE
// // ======================
// let cachedProducts = [];

// async function loadProducts() {
//   try {
//     const res = await axios.get("https://fakestoreapi.com/products");
//     cachedProducts = res.data;
//     console.log(`📦 ${cachedProducts.length} Products Loaded`);
//   } catch (err) {
//     console.log("❌ Product Load Error:", err.message);
//   }
// }

// // ======================
// // EXTRACT ITEMS
// // ======================
// async function extractItems(text) {
//   const lowerText = text.toLowerCase();

//   return cachedProducts
//     .filter((p) =>
//       lowerText.includes(p.title.toLowerCase().split(" ")[0])
//     )
//     .map((p) => ({
//       productId: p.id,
//       title: p.title,
//       price: p.price,
//       category: p.category,
//     }));
// }

// // ======================
// // QUANTITY
// // ======================
// function extractQuantity(text) {
//   const match = text.match(/\d+/);
//   return match ? parseInt(match[0]) : 1;
// }

// // ======================
// // ADDRESS (SAFE)
// // ======================
// function extractAddress(text) {
//   const match = text.match(/to (.+)/i);
//   return match ? match[1] : "not provided";
// }

// // ======================
// // ROUTING
// // ======================
// function routeByMeaning(intent, items) {
//   if (intent === "place order") {
//     if (items.some((i) => i.category?.includes("electronics"))) {
//       return "ELECTRONICS_STORE";
//     }
//     return "GENERAL_STORE";
//   }

//   if (intent === "cancel order") return "ORDER_CANCEL_SERVICE";
//   if (intent === "track order") return "ORDER_TRACKING_SERVICE";

//   return "MANUAL_SUPPORT";
// }

// // ======================
// // INIT
// // ======================
// await loadModel();
// await loadProducts();

// console.log("🚀 AI + Products Ready");

// // ======================
// // SOCKET
// // ======================
// io.on("connection", (socket) => {
//   console.log("⚡ Client Connected");

//   // ======================
//   // REGISTER USER
//   // ======================
//   socket.on("registerUser", (username) => {
//     username = username.trim().toLowerCase();
//     users[username] = socket.id;

//     io.emit("updateUsers", Object.keys(users));
//   });

//   // ======================
//   // SEND MESSAGE
//   // ======================
//   socket.on("sendMessage", async ({ sender, receiver, text }) => {
//     try {
//       sender = sender.trim().toLowerCase();
//       receiver = receiver.trim().toLowerCase();

//       const message = {
//         sender,
//         receiver,
//         text,
//         timestamp: new Date().toLocaleTimeString(),
//       };

//       // ======================
//       // NORMAL CHAT
//       // ======================
//       if (receiver !== "bliinkr") {
//         const socketId = users[receiver];

//         if (socketId) {
//           io.to(socketId).emit("receiveMessage", message);
//         }
//         return;
//       }

//       // ======================
//       // AI FLOW
//       // ======================
//       const result = await classifier(text, labels);
//       const intent = result.labels[0];
//       const confidence = result.scores[0];

//       const items = await extractItems(text);
//       const quantity = extractQuantity(text);
//       const address = extractAddress(text);

//       const orderItems = items.map((item) => ({
//         productId: item.productId,
//         title: item.title,
//         price: item.price,
//         quantity,
//         total: item.price * quantity,
//       }));

//       const totalAmount = orderItems.reduce(
//         (sum, item) => sum + item.total,
//         0
//       );

//       const order = {
//         orderId: Date.now(),
//         intent,
//         confidence,
//         items: orderItems,
//         address,
//         routedTo: routeByMeaning(intent, items),
//         totalAmount,
//         status: intent === "place order" ? "CONFIRMED" : "PENDING",
//       };

//       io.emit("newOrder", {
//         sender,
//         order,
//         timestamp: new Date().toLocaleTimeString(),
//       });

//       // ======================
//       // CHECKOUT (FIXED ORDER DETAILS)
//       // ======================
//       let checkoutResponse = null;

//       if (intent === "place order" && orderItems.length > 0) {
//         try {
//           // 🔥 FINAL CLEAN ORDER DETAILS (YOUR FORMAT)
//           const orderDetails = {
//             customerName: sender,
//             email: `${sender}@gmail.com`,
//             address: address || "not provided",

//             items: orderItems.map((i) => ({
//               productId: i.productId,
//               title: i.title,
//               price: i.price,
//               quantity: i.quantity,
//             })),

//             totalAmount: Number(totalAmount),
//           };

//           console.log("📦 ORDER DETAILS:");
//           console.log(JSON.stringify(orderDetails, null, 2));

//           const response = await axios.post(
//             "https://ecommercestore-yxcj.onrender.com/api/orders/checkout",
//             orderDetails,
//             {
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               timeout: 30000,
//             }
//           );

//           checkoutResponse = response.data;

//           console.log("✅ Checkout Success");
//         } catch (err) {
//           console.log("❌ Checkout Error:");

//           if (err.response) {
//             console.log("STATUS:", err.response.status);

//             const data = err.response.data;

//             console.log("FULL ERROR:");
//             console.log(JSON.stringify(data, null, 2));

//             // 🔥 EXACT FIELD DEBUGGING
//             if (data?.missingFields) {
//               console.log("🚨 Missing Fields:", data.missingFields);
//             }

//             if (data?.errors) {
//               console.log("🚨 Validation Errors:");
//               Object.keys(data.errors).forEach((f) => {
//                 console.log(`- ${f}: ${data.errors[f].message}`);
//               });
//             }

//             if (data?.message) {
//               console.log("MESSAGE:", data.message);
//             }
//           } else {
//             console.log("NETWORK ERROR:", err.message);
//           }
//         }
//       }

//       // ======================
//       // RESPONSE TO USER
//       // ======================
//       const socketId = users[sender];

//       if (socketId) {
//         io.to(socketId).emit("receiveMessage", {
//           sender: "bliinkr",
//           receiver: sender,
//           text:
//             orderItems.length > 0
//               ? "✅ Order processed successfully"
//               : "❌ No matching products found",
//           timestamp: new Date().toLocaleTimeString(),
//           ai: true,
//           classification: {
//             intent,
//             confidence,
//             order,
//             checkout: checkoutResponse,
//           },
//         });
//       }
//     } catch (err) {
//       console.log("❌ AI ERROR:", err.message);
//     }
//   });

//   // ======================
//   // DISCONNECT
//   // ======================
//   socket.on("disconnect", () => {
//     for (const user in users) {
//       if (users[user] === socket.id) {
//         delete users[user];
//         io.emit("updateUsers", Object.keys(users));
//         break;
//       }
//     }
//   });
// });

// // ======================
// // HEALTH CHECK
// // ======================
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "🚀 AI Chat Server Running",
//   });
// });

// // ======================
// // START SERVER
// // ======================
// const PORT = process.env.PORT || 3001;

// server.listen(PORT, () => {
//   console.log(`🚀 Server Running On Port ${PORT}`);
// });




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

// ======================
// APP + SERVER
// ======================
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ======================
// DB
// ======================
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err.message));

// ======================
// GLOBAL STATE
// ======================
let users = {};
let classifier = null;
let cachedProducts = [];

// ======================
// LOAD AI MODEL
// ======================
async function loadModel() {
  classifier = await pipeline(
    "zero-shot-classification",
    "Xenova/distilbert-base-uncased-mnli"
  );
  console.log("🤖 AI Model Loaded");
}

// ======================
// LOAD PRODUCTS (SAFE)
// ======================
async function loadProducts() {
  try {
    console.log("📡 Fetching products...");
    const res = await axios.get("https://fakestoreapi.com/products", {
      timeout: 15000,
    });

    cachedProducts = res.data || [];

    console.log(`📦 ${cachedProducts.length} Products Loaded`);
  } catch (err) {
    console.log("❌ Product Load Error:", err.message);
    cachedProducts = []; // prevent crash
  }
}

// ======================
// LABELS
// ======================
const labels = [
  "place order",
  "cancel order",
  "track order",
  "complaint",
  "other",
];

// ======================
// PRODUCT EXTRACTION (FIXED)
// ======================
async function extractItems(text) {
  const lowerText = text.toLowerCase();

  const matched = cachedProducts.filter((p) => {
    const words = p.title.toLowerCase().split(" ");

    return words.some(
      (w) => w.length > 3 && lowerText.includes(w)
    );
  });

  console.log("🔎 Extracted Items:", matched.length);

  return matched.map((p) => ({
    productId: p.id,
    title: p.title,
    price: p.price,
    category: p.category,
  }));
}

// ======================
// QUANTITY
// ======================
function extractQuantity(text) {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0]) : 1;
}

// ======================
// ADDRESS
// ======================
function extractAddress(text) {
  const match = text.match(/to (.+)/i);
  return match ? match[1] : "not provided";
}

// ======================
// ROUTING LOGIC
// ======================
function routeByMeaning(intent, items) {
  if (intent === "place order") {
    if (items.some((i) => i.category?.includes("electronics"))) {
      return "ELECTRONICS_STORE";
    }
    return "GENERAL_STORE";
  }

  if (intent === "cancel order") return "ORDER_CANCEL_SERVICE";
  if (intent === "track order") return "ORDER_TRACKING_SERVICE";

  return "MANUAL_SUPPORT";
}

// ======================
// SOCKET CONNECTION
// ======================
io.on("connection", (socket) => {
  console.log("⚡ Client Connected");

  // REGISTER USER
  socket.on("registerUser", (username) => {
    username = username.trim().toLowerCase();
    users[username] = socket.id;

    io.emit("updateUsers", Object.keys(users));
  });

  // SEND MESSAGE
  socket.on("sendMessage", async ({ sender, receiver, text }) => {
    try {
      sender = sender.trim().toLowerCase();
      receiver = receiver.trim().toLowerCase();

      const message = {
        sender,
        receiver,
        text,
        timestamp: new Date().toLocaleTimeString(),
      };

      // ======================
      // NORMAL CHAT
      // ======================
      if (receiver !== "bliinkr") {
        const socketId = users[receiver];

        if (socketId) {
          io.to(socketId).emit("receiveMessage", message);
        }
        return;
      }

      // ======================
      // AI CLASSIFICATION
      // ======================
      const result = await classifier(text, labels);
      const intent = result.labels[0];
      const confidence = result.scores[0];

      const items = await extractItems(text);
      const quantity = extractQuantity(text);
      const address = extractAddress(text);

      const orderItems = items.map((item) => ({
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity,
        total: item.price * quantity,
      }));

      const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.total,
        0
      );

      const order = {
        orderId: Date.now(),
        intent,
        confidence,
        items: orderItems,
        address,
        routedTo: routeByMeaning(intent, items),
        totalAmount,
        status: intent === "place order" ? "CONFIRMED" : "PENDING",
      };

      io.emit("newOrder", {
        sender,
        order,
        timestamp: new Date().toLocaleTimeString(),
      });

      // ======================
      // CHECKOUT
      // ======================
      let checkoutResponse = null;

      if (intent === "place order" && orderItems.length > 0) {
        try {
          const orderDetails = {
            customerName: sender,
            email: `${sender}@gmail.com`,
            address: address || "not provided",
            items: orderItems.map((i) => ({
              productId: i.productId,
              title: i.title,
              price: i.price,
              quantity: i.quantity,
            })),
            totalAmount: Number(totalAmount),
          };

          console.log("📦 ORDER DETAILS:");
          console.log(JSON.stringify(orderDetails, null, 2));

          const response = await axios.post(
            "https://ecommercestore-yxcj.onrender.com/api/orders/checkout",
            orderDetails,
            {
              headers: { "Content-Type": "application/json" },
              timeout: 30000,
            }
          );

          checkoutResponse = response.data;

          console.log("✅ Checkout Success");
        } catch (err) {
          console.log("❌ Checkout Error:", err.message);
        }
      }

      // ======================
      // RESPONSE
      // ======================
      const socketId = users[sender];

      if (socketId) {
        io.to(socketId).emit("receiveMessage", {
          sender: "bliinkr",
          receiver: sender,
          text:
            orderItems.length > 0
              ? "✅ Order processed successfully"
              : "❌ No matching products found",
          timestamp: new Date().toLocaleTimeString(),
          ai: true,
          classification: {
            intent,
            confidence,
            order,
            checkout: checkoutResponse,
          },
        });
      }
    } catch (err) {
      console.log("❌ AI ERROR:", err.message);
    }
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    for (const user in users) {
      if (users[user] === socket.id) {
        delete users[user];
        io.emit("updateUsers", Object.keys(users));
        break;
      }
    }
  });
});

// ======================
// HEALTH CHECK
// ======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 AI Chat Server Running",
  });
});

// ======================
// START SERVER (SAFE BOOTSTRAP)
// ======================
async function startServer() {
  try {
    await loadModel();
    await loadProducts();

    console.log("🚀 AI + Products Ready");

    const PORT = process.env.PORT || 3001;
    server.listen(PORT, () => {
      console.log(`🚀 Server Running On Port ${PORT}`);
    });
  } catch (err) {
    console.log("❌ Server Startup Error:", err.message);
  }
}

startServer();