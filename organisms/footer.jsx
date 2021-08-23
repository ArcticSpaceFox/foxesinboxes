const Footer = () => {
  return (
    <div className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between text-gray-600">
          <div className="">
            <span>© {new Date().getFullYear()} FoxesInBoxes </span>
          </div>
          <div className="">
            <a
              href="https://github.com/ArcticSpaceFox/foxesinboxes"
              className="inline-flex hover:text-indigo-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 pr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              our code
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
