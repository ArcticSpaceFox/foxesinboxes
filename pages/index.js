import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
  }
});

import Link from "next/link";

export async function getStaticProps(context) {
  const { boxes } = await graphcms.request(
    `
    {
      boxes(last: 1) {
        boxname
        boxslug
        teaser

        boxLogo {
          url
        }
      }
    }
    `
  );

  return {
    props: {
      boxes: boxes
    }
  }
}

export default function Home({ boxes }) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
      <div className="min-h-screen flex items-center px-6 lg:px-32 bg-topography">
        <header className="w-full absolute left-0 top-0 p-6 lg:p-32 z-10">
          <div className="flex justify-between">
            <div>
              <img
                alt="FoxesInBoxes Logo"
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

        <section className="w-full xl:flex justify-between">
          <div>
            <span className="font-bold uppercase tracking-widest text-2xl lg:text-3xl">
              FoxesInBoxes
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-green-400">
              Solve Fun
              <br />
              Challenges
            </h1>
            <p className="font-bold mb-1 mt-4 text-2xl lg:text-3xl">
              Earn prizes and expand your knowledge
            </p>
          </div>
          {boxes[0] && (
            <div className="hidden max-w-md xl:flex">
              <div className="bg-white min-w-[24rem] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl self-center">
                <div className="px-8 py-5">
                  <div className="pb-2 mb-2 border-b border-gray-200 flex gap-4">
                    <img className="h-14 w-14" src={boxes[0].boxLogo?.url || "/img/FoxInTheBox.png"} />
                    <div>
                      <h2 className="text-gray-500 font-light uppercase tracking-wide text-xl">Newest box</h2>
                      <h1 className="text-gray-800 font-bold tracking-wide text-2xl">{boxes[0].boxname}</h1>
                    </div>
                  </div>
                  <p className="text-gray-600 pt-2 font-medium text-justify">{boxes[0].teaser}</p>
                </div>
                <div className="bg-indigo-50 border-t border-gray-200 w-full flex items-center">
                  <p className="w-1/2 text-gray-500 py-3 px-8">Interested?</p>
                  <Link href={"/boxes/" + boxes[0].boxslug}>
                    <a className="w-1/2 py-3 flex justify-center items-center text-gray-700 hover:text-white hover:bg-green-400">
                      More
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>
        <div className="absolute right-0 bottom-0 p-6 lg:p-32">
          <p className="font-bold text-lg tracking-wide mb-1">Yours Truly</p>
          <p>
            <span className="font-black">ArcticSpaceFox</span> (Creator)
          </p>
        </div>
      </div>
    </div>
  )
}
