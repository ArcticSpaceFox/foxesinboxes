import Link from 'next/link'
import { useState, useEffect } from 'react'

const InfoBanner = () => {
  // component states
  const [dismissedState, setDismissedState] = useState(true)
  // component functions
  useEffect(() => {
    setDismissedState(localStorage.dismissed)
  }, [])
  const handleDismiss = () => {
    localStorage.dismissed = true
    setDismissedState(true)
  }
  // Component UI
  return (
    <>
      <div className={`${dismissedState ? 'hidden' : ''} bg-indigo-600`}>
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-indigo-800">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </span>
              <p className="ml-3 font-medium text-white truncate">
                {/* Basic announcement title sm*/}
                <span className="sm:hidden">
                  We are in v2{' '}
                  <span role="img" aria-label="fire">
                    🔥
                  </span>
                </span>
                {/* Basic announcement title md*/}
                <span className="hidden sm:block md:hidden">
                  We are in v2!!! Enjoy our new Page{' '}
                  <span role="img" aria-label="peace fingers">
                    ✌️
                  </span>
                </span>
                {/* Basic announcement title xl */}
                <span className="hidden md:inline">
                  <span className="font-bold">FitB</span> is now officially in
                  v2, enjoy our new UI and other features. If youre interested
                  read more about what&apos;s new in our blog.
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <Link
                href="/blog"
              >
                <div
                  className="flex items-center justify-center px-4 py-2 cursor-pointer border border-transparent rounded-md shadow-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Learn more
                </div>
              </Link>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                className="-mr1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                onClick={() => handleDismiss()}
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoBanner
