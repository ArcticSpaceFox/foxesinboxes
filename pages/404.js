import Link from 'next/link'

export default () => (
  <main>
    <div className="h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-200  flex items-center justify-center">
      <div className="container flex flex-col md:flex-row justify-center items-center px-5 text-gray-700">
        <div className="max-w-md">
          <img
            alt="Arctic fox pixel version bouncing up and down"
            className="mb-4 h-44 mx-auto md:hidden"
            src="/img/ArcticFoxPixel.gif"
          />
          <div className="text-7xl font-dark font-bold">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Sorry we couldn&apos;t find this page.{' '}
          </p>
          <p className="hidden md:block mb-8">
            While youre sitting here confused, we provided this bouncing fox for
            you.
          </p>
          <p className="md:hidden mb-8">Rather look at this bouncing fox.</p>

          <Link
            href="/"
          >
            <div
              className="px-4 inline py-2 text-sm font-medium leading-5 cursor-pointer shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-indigo-600 active:bg-blue-600 hover:bg-indigo-700"
            >
              back to homepage
            </div>
          </Link>
        </div>
        <div className="hidden md:block max-w-lg my-8 md:my-0">
          <img
            alt="Arctic fox pixel version hopping up and down"
            src="/img/ArcticFoxPixel.gif"
          />
        </div>
      </div>
    </div>
  </main>
)
