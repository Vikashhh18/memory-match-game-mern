"use client"

import { useState, useEffect } from "react"

const GameCard = ({ card, onClick, disabled }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  // Update the flipped state when the card prop changes
  useEffect(() => {
    setIsFlipped(card.flipped || card.matched)
  }, [card.flipped, card.matched])

  return (
    <div
      className={`relative h-24 md:h-32 cursor-pointer transform transition-transform duration-500 ${disabled ? "cursor-default" : ""}`}
      onClick={() => !disabled && onClick()}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`absolute w-full h-full transition-transform duration-500 transform-gpu ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Back */}
        <div
          className={`absolute w-full h-full rounded-lg flex items-center justify-center bg-purple-100 border-2 border-purple-300 hover:border-purple-500 transition-colors ${
            isFlipped ? "invisible" : "visible"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-purple-600 font-bold text-lg">?</span>
        </div>

        {/* Card Front */}
        <div
          className={`absolute w-full h-full rounded-lg flex items-center justify-center ${
            card.matched ? "bg-green-100 border-2 border-green-300" : "bg-white border-2 border-gray-300"
          } ${isFlipped ? "visible" : "invisible"}`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-4xl md:text-5xl">{card.type}</span>
        </div>
      </div>
    </div>
  )
}

export default GameCard
