const express = require("express")
const router = express.Router()
const GameResult = require("../models/GameResult")

// @route   GET /api/leaderboard
// @desc    Get global leaderboard
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { difficulty, limit = 10 } = req.query

    // Build query
    const query = {}
    if (difficulty && difficulty !== "all") {
      query.difficulty = difficulty
    }

    // Get leaderboard
    const leaderboard = await GameResult.find(query)
      .sort({ score: -1, time: 1, moves: 1 })
      .limit(Number.parseInt(limit, 10))
      .populate("user", "username")

    // Format response
    const formattedLeaderboard = leaderboard.map((entry) => ({
      id: entry._id,
      userId: entry.user._id,
      username: entry.user.username,
      score: entry.score,
      moves: entry.moves,
      time: entry.time,
      difficulty: entry.difficulty,
      date: entry.createdAt,
    }))

    res.status(200).json({
      success: true,
      count: formattedLeaderboard.length,
      data: formattedLeaderboard,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// @route   GET /api/leaderboard/user/:userId
// @desc    Get leaderboard for a specific user
// @access  Public
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const { limit = 10 } = req.query

    // Get user's best scores
    const userScores = await GameResult.find({ user: userId })
      .sort({ score: -1 })
      .limit(Number.parseInt(limit, 10))
      .populate("user", "username")

    // Format response
    const formattedScores = userScores.map((entry) => ({
      id: entry._id,
      userId: entry.user._id,
      username: entry.user.username,
      score: entry.score,
      moves: entry.moves,
      time: entry.time,
      difficulty: entry.difficulty,
      date: entry.createdAt,
    }))

    res.status(200).json({
      success: true,
      count: formattedScores.length,
      data: formattedScores,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

module.exports = router
