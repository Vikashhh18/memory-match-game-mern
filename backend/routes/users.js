const express = require("express")
const router = express.Router()
const User = require("../models/User")
const GameResult = require("../models/GameResult")
const { protect } = require("../middleware/auth")

// @route   GET /api/users/profile
// @desc    Get user profile with stats
// @access  Private
router.get("/profile", protect, async (req, res) => {
  try {
    // Get user
    const user = await User.findById(req.user.id)

    // Get user's best game
    const bestGame = await GameResult.findOne({ user: req.user.id }).sort({ score: -1 })

    // Get total games by difficulty
    const gamesByDifficulty = await GameResult.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$difficulty",
          count: { $sum: 1 },
          avgScore: { $avg: "$score" },
          avgMoves: { $avg: "$moves" },
          avgTime: { $avg: "$time" },
        },
      },
    ])

    // Format difficulty stats
    const difficultyStats = {}
    gamesByDifficulty.forEach((stat) => {
      difficultyStats[stat._id] = {
        count: stat.count,
        avgScore: Math.round(stat.avgScore),
        avgMoves: Math.round(stat.avgMoves),
        avgTime: Math.round(stat.avgTime),
      }
    })

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        },
        stats: {
          gamesPlayed: user.gamesPlayed,
          bestScore: user.bestScore,
          bestGame: bestGame
            ? {
                score: bestGame.score,
                moves: bestGame.moves,
                time: bestGame.time,
                difficulty: bestGame.difficulty,
                date: bestGame.createdAt,
              }
            : null,
          byDifficulty: difficultyStats,
        },
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", protect, async (req, res) => {
  try {
    const { username, email } = req.body

    // Check if username is already taken
    if (username && username !== req.user.username) {
      const usernameExists = await User.findOne({ username })
      if (usernameExists) {
        return res.status(400).json({
          success: false,
          message: "Username is already taken",
        })
      }
    }

    // Check if email is already taken
    if (email && email !== req.user.email) {
      const emailExists = await User.findOne({ email })
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email is already taken",
        })
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true, runValidators: true },
    )

    res.status(200).json({
      success: true,
      data: updatedUser,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

module.exports = router
