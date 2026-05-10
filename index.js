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
// // GLOBAL STATE
// // ======================
// let users = {};
// let classifier = null;
// let cachedProducts = [];

// // ======================
// // LOAD AI MODEL
// // ======================
// async function loadModel() {
//   classifier = await pipeline(
//     "zero-shot-classification",
//     "Xenova/distilbert-base-uncased-mnli"
//   );
//   console.log("🤖 AI Model Loaded");
// }

// // ======================
// // LOAD PRODUCTS (SAFE)
// // ======================
// async function loadProducts() {
//   try {
//     console.log("📡 Fetching products...");
//     const res = await axios.get("https://fakestoreapi.com/products", {
//       timeout: 15000,
//     });

//     cachedProducts = res.data || [];

//     console.log(`📦 ${cachedProducts.length} Products Loaded`);
//   } catch (err) {
//     console.log("❌ Product Load Error:", err.message);
//     cachedProducts = []; // prevent crash
//   }
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
// // PRODUCT EXTRACTION (FIXED)
// // ======================
// async function extractItems(text) {
//   const lowerText = text.toLowerCase();

//   const matched = cachedProducts.filter((p) => {
//     const words = p.title.toLowerCase().split(" ");

//     return words.some(
//       (w) => w.length > 3 && lowerText.includes(w)
//     );
//   });

//   console.log("🔎 Extracted Items:", matched.length);

//   return matched.map((p) => ({
//     productId: p.id,
//     title: p.title,
//     price: p.price,
//     category: p.category,
//   }));
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
//   return match ? match[1] : "not provided";
// }

// // ======================
// // ROUTING LOGIC
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
// // SOCKET CONNECTION
// // ======================
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
//       // AI CLASSIFICATION
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
//       // CHECKOUT
//       // ======================
//       let checkoutResponse = null;

//       if (intent === "place order" && orderItems.length > 0) {
//         try {
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
//               headers: { "Content-Type": "application/json" },
//               timeout: 30000,
//             }
//           );

//           checkoutResponse = response.data;

//           console.log("✅ Checkout Success");
//         } catch (err) {
//           console.log("❌ Checkout Error:", err.message);
//         }
//       }

//       // ======================
//       // RESPONSE
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

//   // DISCONNECT
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
// // START SERVER (SAFE BOOTSTRAP)
// // ======================
// async function startServer() {
//   try {
//     await loadModel();
//     await loadProducts();

//     console.log("🚀 AI + Products Ready");

//     const PORT = process.env.PORT || 3001;
//     server.listen(PORT, () => {
//       console.log(`🚀 Server Running On Port ${PORT}`);
//     });
//   } catch (err) {
//     console.log("❌ Server Startup Error:", err.message);
//   }
// }

// startServer();



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
// // GLOBAL STATE
// // ======================
// let users = {};
// let classifier = null;
// let cachedProducts = [];

// // ======================
// // LOAD AI MODEL
// // ======================
// async function loadModel() {
//   classifier = await pipeline(
//     "zero-shot-classification",
//     "Xenova/distilbert-base-uncased-mnli"
//   );
//   console.log("🤖 AI Model Loaded");
// }

// // ======================
// // HARD-CODED PRODUCTS
// // ======================
// function loadProducts() {
//   console.log("📦 Loading hardcoded products...");

