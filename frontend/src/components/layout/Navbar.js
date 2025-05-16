"use client"

import { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../../context/auth/AuthContext"

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const onLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Play", path: "/game" },
    { name: "Leaderboard", path: "/leaderboard" },
  ]

  const authLinks = (
    <>
      <li className="flex items-center">
        <Link
          to="/profile"
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="hidden md:inline">Profile</span>
          <i className="fas fa-user-circle md:hidden"></i>
        </Link>
      </li>
      <li className="flex items-center">
        <button
          onClick={onLogout}
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-100"
        >
          <span className="hidden md:inline">Logout</span>
          <i className="fas fa-sign-out-alt md:hidden"></i>
        </button>
      </li>
    </>
  )

  const guestLinks = (
    <>
      <li className="flex items-center">
        <Link
          to="/login"
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(false)}
        >
          Login
        </Link>
      </li>
      <li className="flex items-center">
        <Link
          to="/register"
          className="px-3 py-2 rounded-md text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 ml-2"
          onClick={() => setIsMenuOpen(false)}
        >
          Register
        </Link>
      </li>
    </>
  )

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-purple-600">MemoryMatch</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-700 hover:text-purple-600 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            <ul className="flex items-center space-x-2">{isAuthenticated ? authLinks : guestLinks}</ul>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-700 hover:text-purple-600 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              {isAuthenticated ? (
                <>
                  <div className="block px-3 py-2 text-base font-medium text-gray-500">
                    Hello, {user && user.username}
                  </div>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-purple-600 text-white hover:bg-purple-700 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
