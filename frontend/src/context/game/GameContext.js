"use client"

import { createContext, useReducer } from "react"
import axios from "axios"
import gameReducer from "./gameReducer"

// Initial state
const initialState = {
  cards: [],
  flippedIndexes: [],
  matchedPairs: 0,
  moves: 0,
  timer: 0,
  isActive: false,
  gameOver: false,
  difficulty: "easy",
  loading: false,
  error: null,
}

// Create context
export const GameContext = createContext(initialState)

// Provider component
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // Set difficulty
  const setDifficulty = (difficulty) => {
    dispatch({
      type: "SET_DIFFICULTY",
      payload: difficulty,
    })
  }

  // Start game
  const startGame = () => {
    // Get number of pairs based on difficulty
    let numPairs
    switch (state.difficulty) {
      case "easy":
        numPairs = 6
        break
      case "medium":
        numPairs = 10
        break
      case "hard":
        numPairs = 12
        break
      default:
        numPairs = 6
    }

    // Card types (emojis)
    const cardTypes = [
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐨",
      "🐯",
      "🦁",
      "🐮",
      "🐷",
      "🐸",
      "🐵",
      "🐔",
      "🦄",
      "🐙",
      "🦋",
      "🐢",
      "🦖",
      "🦕",
      "🦀",
      "🐬",
    ]

    // Get a subset of card types based on difficulty
    const selectedTypes = [...cardTypes].slice(0, numPairs)

    // Create pairs of cards
    let newCards = []
    selectedTypes.forEach((type) => {
      // Create two cards of the same type (a pair)
      newCards.push(
        { id: newCards.length, type, flipped: false, matched: false },
        { id: newCards.length + 1, type, flipped: false, matched: false },
      )
    })

    // Shuffle the cards
    newCards = shuffleArray(newCards)

    dispatch({
      type: "START_GAME",
      payload: newCards,
    })
  }

  // Flip card
  const flipCard = (index) => {
    dispatch({
      type: "FLIP_CARD",
      payload: index,
    })
  }

  // Check for match
  const checkMatch = () => {
    const [firstIndex, secondIndex] = state.flippedIndexes

    if (state.cards[firstIndex].type === state.cards[secondIndex].type) {
      // Match found
      dispatch({ type: "MATCH_FOUND", payload: [firstIndex, secondIndex] })

      // Check if game is over
      if (state.matchedPairs + 1 === state.cards.length / 2) {
        endGame()
      }
    } else {
      // No match
      setTimeout(() => {
        dispatch({ type: "NO_MATCH", payload: [firstIndex, secondIndex] })
      }, 1000)
    }
  }

  // End game
  const endGame = async () => {
    dispatch({ type: "END_GAME" })

    // Calculate score
    const score = calculateScore(state.moves, state.timer, state.difficulty)

    // Save game result if authenticated
    try {
      await axios.post("/api/games/results", {
        score,
        moves: state.moves,
        time: state.timer,
        difficulty: state.difficulty,
        completed: true,
      })
    } catch (err) {
      console.error("Error saving game result:", err)
    }
  }

  // Reset game
  const resetGame = () => {
    dispatch({ type: "RESET_GAME" })
    startGame()
  }

  // Update timer
  const updateTimer = () => {
    dispatch({ type: "UPDATE_TIMER" })
  }

  // Helper function to shuffle array
  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Calculate score based on moves and time
  const calculateScore = (moves, time, difficulty) => {
    let baseScore

    switch (difficulty) {
      case "easy":
        baseScore = 1000
        break
      case "medium":
        baseScore = 2000
        break
      case "hard":
        baseScore = 3000
        break
      default:
        baseScore = 1000
    }

    // Penalize for more moves and longer time
    const movesPenalty = moves * 10
    const timePenalty = Math.floor(time / 2)

    const finalScore = Math.max(0, baseScore - movesPenalty - timePenalty)
    return finalScore
  }

  return (
    <GameContext.Provider
      value={{
        cards: state.cards,
        flippedIndexes: state.flippedIndexes,
        matchedPairs: state.matchedPairs,
        moves: state.moves,
        timer: state.timer,
        isActive: state.isActive,
        gameOver: state.gameOver,
        difficulty: state.difficulty,
        loading: state.loading,
        error: state.error,
        setDifficulty,
        startGame,
        flipCard,
        checkMatch,
        resetGame,
        updateTimer,
        calculateScore,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
