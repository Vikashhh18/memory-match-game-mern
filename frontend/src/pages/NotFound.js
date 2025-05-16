import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