//   cachedProducts = [{"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png","rating":{"rate":3.9,"count":120}},{"id":2,"title":"Mens Casual Premium Slim Fit T-Shirts ","price":22.3,"description":"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.","category":"men's clothing","image":"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png","rating":{"rate":4.1,"count":259}},{"id":3,"title":"Mens Cotton Jacket","price":55.99,"description":"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.","category":"men's clothing","image":"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png","rating":{"rate":4.7,"count":500}},{"id":4,"title":"Mens Casual Slim Fit","price":15.99,"description":"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.","category":"men's clothing","image":"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png","rating":{"rate":2.1,"count":430}},{"id":5,"title":"John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet","price":695,"description":"From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.","category":"jewelery","image":"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png","rating":{"rate":4.6,"count":400}},{"id":6,"title":"Solid Gold Petite Micropave ","price":168,"description":"Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.","category":"jewelery","image":"https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png","rating":{"rate":3.9,"count":70}},{"id":7,"title":"White Gold Plated Princess","price":9.99,"description":"Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...","category":"jewelery","image":"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png","rating":{"rate":3,"count":400}},{"id":8,"title":"Pierced Owl Rose Gold Plated Stainless Steel Double","price":10.99,"description":"Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel","category":"jewelery","image":"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png","rating":{"rate":1.9,"count":100}},{"id":9,"title":"WD 2TB Elements Portable External Hard Drive - USB 3.0 ","price":64,"description":"USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system","category":"electronics","image":"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png","rating":{"rate":3.3,"count":203}},{"id":10,"title":"SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s","price":109,"description":"Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)","category":"electronics","image":"https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png","rating":{"rate":2.9,"count":470}},{"id":11,"title":"Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5","price":109,"description":"3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.","category":"electronics","image":"https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png","rating":{"rate":4.8,"count":319}},{"id":12,"title":"WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive","price":114,"description":"Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty","category":"electronics","image":"https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png","rating":{"rate":4.8,"count":400}},{"id":13,"title":"Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin","price":599,"description":"21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz","category":"electronics","image":"https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png","rating":{"rate":2.9,"count":250}},{"id":14,"title":"Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ","price":999.99,"description":"49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag","category":"electronics","image":"https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png","rating":{"rate":2.2,"count":140}},{"id":15,"title":"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats","price":56.99,"description":"Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates","category":"women's clothing","image":"https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png","rating":{"rate":2.6,"count":235}},{"id":16,"title":"Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket","price":29.95,"description":"100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON","category":"women's clothing","image":"https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png","rating":{"rate":2.9,"count":340}},{"id":17,"title":"Rain Jacket Women Windbreaker Striped Climbing Raincoats","price":39.99,"description":"Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.","category":"women's clothing","image":"https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png","rating":{"rate":3.8,"count":679}},{"id":18,"title":"MBJ Women's Solid Short Sleeve Boat Neck V ","price":9.85,"description":"95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem","category":"women's clothing","image":"https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png","rating":{"rate":4.7,"count":130}},{"id":19,"title":"Opna Women's Short Sleeve Moisture","price":7.95,"description":"100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort","category":"women's clothing","image":"https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png","rating":{"rate":4.5,"count":146}},{"id":20,"title":"DANVOUY Womens T Shirt Casual Cotton Short","price":12.99,"description":"95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.","category":"women's clothing","image":"https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png","rating":{"rate":3.6,"count":145}}]
//   console.log(`📦 ${cachedProducts.length} Products Loaded`);
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
// // PRODUCT EXTRACTION
// // ======================
// async function extractItems(text) {
//   const lowerText = text.toLowerCase();

//   const matched = cachedProducts.filter((p) => {
//     const words = p.title.toLowerCase().split(" ");
//     return words.some((w) => w.length > 3 && lowerText.includes(w));
//   });

//   console.log("🔎 Extracted Items:", matched.length);

//   return matched.map((p) => ({
//     productId: p.id,
//     title: p.title,
//     price: p.price,
//     category: p.category,
//   }));
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
//   return match ? match[1] : "not provided";
// }

// // ======================
// // ROUTING LOGIC
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
// // SOCKET CONNECTION
// // ======================
// io.on("connection", (socket) => {
//   console.log("⚡ Client Connected");

//   socket.on("registerUser", (username) => {
//     username = username.trim().toLowerCase();
//     users[username] = socket.id;

//     io.emit("updateUsers", Object.keys(users));
//   });

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
//       // AI CLASSIFICATION
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
//       // CHECKOUT
//       // ======================
//       let checkoutResponse = null;

//       if (intent === "place order" && orderItems.length > 0) {
//         try {
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
//               headers: { "Content-Type": "application/json" }
              
//             }
//           );

//           checkoutResponse = response.data;
//           console.log("✅ Checkout Success");
//         } catch (err) {
//           console.log("❌ Checkout Error:", err.message);
//         }
//       }

//       // ======================
//       // RESPONSE
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
// async function startServer() {
//   try {
//     await loadModel();
//     loadProducts(); // 🔥 FIXED (no await)

//     console.log("🚀 AI + Products Ready");

//     const PORT = process.env.PORT || 3001;
//     server.listen(PORT, () => {
//       console.log(`🚀 Server Running On Port ${PORT}`);
//     });
//   } catch (err) {
//     console.log("❌ Server Startup Error:", err.message);
//   }
// }

