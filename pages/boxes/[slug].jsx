import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
  }
});

import crypto from 'crypto-js'

import Head from 'next/head'
import { useState, useEffect } from 'react';

import WithNavbarLayout from '../../templates/withNavbar';
import Header from '../../organisms/header';
import { RichText } from "@graphcms/rich-text-react-renderer";

export async function getStaticProps({ params }) {
  let { box } = await graphcms.request(
    `
    query Box($slug: String!) {
      box(where: {boxslug: $slug}) {
        boxname
        description {
          json
        }
        createdAt
        boxslug
        boxWriteUp {
          json
        }
        boxflag
        author {
          name
          isTeam
          socialLink
          profilePic {
            url
          }
        }

        challengeFiles {
          url
        }
        boxLogo {
          url
        }
      }
    }
    `,
    {
      "slug": params.slug
    }
  );

  const hash = crypto.SHA256(box.boxflag).toString();
  const writeUpEnc = crypto.AES.encrypt(JSON.stringify(box.boxWriteUp.json), box.boxflag).toString();

  box.boxflag = hash;
  box.boxWriteUp.json = writeUpEnc;

  return {
    props: {
      box: box
    }
  }
}

export async function getStaticPaths() {
  const { boxes } = await graphcms.request(
    `
    {
      boxes {
        boxslug
      }
    }
    `
  );

  return {
    paths: boxes.map(({ boxslug }) => ({
      params: {
        slug: boxslug
      },
    })),
    fallback: false,
  }
}

