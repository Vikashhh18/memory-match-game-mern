const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const path = require("path")

// Import routes
const authRoutes = require("./routes/auth")
const gameRoutes = require("./routes/games")
const leaderboardRoutes = require("./routes/leaderboard")
const userRoutes = require("./routes/users")

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/games", gameRoutes)
app.use("/api/leaderboard", leaderboardRoutes)
app.use("/api/users", userRoutes)

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Memory Match Game API is running" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Server error",
    error: process.env.NODE_ENV === "production" ? {} : err,
  })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