// startServer();











// // ======================
// // server.js
// // ======================

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
// // DATABASE
// // ======================
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ Mongo Error:", err.message));

// // ======================
// // GLOBAL STATE
// // ======================
// let users = {};
// let classifier = null;
// let cachedProducts = [];

// // ======================
// // LOAD AI MODEL
// // ======================
// async function loadModel() {
//   classifier = await pipeline(
//     "zero-shot-classification",
//     "Xenova/distilbert-base-uncased-mnli"
//   );

//   console.log("🤖 AI Model Loaded");
// }

// // ======================
// // PRODUCTS
// // ======================
// function loadProducts() {
//  cachedProducts = [{"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png","rating":{"rate":3.9,"count":120}},{"id":2,"title":"Mens Casual Premium Slim Fit T-Shirts ","price":22.3,"description":"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.","category":"men's clothing","image":"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png","rating":{"rate":4.1,"count":259}},{"id":3,"title":"Mens Cotton Jacket","price":55.99,"description":"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.","category":"men's clothing","image":"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png","rating":{"rate":4.7,"count":500}},{"id":4,"title":"Mens Casual Slim Fit","price":15.99,"description":"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.","category":"men's clothing","image":"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png","rating":{"rate":2.1,"count":430}},{"id":5,"title":"John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet","price":695,"description":"From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.","category":"jewelery","image":"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png","rating":{"rate":4.6,"count":400}},{"id":6,"title":"Solid Gold Petite Micropave ","price":168,"description":"Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.","category":"jewelery","image":"https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png","rating":{"rate":3.9,"count":70}},{"id":7,"title":"White Gold Plated Princess","price":9.99,"description":"Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...","category":"jewelery","image":"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png","rating":{"rate":3,"count":400}},{"id":8,"title":"Pierced Owl Rose Gold Plated Stainless Steel Double","price":10.99,"description":"Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel","category":"jewelery","image":"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png","rating":{"rate":1.9,"count":100}},{"id":9,"title":"WD 2TB Elements Portable External Hard Drive - USB 3.0 ","price":64,"description":"USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system","category":"electronics","image":"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png","rating":{"rate":3.3,"count":203}},{"id":10,"title":"SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s","price":109,"description":"Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)","category":"electronics","image":"https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png","rating":{"rate":2.9,"count":470}},{"id":11,"title":"Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5","price":109,"description":"3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.","category":"electronics","image":"https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png","rating":{"rate":4.8,"count":319}},{"id":12,"title":"WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive","price":114,"description":"Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty","category":"electronics","image":"https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png","rating":{"rate":4.8,"count":400}},{"id":13,"title":"Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin","price":599,"description":"21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz","category":"electronics","image":"https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png","rating":{"rate":2.9,"count":250}},{"id":14,"title":"Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ","price":999.99,"description":"49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag","category":"electronics","image":"https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png","rating":{"rate":2.2,"count":140}},{"id":15,"title":"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats","price":56.99,"description":"Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates","category":"women's clothing","image":"https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png","rating":{"rate":2.6,"count":235}},{"id":16,"title":"Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket","price":29.95,"description":"100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON","category":"women's clothing","image":"https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png","rating":{"rate":2.9,"count":340}},{"id":17,"title":"Rain Jacket Women Windbreaker Striped Climbing Raincoats","price":39.99,"description":"Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.","category":"women's clothing","image":"https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png","rating":{"rate":3.8,"count":679}},{"id":18,"title":"MBJ Women's Solid Short Sleeve Boat Neck V ","price":9.85,"description":"95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem","category":"women's clothing","image":"https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png","rating":{"rate":4.7,"count":130}},{"id":19,"title":"Opna Women's Short Sleeve Moisture","price":7.95,"description":"100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort","category":"women's clothing","image":"https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png","rating":{"rate":4.5,"count":146}},{"id":20,"title":"DANVOUY Womens T Shirt Casual Cotton Short","price":12.99,"description":"95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.","category":"women's clothing","image":"https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png","rating":{"rate":3.6,"count":145}}]
// //   console.log(`📦 ${cachedProducts.length} Products Loaded`);

//   console.log(`📦 ${cachedProducts.length} Products Loaded`);
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
// // PRODUCT EXTRACTION
// // ======================
// async function extractItems(text) {
//   const lowerText = text.toLowerCase();

