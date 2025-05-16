import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import axios from "axios"

// Set base URL for axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000"
axios.defaults.withCredentials = true

// Add axios interceptors for better error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
