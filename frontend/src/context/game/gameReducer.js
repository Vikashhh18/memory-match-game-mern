const gameReducer = (state, action) => {
  switch (action.type) {
    case "SET_DIFFICULTY":
      return {
        ...state,
        difficulty: action.payload,
      }
    case "START_GAME":
      return {
        ...state,
        cards: action.payload,
        flippedIndexes: [],
        matchedPairs: 0,
        moves: 0,
        timer: 0,
        isActive: true,
        gameOver: false,
      }
    case "FLIP_CARD":
      const newCards = [...state.cards]
      newCards[action.payload].flipped = true

      return {
        ...state,
        cards: newCards,
        flippedIndexes: [...state.flippedIndexes, action.payload],
        moves: state.flippedIndexes.length === 1 ? state.moves + 1 : state.moves,
      }
    case "MATCH_FOUND":
      const matchedCards = [...state.cards]
      action.payload.forEach((index) => {
        matchedCards[index].matched = true
      })

      return {
        ...state,
        cards: matchedCards,
        flippedIndexes: [],
        matchedPairs: state.matchedPairs + 1,
      }
    case "NO_MATCH":
      const resetCards = [...state.cards]
      action.payload.forEach((index) => {
        resetCards[index].flipped = false
      })

      return {
        ...state,
        cards: resetCards,
        flippedIndexes: [],
      }
    case "UPDATE_TIMER":
      return {
        ...state,
        timer: state.timer + 1,
      }
    case "END_GAME":
      return {
        ...state,
        isActive: false,
        gameOver: true,
      }
    case "RESET_GAME":
      return {
        ...state,
        flippedIndexes: [],
        matchedPairs: 0,
        moves: 0,
        timer: 0,
        isActive: false,
        gameOver: false,
      }
    default:
      return state
  }
}

export default gameReducer