//   const matched = cachedProducts.filter((p) => {
//     const words = p.title.toLowerCase().split(" ");

//     return words.some(
//       (w) => w.length > 3 && lowerText.includes(w)
//     );
//   });

//   return matched.map((p) => ({
//     productId: p.id,
//     title: p.title,
//     price: p.price,
//     category: p.category,
//   }));
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

//   return match ? match[1] : "not provided";
// }

// // ======================
// // ROUTING LOGIC
// // ======================
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

//   if (intent === "cancel order")
//     return "ORDER_CANCEL_SERVICE";

//   if (intent === "track order")
//     return "ORDER_TRACKING_SERVICE";

//   return "MANUAL_SUPPORT";
// }

// // ======================
// // SOCKET CONNECTION
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
//   socket.on(
//     "sendMessage",
//     async ({ sender, receiver, text }) => {
//       try {
//         sender = sender.trim().toLowerCase();
//         receiver = receiver.trim().toLowerCase();

//         const message = {
//           sender,
//           receiver,
//           text,
//           timestamp: new Date().toLocaleTimeString(),
//         };

//         // ======================
//         // NORMAL CHAT
//         // ======================
//         if (receiver !== "bliinkr") {
//           const socketId = users[receiver];

//           if (socketId) {
//             io.to(socketId).emit(
//               "receiveMessage",
//               message
//             );
//           }

//           return;
//         }

//         // ======================
//         // AI CLASSIFICATION
//         // ======================
//         const result = await classifier(
//           text,
//           labels
//         );

//         const intent = result.labels[0];
//         const confidence = result.scores[0];

//         // ======================
//         // EXTRACT ITEMS
//         // ======================
//         const items = await extractItems(text);

//         const quantity = extractQuantity(text);

//         const address = extractAddress(text);

//         // ======================
//         // BUILD ORDER ITEMS
//         // ======================
//         const orderItems = items.map((item) => ({
//           productId: item.productId,
//           title: item.title,
//           price: item.price,
//           quantity,
//           total: item.price * quantity,
//         }));

//         // ======================
//         // TOTAL
//         // ======================
//         const totalAmount = orderItems.reduce(
//           (sum, item) => sum + item.total,
//           0
//         );

//         // ======================
//         // ORDER OBJECT
//         // ======================
//         const order = {
//           orderId: Date.now(),
//           intent,
//           confidence,
//           items: orderItems,
//           address,
//           routedTo: routeByMeaning(
//             intent,
//             items
//           ),
//           totalAmount,
//           status: "PENDING_CONFIRMATION",
//         };

//         // ======================
//         // SEND ORDER PREVIEW
//         // ======================
//         const socketId = users[sender];

//         if (
//           intent === "place order" &&
//           orderItems.length > 0
//         ) {
//           io.to(socketId).emit(
//             "orderPreview",
//             {
//               sender: "bliinkr",
//               receiver: sender,
//               text: "Please confirm your order",
//               order,
//               timestamp:
//                 new Date().toLocaleTimeString(),
//             }
//           );

//           return;
//         }

//         // ======================
//         // NO PRODUCT FOUND
//         // ======================
//         io.to(socketId).emit("receiveMessage", {
//           sender: "bliinkr",
//           receiver: sender,
//           text: "❌ No matching products found",
//           ai: true,
//           timestamp: new Date().toLocaleTimeString(),
//         });
//       } catch (err) {
//         console.log("❌ AI ERROR:", err.message);
//       }
//     }
//   );

//   // ======================
//   // CONFIRM ORDER
//   // ======================
//   socket.on(
//     "confirmOrder",
//     async ({ sender, order }) => {
//       try {
//         const orderDetails = {
//           customerName: sender,
//           email: `${sender}@gmail.com`,
//           address: order.address,

//           items: order.items.map((i) => ({
//             productId: i.productId,
//             title: i.title,
//             price: i.price,
//             quantity: i.quantity,
//           })),

//           totalAmount: Number(
//             order.totalAmount
//           ),
//         };

//         console.log(
//           "📦 FINAL ORDER:",
//           JSON.stringify(orderDetails, null, 2)
//         );

