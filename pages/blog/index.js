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
      <div className="mt-16 w-full max-w-5xl mx-auto px-2 py-4 sm:px-6 lg:px-8">

        <div className="pb-4 border-b border-gray-300">
          <h1 className="text-6xl font-extrabold mb-4">All Posts</h1>
          <div className="relative flex w-full flex-wrap items-stretch mb-3 max-w-xl">
            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-3 py-3 placeholder-gray-300 text-gray-600 font-medium relative bg-white rounded-lg text-sm border border-gray-300 outline-none focus:outline-none focus:ring w-full pr-10" />
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-300 bg-transparent rounded-lg text-base items-center justify-center w-8 right-0 pr-3 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="mt-4 w-full grid grid-cols-3">
          {filteredPosts.map((p, i) => <PostComponent post={p} key={i} onClick={t => setSearchQuery(t.name)} />)}
        </div>

      </div>
    </WithNavbarLayout>
  )
}

const PostComponent = ({ post, onClick }) => (
  <>
    <p className="text-gray-600 tracking-wide">{moment(post.createdAt).format("MMM DD, YYYY")}</p>
    <div className="col-span-2">
      <Link href={"/blog/" + post.slug}>
        <h1 className="text-2xl font-bold cursor-pointer">{post.title}</h1>
      </Link>
      <div className="text-indigo-400 flex gap-4 flex-wrap">
        {post.tags.map((t, i) =>
          <p key={i} onClick={() => onClick(t)} className="cursor-pointer hover:text-indigo-600">{t.name}</p>
        )}
      </div>
      <p className="mt-2 text-gray-600">{post.teaser}</p>
    </div>
  </>
)

export default Blog