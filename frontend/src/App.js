import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// Pages
import Home from "./pages/Home"
import Game from "./pages/Game"
import Leaderboard from "./pages/Leaderboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"

// Components
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import PrivateRoute from "./components/routing/PrivateRoute"

// Context
import { AuthProvider } from "./context/auth/AuthContext"
import { GameProvider } from "./context/game/GameContext"

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer position="bottom-right" />
        </Router>
      </GameProvider>
    </AuthProvider>
  )
}

export default App
