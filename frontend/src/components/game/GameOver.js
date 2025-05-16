"use client"

import { useContext } from "react"
import { AuthContext } from "../../context/auth/AuthContext"
import { Link } from "react-router-dom"

const GameOver = ({ score, moves, time, onRestart }) => {
  const { isAuthenticated } = useContext(AuthContext)

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Memory Match Challenge",
          text: `I scored ${score} points in Memory Match Challenge! I completed the game in ${moves} moves and ${formatTime(time)}. Can you beat my score?`,
          url: window.location.href,
        })
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(
          `I scored ${score} points in Memory Match Challenge! I completed the game in ${moves} moves and ${formatTime(time)}. Can you beat my score? ${window.location.href}`,
        )
        alert("Score copied to clipboard!")
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto my-8">
      <div className="bg-purple-100 p-6 text-center">
        <div className="mx-auto bg-purple-200 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-purple-800">Game Completed!</h2>
      </div>

      <div className="p-6">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-purple-600 mb-2">{score}</div>
          <div className="text-gray-500">Points</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mb-1 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
            <div className="text-sm text-gray-500">Moves</div>
            <div className="text-xl font-bold">{moves}</div>
          </div>

          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mb-1 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-gray-500">Time</div>
            <div className="text-xl font-bold">{formatTime(time)}</div>
          </div>
        </div>

        {isAuthenticated ? (
          <p className="text-center text-sm text-gray-500 mb-4">Your score has been saved to the leaderboard!</p>
        ) : (
          <p className="text-center text-sm text-gray-500 mb-4">
            <Link to="/login" className="text-purple-600 hover:underline">
              Log in
            </Link>{" "}
            to save your score to the leaderboard!
          </p>
        )}
      </div>

      <div className="px-6 pb-6 flex flex-col gap-2">
        <button
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onClick={onRestart}
        >
          Play Again
        </button>

        <button
          className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onClick={handleShare}
        >
          Share Score
        </button>
      </div>
    </div>
  )
}

export default GameOver
