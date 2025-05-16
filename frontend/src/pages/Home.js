import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              <span className="block">Memory Match</span>
              <span className="block text-purple-600">Challenge</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
              Test your memory skills in this fun card matching game. Challenge friends or compete for the top spot on
              our leaderboard!
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                to="/game"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
              >
                Play Now
              </Link>
              <Link
                to="/leaderboard"
                className="ml-4 px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
              >
                Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Game Features</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Enjoy these awesome features in our memory matching game
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Multiple Difficulty Levels</h3>
                <p className="mt-2 text-base text-gray-500">
                  Choose from easy, medium, or hard difficulty levels to match your skill level and challenge yourself.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">User Profiles</h3>
                <p className="mt-2 text-base text-gray-500">
                  Create your profile, track your progress, and see your game history and statistics.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Global Leaderboard</h3>
                <p className="mt-2 text-base text-gray-500">
                  Compete with players from around the world and see who has the best memory skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How to Play</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Learn the simple rules and start playing in seconds
            </p>
          </div>

          <div className="mt-10">
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <ul className="divide-y divide-gray-200">
                <li className="p-6 flex">
                  <div className="flex-shrink-0 bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Click on any card to flip it</h3>
                    <p className="mt-1 text-base text-gray-500">
                      Start by flipping any card on the board to reveal the hidden image.
                    </p>
                  </div>
                </li>
                <li className="p-6 flex">
                  <div className="flex-shrink-0 bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Find matching pairs</h3>
                    <p className="mt-1 text-base text-gray-500">
                      Try to remember the position of each card and find its matching pair.
                    </p>
                  </div>
                </li>
                <li className="p-6 flex">
                  <div className="flex-shrink-0 bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Match all pairs to win</h3>
                    <p className="mt-1 text-base text-gray-500">
                      Complete the game by matching all pairs in the fewest moves and shortest time.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Ready to test your memory?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-purple-100">
              Start playing now and see if you can reach the top of the leaderboard!
            </p>
            <div className="mt-8">
              <Link
                to="/game"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
              >
                Play Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
