const mongoose = require("mongoose")

const GameResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  moves: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  completed: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Index for faster leaderboard queries
GameResultSchema.index({ score: -1, time: 1, moves: 1 })
GameResultSchema.index({ difficulty: 1, score: -1 })
GameResultSchema.index({ user: 1, createdAt: -1 })

module.exports = mongoose.model("GameResult", GameResultSchema)
