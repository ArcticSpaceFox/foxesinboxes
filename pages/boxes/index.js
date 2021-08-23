import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
  }
});

import { useState } from 'react'
import Link from 'next/link'
import moment from "moment";

import Header from '../../organisms/header'
import Layout from '../../templates/withNavbar'

export async function getStaticProps(context) {
  const { boxes } = await graphcms.request(
    `
    {
      boxes {
        boxname
        boxslug
        teaser
        createdAt

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

const BoxesPage = ({ boxes }) => {
  // State
  const [pager, setPager] = useState(0)
  const maxBoxesPage = 10;

  // page ui
  return (
    <Layout>
      <Header title="All Boxes" />
      <section id="#" className="w-full mx-auto max-w-7xl px-4 sm:px-8">
        <div className="md:hidden my-4 grid sm:grid-cols-2 gap-4">
          {boxes.slice(pager * maxBoxesPage, pager * maxBoxesPage + 19).map((b, i) => (
            <MobileCardItem key={i} {...b} />
          ))}
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 hidden md:block">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal table-auto">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">

                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Box name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>
                </tr>
              </thead>
              <tbody>
                {boxes.slice(pager * maxBoxesPage, pager * maxBoxesPage + 19).map((b, i) => (
                  <TableItem key={i} {...b} />
                ))}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing {pager * maxBoxesPage + 1} to {pager * maxBoxesPage + maxBoxesPage} of {boxes.length}{' '}
                Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={() => setPager(pager == 0 ? pager : pager - 1)}
                  disabled={pager == 0}
                  className={`text-sm ${pager != 0
                    ? 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold'
                    : 'bg-gray-100 text-gray-300'
                    } py-2 px-4 rounded-l`}
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setPager(boxes.length > pager * maxBoxesPage + maxBoxesPage ? pager + 1 : pager)
                  }
                  disabled={boxes.length <= pager * maxBoxesPage + 19}
                  className={`text-sm ${boxes.length > pager * maxBoxesPage + maxBoxesPage
                    ? 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold'
                    : 'bg-gray-100 text-gray-300'
                    } py-2 px-4 rounded-r`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

const MobileCardItem = ({ boxname, boxslug, teaser, boxLogo, createdAt }) => {
  const difficulty = "BEGINNER";

  return (
    <Link href={"boxes/" + boxslug} >

      <div className="border border-gray-300 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white">
        <h2 className="text-xl font-medium title-font mb-2 truncate">{boxname}</h2>
        <p className="leading-relaxed text-base truncate">{teaser}</p>

        <div className="text-center mt-2 leading-none flex justify-between w-full">
          <span className=" mr-3 inline-flex items-center leading-none text-sm  py-1 ">
            <svg
              className=" fill-current w-4 h-4 mr-2 text-blue-500"
              xmlns="http://www.w3.org/maxBoxesPage00/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-maxBoxesPage0-89.5-maxBoxesPage0-maxBoxesPage0S145.5 56 256 56smaxBoxesPage0 89.5 maxBoxesPage0 maxBoxesPage0-89.5 maxBoxesPage0-maxBoxesPage0 maxBoxesPage0zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />
            </svg>
            {moment(createdAt.toString()).format('DD-MM-YYYY')}
          </span>
          <span className=" inline-flex items-center leading-none text-sm">
            <img 
              className="h-8 w-8 rounded-full object-contain"
              src={boxLogo?.url || "/img/FoxInTheBox.png"}
            />
          </span>
        </div>
      </div>
    </Link>
  )
}

const TableItem = ({ boxname, boxslug, teaser, boxLogo, createdAt }) => {
  return (
    <Link href={"boxes/" + boxslug}>
      <tr className="group cursor-pointer">
        <td className="px-5 py-5 border-b border-gray-200  group-hover:bg-indigo-100 bg-white text-sm">
          <img
            className="h-8 w-8 rounded-full object-contain"
            alt="Box logo"
            src={boxLogo?.url || "/img/FoxInTheBox.png"}
          />
        </td>
        <td className="px-5 py-5 border-b border-gray-200 group-hover:bg-indigo-100 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap font-mono truncate">
            {boxname}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200  group-hover:bg-indigo-100 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{teaser || "This box is a mystery"}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200  group-hover:bg-indigo-100 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {new Date(createdAt).toLocaleString()}
          </p>
        </td>
      </tr>
    </Link>
  )
}

export default BoxesPage
