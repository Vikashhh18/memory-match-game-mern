const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { protect } = require("../middleware/auth")

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] })
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      })
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
    })

    sendTokenResponse(user, 201, res)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email and password",
      })
    }

    // Check for user
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      })
    }

    sendTokenResponse(user, 200, res)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// @route   GET /api/auth/logout
// @desc    Log user out / clear cookie
// @access  Private
router.get("/logout", (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  })

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  })
})

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken()

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  }

  // Remove password from output
  user.password = undefined

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    data: user,
  })
}

module.exports = router
