"use client"

import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth/AuthContext"
import { toast } from "react-toastify"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const { login, isAuthenticated, error, clearErrors } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    // If already authenticated, redirect to game page
    if (isAuthenticated) {
      navigate("/game")
    }

    // Show error toast if there's an error
    if (error) {
      toast.error(error)
      clearErrors()
    }
  }, [isAuthenticated, error, navigate, clearErrors])

  const { email, password } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(formData)
    } catch (err) {
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Log In to Your Account</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                  Password
                </label>
                <a href="#!" className="text-sm text-purple-600 hover:text-purple-500">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-600 hover:text-purple-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
