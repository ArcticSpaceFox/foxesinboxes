import Link from "next/link";

import WithNavbarLayout from "../templates/withNavbar";

export default function Home() {
  return (
      <div className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white min-h-screen flex items-center px-6 lg:px-32 bg-topography">
        <header className="w-full absolute left-0 top-0 p-6 lg:p-32 z-10">
          <div className="flex justify-between">
            <div>
              <img
                alt="FoxInTheBox Logo"
                className="h-12 md:h-24"
                src="/img/FoxInTheBox.png"
              />
            </div>

            <div className="flex">
              <Link
                href="/about"
              >
                <div
                  className="hidden md:block cursor-pointer focus:outline-none focus:ring focus:ring-green-400 hover:bg-blue-500 text-white hover:text-green-400 h-10 px-3 py-2 rounded-md"

                >
                  <h1 className="text-xl font-semibold">Learn more</h1>
                </div>
              </Link>
              <Link
                href="/boxes"
              >
                <div
                  className="bg-white ml-6 cursor-pointer hover:bg-green-400 focus:bg-gray-100 focus:outline-none focus:ring focus:ring-green-400  flex space-between h-10 px-3 py-2 rounded-md text-indigo-600 hover:text-indigo-700 text-xl font-bold"
                >
                  Start now
                  <div className="pt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </header>

        <section className="w-full md:w-9/12 xl:w-8/12">
          <span className="font-bold uppercase tracking-widest text-2xl lg:text-3xl">
            FoxInTheBox
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-green-400">
            Solve Fun
            <br />
            Challenges
          </h1>
          <p className="font-bold mb-1 mt-4 text-2xl lg:text-3xl">
            Earn prizes and expand your knowledge
          </p>
        </section>
        <div className="absolute right-0 bottom-0 p-6 lg:p-32">
          <p className="font-bold text-lg tracking-wide mb-1">Yours Truly</p>
          <p>
            <span className="font-black">ArcticSpaceFox</span> (Creator)
          </p>
        </div>
      </div>
  )
}
