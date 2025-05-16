"use client"

import { useContext, useEffect, useState } from "react"
import { GameContext } from "../context/game/GameContext"
import GameCard from "../components/game/GameCard"
import GameStats from "../components/game/GameStats"
import GameOver from "../components/game/GameOver"

const Game = () => {
  const {
    cards,
    flippedIndexes,
    moves,
    timer,
    isActive,
    gameOver,
    difficulty,
    setDifficulty,
    startGame,
    flipCard,
    checkMatch,
    resetGame,
    updateTimer,
    calculateScore,
  } = useContext(GameContext)

  const [isLoading, setIsLoading] = useState(false)

  // Start the game when component mounts or difficulty changes
  useEffect(() => {
    startGame()
  }, [difficulty])

  // Timer effect
  useEffect(() => {
    let interval = null

    if (isActive && !gameOver) {
      interval = setInterval(() => {
        updateTimer()
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, gameOver, updateTimer])

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedIndexes.length === 2) {
      checkMatch()
    }
  }, [flippedIndexes, checkMatch])

  // Handle card click
  const handleCardClick = (index) => {
    // Prevent flipping if the game is over or the card is already flipped/matched
    if (gameOver || cards[index].flipped || cards[index].matched) {
      return
    }

    // Prevent flipping more than 2 cards at once
    if (flippedIndexes.length === 2) {
      return
    }

    flipCard(index)
  }

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty) => {
    if (isActive && !gameOver) {
      if (!window.confirm("Changing difficulty will reset your current game. Continue?")) {
        return
      }
    }

    setIsLoading(true)
    setDifficulty(newDifficulty)

    // Add a small delay to show loading state
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  // Handle restart
  const handleRestart = () => {
    setIsLoading(true)

    // Add a small delay to show loading state
    setTimeout(() => {
      resetGame()
      startGame()
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Memory Match Challenge</h1>
          <p className="text-gray-600">Find all matching pairs to win!</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-md ${
              difficulty === "easy"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleDifficultyChange("easy")}
          >
            Easy
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              difficulty === "medium"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleDifficultyChange("medium")}
          >
            Medium
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              difficulty === "hard"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleDifficultyChange("hard")}
          >
            Hard
          </button>
          <button
            className="px-4 py-2 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 ml-2"
            onClick={handleRestart}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Restart
          </button>
        </div>
      </div>

      <GameStats moves={moves} time={timer} difficulty={difficulty} />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          <span className="ml-2 text-lg">Loading game...</span>
        </div>
      ) : gameOver ? (
        <GameOver
          score={calculateScore(moves, timer, difficulty)}
          moves={moves}
          time={timer}
          onRestart={handleRestart}
        />
      ) : (
        <div
          className={`grid gap-4 ${
            difficulty === "easy"
              ? "grid-cols-3 md:grid-cols-4"
              : difficulty === "medium"
                ? "grid-cols-4 md:grid-cols-5"
                : "grid-cols-4 md:grid-cols-6"
          }`}
        >
          {cards.map((card, index) => (
            <GameCard
              key={card.id}
              card={card}
              onClick={() => handleCardClick(index)}
              disabled={flippedIndexes.length === 2}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Game
