"use client"

import { createContext, useReducer, useEffect } from "react"
import axios from "axios"
import authReducer from "./authReducer"
import setAuthToken from "../../utils/setAuthToken"

// Initial state
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: true,
  error: null,
}

// Create context
export const AuthContext = createContext(initialState)

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load user
  useEffect(() => {
    const loadUser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token)
      }

      try {
        const res = await axios.get("/api/auth/me")

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data,
        })
      } catch (err) {
        dispatch({ type: "AUTH_ERROR" })
      }
    }

    loadUser()
  }, [])

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post("/api/auth/register", formData)

      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: err.response.data.message,
      })
    }
  }

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post("/api/auth/login", formData)

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: err.response.data.message,
      })
    }
  }

  // Logout
  const logout = async () => {
    try {
      await axios.get("/api/auth/logout")
      dispatch({ type: "LOGOUT" })
    } catch (err) {
      console.error("Logout error:", err)
      dispatch({ type: "LOGOUT" })
    }
  }

  // Clear errors
  const clearErrors = () => dispatch({ type: "CLEAR_ERRORS" })

  // Load user function for reuse
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get("/api/auth/me")

      dispatch({
        type: "USER_LOADED",
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({ type: "AUTH_ERROR" })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
