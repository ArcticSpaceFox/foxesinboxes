import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
  }
});

import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

import WithNavbarLayout from '../../templates/withNavbar';
import { useState } from 'react';

export async function getStaticProps(context) {
  const { blogPosts } = await graphcms.request(
    `
    {
      blogPosts {
        title
        slug
        teaser
        createdAt
        tags {
          name
        }
      }
    }
    `
  );

  return {
    props: {
      posts: blogPosts
    }
  }
}

const Blog = ({ posts }) => {
  const { query } = useRouter()

  const [searchQuery, setSearchQuery] = useState(query?.q || "")

  let filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.slug.includes(searchQuery) || 
    p.tags.filter((s) => s.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())).length > 0 || 
    moment(p.createdAt).format("MMM DD, YYYY").includes(searchQuery)
  )

  return (
    <WithNavbarLayout>
      <div className="mt-16 w-full max-w-5xl mx-auto px-2 py-4 sm:px-6 lg:px-8 space-y-4">

        <div className="pb-4 border-b border-gray-300 dark:border-gray-600">
          <h1 className="text-6xl font-extrabold mb-4 dark:text-gray-200">All Posts</h1>
          <div className="relative flex w-full flex-wrap items-stretch mb-3 max-w-xl">
            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-3 py-3 placeholder-gray-300 dark:placeholder-gray-600 text-gray-600 dark:text-gray-400 font-medium relative bg-white dark:bg-gray-800 rounded-lg text-sm border border-gray-300 dark:border-gray-700 outline-none focus:outline-none focus:ring dark:ring-indigo-600 w-full pr-10" />
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-300 dark:text-gray-600 bg-transparent rounded-lg text-base items-center justify-center w-8 right-0 pr-3 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="mt-4 w-full md:grid grid-cols-3">
          {filteredPosts.map((p, i) => <PostComponent post={p} key={i} onClick={t => setSearchQuery(t.name)} />)}
        </div>

      </div>
    </WithNavbarLayout>
  )
}

const PostComponent = ({ post, onClick }) => (
  <>
    <div className="flex sm:block justify-between items-center">
      <p className="text-gray-600 dark:text-gray-500 tracking-wide mb-2">{moment(post.createdAt).format("MMM DD, YYYY")}</p>
      <Link href={"/blog/"+post.slug}>
        <a className="flex items-center text-indigo-400 dark:text-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400">
          READ
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </Link>
    </div>
    <div className="col-span-2">
      <Link href={"/blog/" + post.slug}>
        <h1 className="text-2xl font-bold cursor-pointer dark:text-gray-200">{post.title}</h1>
      </Link>
      <div className="text-indigo-400 dark:text-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 flex gap-4 flex-wrap">
        {post.tags.map((t, i) =>
          <p key={i} onClick={() => onClick(t)} className="cursor-pointer">{t.name}</p>
        )}
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-500 text-justify break-words">{post.teaser}</p>
    </div>
  </>
)

export default Blog
