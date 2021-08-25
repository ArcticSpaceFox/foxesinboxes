import Link from 'next/link'
import Image from 'next/image'

function Error({ statusCode }) {
  return (
    <main>
      <div className="h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-200  flex items-center justify-center">
        <div className="container flex flex-col md:flex-row justify-center items-center px-5 text-gray-700">
          <div className="max-w-lg my-8 md:my-0 md:mr-8">
            <Image
              height="256px"
              width="256px"
              alt="Confused looking fox"
              className="h-56 md:h-52"
              src="/img/FoxConfused.png"
            />
          </div>
          <div className="max-w-md">
            <div className="text-7xl font-dark font-bold">Ups {statusCode || ""}</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              {statusCode ? "Our server had an error" : "Your client ran into an error"}
            </p>
            <p className="hidden md:block mb-8 mt-2">
              If you think this error is unintended feel free to contact us
            </p>
            <p className="md:hidden mb-8">Feel free to contact us</p>

            <Link
              to="/"
            >
              <div
                className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-indigo-600 active:bg-blue-600 hover:bg-indigo-700"
              >
                back to homepage
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error