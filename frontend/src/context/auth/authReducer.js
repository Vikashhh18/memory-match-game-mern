const authReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      }
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      }
    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      }
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export default authReducer
