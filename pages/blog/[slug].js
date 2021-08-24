import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
  }
});

import Head from 'next/head'
import Link from 'next/link'

import WithNavbarLayout from '../../templates/withNavbar';
import { RichText } from "@graphcms/rich-text-react-renderer";
import moment from 'moment';

export async function getStaticProps({ params }) {
  let { blogPost, blogPosts } = await graphcms.request(
    `
    query BlogPost($slug: String!) {
      blogPost(where: {
        slug: $slug
      }) {
        createdAt
        title
        teaser
        title
        content {
          json
        }
        author {
          name
          profilePic {
            url
          }
        }
        tags {
          name
        }
      }
      blogPosts(last: 1, where: {
        NOT: {
          slug: $slug
        }
      }) {
        title
        slug
      }
    }
    `,
    {
      "slug": params.slug
    }
  );

  return {
    props: {
      post: blogPost,
      last: blogPosts
    }
  }
}

export async function getStaticPaths() {
  const { blogPosts } = await graphcms.request(
    `
    {
      blogPosts {
        slug
      }
    }
    `
  );

  return {
    paths: blogPosts.map(({ slug }) => ({
      params: {
        slug: slug
      },
    })),
    fallback: false,
  }
}

const BlogPost = ({ post, last }) => {
  return (
    <WithNavbarLayout>
      <div class="max-w-7xl mx-auto w-full px-4 pb-6 sm:px-6 lg:px-8 mt-16 border-b border-gray-300">
        <div class="lg:text-center">
          <h2 class="text-base text-gray-500 tracking-wide">{moment(post.createdAt).format("dddd, MMM DD, YYYY")}</h2>
          <p class="mt-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {post.title}
          </p>
          <p class="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
            {post.teaser}
          </p>
        </div>
      </div>
      <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-5 gap-8">
        <div>
          {/* Author info */}
          <div className="flex items-center pb-6 border-b border-gray-300">
            <img className="h-12 w-12 mr-2 rounded-full" src={post.author.profilePic?.url || "/img/Blue.png"} />
            <p className="text-lg text-gray-900">{post.author.name}</p>
          </div>
          {/* Tags */}
          <div className="mt-6 pb-6 border-b border-gray-300">
            <p className="text-gray-500">TAGS</p>
            <div className="flex flex-wrap gap-2 text-indigo-400">
              {post.tags.map((t, i) => <p key={i} className="uppercase">{t.name}</p>)}
            </div>
          </div>
          {/* Previous */}
          {last.length > 0 && <div className="mt-6 pb-6 border-b border-gray-300">
            <p className="text-gray-500">PREVIOUS ARTICLE</p>
            <Link href={"/blog/" + last.slug}>
              <p className="text-indigo-400">{last.title}</p>
            </Link>
          </div>}
          {/* BackToBlogLink */}
          <div className="mt-6">
            <Link href="/blog">
              <p className="text-indigo-400 hover:text-indigo-600 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to the blog
              </p>
            </Link>
          </div>
        </div>
        <div className="col-span-4 w-full prose-sm lg:prose-lg max-w-full">
          <RichText content={post.content.json} />
        </div>
      </div>
    </WithNavbarLayout>
  )
}

export default BlogPost