const BoxPage = ({ box }) => {
  const [text, setText] = useState(box.boxWriteUp.json)
  const [key, setKey] = useState("")
  const [solved, setSolved] = useState(false)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    let tempKey = localStorage.getItem(box.boxslug);

    if (crypto.SHA256(tempKey).toString() !== box.boxflag) return;
    let writeupbytes = crypto.AES.decrypt(box.boxWriteUp.json, tempKey);
    writeupbytes = writeupbytes.toString(crypto.enc.Utf8);

    setText(writeupbytes);
    setKey(tempKey);
    setTouched(true);
    setSolved(true);
  }, [])

  const decrypt = () => {
    let tempKey = crypto.SHA256(key).toString();

    setTouched(true);

    if (tempKey !== box.boxflag) return console.log("KEY IS INCORRECT");
    setSolved(true);

    let writeupbytes = crypto.AES.decrypt(box.boxWriteUp.json, key);
    setText(writeupbytes.toString(crypto.enc.Utf8))

    localStorage.setItem(box.boxslug, key);
  }

  return (
    <WithNavbarLayout>
      <div>
        <Head>
          <title>{box.boxname}</title>
          {box.boxLogo?.url ?? <link rel="shortcut icon" href={box.boxLogo?.url} />}
        </Head>

        <Header title={box.boxname} />

        <div className="lg:hidden">
          <div className="max-w-7xl flex-1 min-h-[40vh] bg-white border border-gray-200 overflow-hidden px-8 py-4">
            <div className="flex justify-between pb-4 mb-4 border-b border-gray-200">
              <img
                className="h-16 w-16 md:h-32 md:w-32"
                src={box.boxLogo?.url || "/img/FoxInTheBox.png"}
              />
              <div>
                <h2 className="text-sm md:text-lg tracking-wide font-light">This box has been created by:</h2>
                <div className="flex">
                  <img
                    className="mr-2 h-8 w-8 rounded-full object-cover"
                    src={box.author.profilePic?.url || "/img/Green.png"}
                  />
                  <h1 className="font-medium tracking-wide text-lg md:text-2xl">{box.author.name}</h1>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide"><span className="text-indigo-600 mr-1">#</span>Description</h1>
              <p className="mt-2 mx-auto border border-gray-200 py-2 px-4 font-mono bg-gray-100 text-justify break-words prose-sm">
                <RichText content={box.description.json} />
              </p>
            </div>
            <div className="mt-8">
              <h1 className="text-xl mb-2 font-bold tracking-wide"><span className="text-indigo-600 mr-1">#</span>Files</h1>
              <a href={box.challengeFiles?.url} className="py-2 px-4 font-mono border border-gray-200 focus:border-indigo-500 focus:outline-none hover:bg-indigo-500 hover:text-white cursor-pointer">Download</a>
            </div>
            <div className="mt-8">
              <h1 className="text-xl mb-2 font-bold tracking-wide"><span className="text-indigo-600 mr-1">#</span>Flag Submission</h1>
              <form className="w-full relative" onSubmit={(e) => { e.preventDefault(); decrypt() }}>
                <input onChange={(e) => setKey(e.target.value)} value={key} disabled={solved} className={(solved ? "border-green-500 bg-green-100 text-green-500 font-semibold" : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 bg-gray-100") + (touched && !solved ? " bg-red-100 border-red-600" : "") + " border focus:outline-none w-full pr-12 px-3 py-1"} placeholder="FIB{xxxxxxxxxxxxxx}" />
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center bg-indigo-500 text-white px-3 py-1 uppercase">Check</button>
              </form>
            </div>
            <div className="mt-8">
              <h1 className="text-xl mb-2 font-bold tracking-wide"><span className="text-indigo-600 mr-1">#</span>Writeup</h1>
              <p className={"w-full mt-2 border border-gray-200 py-2 px-4 font-mono bg-gray-100 text-justify break-all blur-sm " + (solved && "hidden")}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              </p>

              {solved && <div className="w-full mx-auto prose xl:prose-lg px-3 py-1 border border-gray-200 bg-gray-100">
                <RichText content={JSON.parse(text)} />
              </div>}
              <p className="w-full mx-auto text-sm font-light text-gray-700 mt-4 break-all">Publishing the writeup on other platforms is not allowed, as this would ruin the challenge for others. If you wish to improve this please contact us!</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex justify-center gap-6 my-8 px-8">
          <img
            className="h-48 w-48 xl:h-64 xl:w-64 justify-self-end flex-shrink"
            src={box.boxLogo?.url || "/img/FoxInTheBox.png"}
          />

          <div className="max-w-3xl flex-1 min-h-[40vh] rounded-lg shadow-sm bg-white border border-gray-200 overflow-hidden px-8 py-4">
            <div>
              <h1 className="text-xl font-bold tracking-wide"><span className="text-indigo-600 mr-1">#</span>Description</h1>
              <p className="mt-2 mx-auto border border-gray-200 py-2 px-4 font-mono bg-gray-100 text-justify break-words prose-sm md:prose xl:prose-lg">
                <RichText content={box.description.json} />
              </p>
            </div>
            <div className="mt-8">
              <h1 className="text-xl mb-2 font-bold tracking-wide"><span className="text-indigo-600 mr-1">#</span>Files</h1>
              <a href={box.challengeFiles?.url} className="py-2 px-4 font-mono border border-gray-200 focus:border-indigo-500 focus:outline-none hover:bg-indigo-500 hover:text-white cursor-pointer">Download</a>
            </div>
            <div className="mt-8">
              <h1 className="text-xl mb-2 font-bold tracking-wide"><span className="text-indigo-600 mr-1">#</span>Flag Submission</h1>
              <form className="w-full relative" onSubmit={(e) => { e.preventDefault(); decrypt() }}>
                <input onChange={(e) => setKey(e.target.value)} value={key} disabled={solved} className={(solved ? "border-green-500 bg-green-100 text-green-500 font-semibold" : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 bg-gray-100") + (touched && !solved ? " bg-red-100 border-red-600" : "") + " border focus:outline-none w-full pr-12 px-3 py-1"} placeholder="FIB{xxxxxxxxxxxxxx}" />
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center bg-indigo-500 text-white px-3 py-1 uppercase">Check</button>
              </form>
            </div>
            <div className="mt-8">
              <h1 className="text-xl mb-2 font-bold tracking-wide"><span className="text-indigo-600 mr-1">#</span>Writeup</h1>
              <p className={"w-full mt-2 border border-gray-200 py-2 px-4 font-mono bg-gray-100 text-justify break-all blur-sm " + (solved && "hidden")}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              </p>

              {solved && <div className="w-full mx-auto prose-sm md:prose xl:prose-lg px-3 py-1 border border-gray-200 bg-gray-100">
                <RichText content={JSON.parse(text)} />
              </div>}
              <p className="w-full mx-auto text-sm font-light text-gray-700 mt-4 break-all">Publishing the writeup on other platforms is not allowed, as this would ruin the challenge for others. If you wish to improve this please contact us!</p>
            </div>
          </div>

          <div className="justify-self-start flex-shrink text-left">
            <a href={box.author.socialLink} target="_blank">
              <div className="cursor-pointer rounded-lg overflow-hidden bg-gray-50 hover:shadow-lg h-auto py-2 px-4">
                <h1 className="text-base xl:text-lg tracking-wide font-light">This box has been created by: <br /><span className="font-medium text-xl xl:text-2xl">{box.author.name}</span></h1>
                <div className="relative">
                  <img
                    className="mx-auto my-4 h-28 w-28 rounded-full object-cover relative"
                    src={box.author.profilePic?.url || "/img/Green.png"}
                  />
                  {box.author.isTeam && <p className="absolute -top-2 right-10 rounded-lg bg-blue-400 px-3 py-1 text-white font-medium">Team</p>}
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </WithNavbarLayout>
  )
}

export default BoxPage