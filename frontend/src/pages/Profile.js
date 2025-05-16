"use client"

import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/auth/AuthContext"
import { toast } from "react-toastify"

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  })
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/users/profile")
        setProfile(res.data.data)
        setFormData({
          username: res.data.data.user.username,
          email: res.data.data.user.email,
        })
      } catch (err) {
        console.error("Error fetching profile:", err)
        toast.error("Failed to load profile data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      const res = await axios.put("/api/users/profile", formData)
      setProfile({
        ...profile,
        user: {
          ...profile.user,
          username: res.data.data.username,
          email: res.data.data.email,
        },
      })
      toast.success("Profile updated successfully")
    } catch (err) {
      console.error("Error updating profile:", err)
      toast.error(err.response?.data?.message || "Failed to update profile")
    } finally {
      setIsUpdating(false)
    }
  }

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-lg">Loading profile...</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="md:col-span-1">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-purple-50">
              <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
              <p className="mt-1 text-sm text-gray-500">Update your account details</p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Game Statistics */}
        <div className="md:col-span-2">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-purple-50">
              <h2 className="text-lg font-medium text-gray-900">Game Statistics</h2>
              <p className="mt-1 text-sm text-gray-500">Your performance in Memory Match Challenge</p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Games Played</div>
                  <div className="text-2xl font-bold text-gray-900">{profile.stats.gamesPlayed}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Best Score</div>
                  <div className="text-2xl font-bold text-gray-900">{profile.stats.bestScore}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Member Since</div>
                  <div className="text-2xl font-bold text-gray-900">{formatDate(profile.user.createdAt)}</div>
                </div>
              </div>

              {profile.stats.bestGame && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Best Game</h3>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Score</div>
                        <div className="text-xl font-bold text-gray-900">{profile.stats.bestGame.score}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Moves</div>
                        <div className="text-xl font-bold text-gray-900">{profile.stats.bestGame.moves}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Time</div>
                        <div className="text-xl font-bold text-gray-900">{formatTime(profile.stats.bestGame.time)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Difficulty</div>
                        <div className="text-xl font-bold text-gray-900 capitalize">
                          {profile.stats.bestGame.difficulty}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Performance by Difficulty</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Difficulty
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Games
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Avg. Score
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Avg. Moves
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Avg. Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.keys(profile.stats.byDifficulty).map((difficulty) => (
                        <tr key={difficulty}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                            {difficulty}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {profile.stats.byDifficulty[difficulty].count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {profile.stats.byDifficulty[difficulty].avgScore}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {profile.stats.byDifficulty[difficulty].avgMoves}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                            {formatTime(profile.stats.byDifficulty[difficulty].avgTime)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