//         // ======================
//         // CALL CHECKOUT API
//         // ======================
//         const response = await axios.post(
//           "https://ecommercestore-yxcj.onrender.com/api/orders/checkout",
//           orderDetails,
//           {
//             headers: {
//               "Content-Type":
//                 "application/json",
//             },
//           }
//         );

//         // ======================
//         // SUCCESS RESPONSE
//         // ======================
//         io.to(users[sender]).emit(
//           "receiveMessage",
//           {
//             sender: "bliinkr",
//             receiver: sender,
//             text:
//               "✅ Order placed successfully",
//             ai: true,
//             checkout: response.data,
//             timestamp:
//               new Date().toLocaleTimeString(),
//           }
//         );

//         // ======================
//         // DASHBOARD UPDATE
//         // ======================
//         io.emit("newOrder", {
//           sender,
//           order: {
//             ...order,
//             status: "CONFIRMED",
//           },
//           timestamp:
//             new Date().toLocaleTimeString(),
//         });
//       } catch (err) {
//         console.log(
//           "❌ CHECKOUT ERROR:",
//           err.message
//         );

//         io.to(users[sender]).emit(
//           "receiveMessage",
//           {
//             sender: "bliinkr",
//             receiver: sender,
//             text:
//               "❌ Failed to place order",
//             ai: true,
//             timestamp:
//               new Date().toLocaleTimeString(),
//           }
//         );
//       }
//     }
//   );

//   // ======================
//   // CANCEL ORDER
//   // ======================
//   socket.on("cancelOrder", ({ sender }) => {
//     io.to(users[sender]).emit("receiveMessage", {
//       sender: "bliinkr",
//       receiver: sender,
//       text: "❌ Order cancelled",
//       ai: true,
//       timestamp: new Date().toLocaleTimeString(),
//     });
//   });

//   // ======================
//   // DISCONNECT
//   // ======================
//   socket.on("disconnect", () => {
//     for (const user in users) {
//       if (users[user] === socket.id) {
//         delete users[user];

//         io.emit(
//           "updateUsers",
//           Object.keys(users)
//         );

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
// async function startServer() {
//   try {
//     await loadModel();

//     loadProducts();

//     console.log("🚀 AI + Products Ready");

//     const PORT = process.env.PORT || 3001;

//     server.listen(PORT, () => {
//       console.log(
//         `🚀 Server Running On Port ${PORT}`
//       );
//     });
//   } catch (err) {
//     console.log(
//       "❌ Server Startup Error:",
//       err.message
//     );
//   }
// }

// startServer();


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
// DATABASE
// ======================

mongoose
  .connect(mongoURI)
  .then(() =>
    console.log("✅ MongoDB Connected")
  )
  .catch((err) =>
    console.log(
      "❌ Mongo Error:",
      err.message
    )
  );

// ======================
// GLOBAL STATE
// ======================

let users = {};

let classifier = null;

let cachedProducts = [];

let pendingCancellations = {};

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
// PRODUCTS
// ======================

