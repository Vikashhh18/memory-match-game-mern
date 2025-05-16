const express = require("express")
const router = express.Router()
const GameResult = require("../models/GameResult")
const User = require("../models/User")
const { protect } = require("../middleware/auth")

// @route   POST /api/games/results
// @desc    Save game result
// @access  Private
router.post("/results", protect, async (req, res) => {
  try {
    const { score, moves, time, difficulty, completed } = req.body

    // Create game result
    const gameResult = await GameResult.create({
      user: req.user.id,
      score,
      moves,
      time,
      difficulty,
      completed,
    })

    // Update user stats
    const user = await User.findById(req.user.id)
    user.gamesPlayed += 1

    if (score > user.bestScore) {
      user.bestScore = score
    }

    await user.save()

    res.status(201).json({
      success: true,
      data: gameResult,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// @route   GET /api/games/results
// @desc    Get user's game results
// @access  Private
router.get("/results", protect, async (req, res) => {
  try {
    const results = await GameResult.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(10)

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

module.exports = router
