const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS CONFIG (THIS FIXES YOUR ERROR)
app.use(
  cors({
    origin: "*", // allow all origins (use specific domain in production)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ---------------------- ROUTES ----------------------

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Login route
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  // Dummy auth (replace with DB later)
  if (username === "test" && password === "1234") {
    return res.json({
      token: "fake-jwt-token",
      username,
    });
  }

  return res.status(401).json({
    message: "Invalid username or password",
  });
});

// ---------------------- START SERVER ----------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});