function loadProducts() {
  cachedProducts = [{"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png","rating":{"rate":3.9,"count":120}},{"id":2,"title":"Mens Casual Premium Slim Fit T-Shirts ","price":22.3,"description":"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.","category":"men's clothing","image":"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png","rating":{"rate":4.1,"count":259}},{"id":3,"title":"Mens Cotton Jacket","price":55.99,"description":"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.","category":"men's clothing","image":"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png","rating":{"rate":4.7,"count":500}},{"id":4,"title":"Mens Casual Slim Fit","price":15.99,"description":"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.","category":"men's clothing","image":"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png","rating":{"rate":2.1,"count":430}},{"id":5,"title":"John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet","price":695,"description":"From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.","category":"jewelery","image":"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png","rating":{"rate":4.6,"count":400}},{"id":6,"title":"Solid Gold Petite Micropave ","price":168,"description":"Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.","category":"jewelery","image":"https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png","rating":{"rate":3.9,"count":70}},{"id":7,"title":"White Gold Plated Princess","price":9.99,"description":"Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...","category":"jewelery","image":"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png","rating":{"rate":3,"count":400}},{"id":8,"title":"Pierced Owl Rose Gold Plated Stainless Steel Double","price":10.99,"description":"Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel","category":"jewelery","image":"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png","rating":{"rate":1.9,"count":100}},{"id":9,"title":"WD 2TB Elements Portable External Hard Drive - USB 3.0 ","price":64,"description":"USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system","category":"electronics","image":"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png","rating":{"rate":3.3,"count":203}},{"id":10,"title":"SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s","price":109,"description":"Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)","category":"electronics","image":"https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png","rating":{"rate":2.9,"count":470}},{"id":11,"title":"Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5","price":109,"description":"3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.","category":"electronics","image":"https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png","rating":{"rate":4.8,"count":319}},{"id":12,"title":"WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive","price":114,"description":"Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty","category":"electronics","image":"https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png","rating":{"rate":4.8,"count":400}},{"id":13,"title":"Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin","price":599,"description":"21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz","category":"electronics","image":"https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png","rating":{"rate":2.9,"count":250}},{"id":14,"title":"Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ","price":999.99,"description":"49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag","category":"electronics","image":"https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png","rating":{"rate":2.2,"count":140}},{"id":15,"title":"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats","price":56.99,"description":"Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates","category":"women's clothing","image":"https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png","rating":{"rate":2.6,"count":235}},{"id":16,"title":"Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket","price":29.95,"description":"100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON","category":"women's clothing","image":"https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png","rating":{"rate":2.9,"count":340}},{"id":17,"title":"Rain Jacket Women Windbreaker Striped Climbing Raincoats","price":39.99,"description":"Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.","category":"women's clothing","image":"https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png","rating":{"rate":3.8,"count":679}},{"id":18,"title":"MBJ Women's Solid Short Sleeve Boat Neck V ","price":9.85,"description":"95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem","category":"women's clothing","image":"https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png","rating":{"rate":4.7,"count":130}},{"id":19,"title":"Opna Women's Short Sleeve Moisture","price":7.95,"description":"100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort","category":"women's clothing","image":"https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png","rating":{"rate":4.5,"count":146}},{"id":20,"title":"DANVOUY Womens T Shirt Casual Cotton Short","price":12.99,"description":"95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.","category":"women's clothing","image":"https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png","rating":{"rate":3.6,"count":145}}]
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
// PRODUCT EXTRACTION
// ======================

async function extractItems(text) {
  const lowerText =
    text.toLowerCase();

  const matched =
    cachedProducts.filter(
      (p) => {
        const words = p.title
          .toLowerCase()
          .split(" ");

        return words.some(
          (w) =>
            w.length > 3 &&
            lowerText.includes(w)
        );
      }
    );

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
  const match =
    text.match(/\d+/);

  return match
    ? parseInt(match[0])
    : 1;
}

// ======================
// ADDRESS
// ======================

function extractAddress(text) {
  const match = text.match(
    /to (.+)/i
  );

  return match
    ? match[1]
    : "not provided";
}

// ======================
// ORDER ID
// ======================

function extractOrderId(text) {
  const match =
    text.match(/\d+/);

  return match
    ? match[0]
    : null;
}

// ======================
// ROUTING
// ======================

function routeByMeaning(
  intent,
  items
) {
  if (
    intent === "place order"
  ) {
    if (
      items.some((i) =>
        i.category?.includes(
          "electronics"
        )
      )
    ) {
      return "ELECTRONICS_STORE";
    }

    return "GENERAL_STORE";
  }

  if (
    intent === "cancel order"
  ) {
    return "ORDER_CANCEL_SERVICE";
  }

  if (
    intent === "track order"
  ) {
    return "ORDER_TRACKING_SERVICE";
  }

  return "MANUAL_SUPPORT";
}

// ======================
// SOCKET CONNECTION
// ======================

io.on(
  "connection",
  (socket) => {
    console.log(
      "⚡ Client Connected"
    );

    // ======================
    // REGISTER USER
    // ======================

    socket.on(
      "registerUser",
      (username) => {
        username = username
          .trim()
          .toLowerCase();

        users[username] =
          socket.id;

        io.emit(
          "updateUsers",
          Object.keys(users)
        );
      }
    );

    // ======================
    // SEND MESSAGE
    // ======================

    socket.on(
      "sendMessage",
      async ({
        sender,
        receiver,
        text,
      }) => {
        try {
          sender = sender
            .trim()
            .toLowerCase();

          receiver = receiver
            .trim()
            .toLowerCase();

          const message = {
            sender,
            receiver,
            text,
            timestamp:
              new Date().toLocaleTimeString(),
          };

          // ======================
          // NORMAL CHAT
          // ======================

          if (
            receiver !==
            "bliinkr"
          ) {
            const socketId =
              users[receiver];

            if (socketId) {
              io.to(
                socketId
              ).emit(
                "receiveMessage",
                message
              );
            }

            return;
          }

          // ======================
          // AI CLASSIFICATION
          // ======================

          const result =
            await classifier(
              text,
              labels
            );

          let intent =
            result.labels[0];

          const confidence =
            result.scores[0];

          // ======================
          // KEYWORD OVERRIDE
          // ======================

          const lowerText =
            text.toLowerCase();

          if (
            lowerText.includes(
              "cancel"
            )
          ) {
            intent =
              "cancel order";
          }

          if (
            lowerText.includes(
              "track"
            )
          ) {
            intent =
              "track order";
          }

          if (
            lowerText.includes(
              "buy"
            ) ||
            lowerText.includes(
              "place order"
            )
          ) {
            intent =
              "place order";
          }

          // ======================
          // EXTRACT DATA
          // ======================

          const items =
            await extractItems(
              text
            );

          const quantity =
            extractQuantity(
              text
            );

          const address =
            extractAddress(
              text
            );

          const orderId =
            extractOrderId(
              text
            );

          // ======================
          // BUILD ORDER ITEMS
          // ======================

          const orderItems =
            items.map(
              (item) => ({
                productId:
                  item.productId,

                title:
                  item.title,

                price:
                  item.price,

                quantity,

                total:
                  item.price *
                  quantity,
              })
            );

          // ======================
          // TOTAL
          // ======================

          const totalAmount =
            orderItems.reduce(
              (
                sum,
                item
              ) =>
                sum +
                item.total,
              0
            );

          // ======================
          // ORDER OBJECT
          // ======================

          const order = {
            orderId:
              Date.now(),

            intent,

            confidence,

            items:
              orderItems,

            address,

            routedTo:
              routeByMeaning(
                intent,
                items
              ),

            totalAmount,

            status:
              "PENDING_CONFIRMATION",
          };

          // ======================
          // CANCEL ORDER
          // ======================

          if (
            intent ===
            "cancel order"
          ) {
            // NO ORDER ID

            if (!orderId) {
              io.to(
                users[sender]
              ).emit(
                "receiveMessage",
                {
                  sender:
                    "bliinkr",

                  receiver:
                    sender,

                  text:
                    "❌ Please provide your Order ID to cancel.",

                  ai: true,

                  timestamp:
                    new Date().toLocaleTimeString(),
                }
              );

              return;
            }

            // SAVE TEMP CANCELLATION

            pendingCancellations[
              sender
            ] = {
              orderId,
            };

            // SHOW CONFIRMATION

            io.to(
              users[sender]
            ).emit(
              "cancelPreview",
              {
                sender:
                  "bliinkr",

                receiver:
                  sender,

                text: `Are you sure you want to cancel Order #${orderId}?`,

                orderId,

                timestamp:
                  new Date().toLocaleTimeString(),
              }
            );

            return;
          }

          // ======================
          // PLACE ORDER
          // ======================

          if (
            intent ===
              "place order" &&
            orderItems.length >
              0
          ) {
            io.to(
              users[sender]
            ).emit(
              "orderPreview",
              {
                sender:
                  "bliinkr",

                receiver:
                  sender,

                text:
                  "🛒 Please confirm your order",

                order,

                timestamp:
                  new Date().toLocaleTimeString(),
              }
            );

            return;
          }

          // ======================
          // TRACK ORDER
          // ======================

          if (
            intent ===
            "track order"
          ) {
            io.to(
              users[sender]
            ).emit(
              "receiveMessage",
              {
                sender:
                  "bliinkr",

                receiver:
                  sender,

                text:
                  "📦 Your order is currently being processed.",

                ai: true,

                timestamp:
                  new Date().toLocaleTimeString(),
              }
            );

            return;
          }

          // ======================
          // NO PRODUCT FOUND
          // ======================

          io.to(
            users[sender]
          ).emit(
            "receiveMessage",
            {
              sender:
                "bliinkr",

              receiver:
                sender,

              text:
                "❌ No matching products found",

              ai: true,

              timestamp:
                new Date().toLocaleTimeString(),
            }
          );
        } catch (err) {
          console.log(
            "❌ AI ERROR:",
            err.message
          );
        }
      }
    );

    // ======================
    // CONFIRM ORDER
    // ======================

    socket.on(
      "confirmOrder",
      async ({
        sender,
        order,
      }) => {
        try {
          const orderDetails =
            {
              customerName:
                sender,

              email: `${sender}@gmail.com`,

              address:
                order.address,

              items:
                order.items.map(
                  (i) => ({
                    productId:
                      i.productId,

                    title:
                      i.title,

                    price:
                      i.price,

                    quantity:
                      i.quantity,
                  })
                ),

              totalAmount:
                Number(
                  order.totalAmount
                ),
            };

          console.log(
            "📦 FINAL ORDER:",
            JSON.stringify(
              orderDetails,
              null,
              2
            )
          );

          // ======================
          // CHECKOUT API
          // ======================

          const response =
            await axios.post(
              "https://ecommercestore-yxcj.onrender.com/api/orders/checkout",
              orderDetails,
              {
                timeout: 20000,
                headers: {
                  "Content-Type":
                    "application/json",
                },
              }
            );

          // ======================
          // SUCCESS
          // ======================

          io.to(
            users[sender]
          ).emit(
            "receiveMessage",
            {
              sender:
                "bliinkr",

              receiver:
                sender,

              text:
                "✅ Order placed successfully",

              ai: true,

              checkout:
                response.data,

              timestamp:
                new Date().toLocaleTimeString(),
            }
          );

          io.emit(
            "newOrder",
            {
              sender,

              order: {
                ...order,

                status:
                  "CONFIRMED",
              },

              timestamp:
                new Date().toLocaleTimeString(),
            }
          );
        } catch (err) {
          console.log(
            "❌ CHECKOUT ERROR:",
            err.message
          );

          io.to(
            users[sender]
          ).emit(
            "receiveMessage",
            {
              sender:
                "bliinkr",

              receiver:
                sender,

              text:
                "❌ Failed to place order",

              ai: true,

              timestamp:
                new Date().toLocaleTimeString(),
            }
          );
        }
      }
    );

    // ======================
    // CONFIRM CANCEL ORDER
    // ======================

    socket.on(
      "confirmCancelOrder",
      async ({
        sender,
      }) => {
        try {
          const pending =
            pendingCancellations[
              sender
            ];

          if (!pending) {
            io.to(
              users[sender]
            ).emit(
              "receiveMessage",
              {
                sender:
                  "bliinkr",

                receiver:
                  sender,

                text:
                  "❌ No cancellation request found",

                ai: true,

                timestamp:
                  new Date().toLocaleTimeString(),
              }
            );

            return;
          }

          // ======================
          // SUCCESS
          // ======================

          io.to(
            users[sender]
          ).emit(
            "receiveMessage",
            {
              sender:
                "bliinkr",

              receiver:
                sender,

              text: `✅ Order #${pending.orderId} cancelled successfully`,

              ai: true,

              timestamp:
                new Date().toLocaleTimeString(),
            }
          );

          delete pendingCancellations[
            sender
          ];
        } catch (err) {
          console.log(
            "❌ CANCEL ERROR:",
            err.message
          );
        }
      }
    );

    // ======================
    // DISCONNECT
    // ======================

    socket.on(
      "disconnect",
      () => {
        for (const user in users) {
          if (
            users[user] ===
            socket.id
          ) {
            delete users[user];

            io.emit(
              "updateUsers",
              Object.keys(
                users
              )
            );

            break;
          }
        }
      }
    );
  }
);

// ======================
// HEALTH CHECK
// ======================

app.get("/", (req, res) => {
  res.json({
    success: true,

    message:
      "🚀 AI Chat Server Running",
  });
});

// ======================
// START SERVER
// ======================

async function startServer() {
  try {
    await loadModel();

    loadProducts();

    console.log(
      "🚀 AI + Products Ready"
    );

    const PORT =
      process.env.PORT ||
      3001;

    server.listen(
      PORT,
      () => {
        console.log(
          `🚀 Server Running On Port ${PORT}`
        );
      }
    );
  } catch (err) {
    console.log(
      "❌ Server Startup Error:",
      err.message
    );
  }
}

startServer();





