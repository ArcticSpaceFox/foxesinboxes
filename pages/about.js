import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(process.env.GRAPHQL_URL_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
  }
});


import Header from '../organisms/header.jsx'
import Layout from '../templates/withNavbar.jsx'

export async function getStaticProps(context) {
  const { authors } = await graphcms.request(
    `
    {
      authors {
        name
        isTeam
        isHonorable
        socialLink
        role
        profilePic {
          url
        }
      }
    }
    `
  );

  return {
    props: {
      team: authors.filter((v) => v.isTeam == true),
      contributors: authors.filter((v) => v.isHonorable == true)
    }
  }
}

const AboutPage = ({team, contributors}) => {
  // Page UI
  return (
    <Layout>
      <Header role="About" />
      <section id="introduction">
        <div className="max-w-5xl mx-auto px-2 py-4 sm:px-6 lg:px-8">
          {/* About Text here */}
          <div className="mt-8 text-center">
            <h3 className="mb-2 text-indigo-600 font-semibold tracking-widest uppercase">
              Introduction
            </h3>
            <h1 className="hidden sm:block mb-6 text-4xl lg:text-5xl font-extrabold text-gray-800">
              Welcome to FoxinTheBox
            </h1>
            <h1 className="block sm:hidden mb-6 text-4xl font-extrabold text-gray-800">
              Welcome{' '}
              <span role="img" aria-label="wink hand">
                👋
              </span>
            </h1>
            <p className="text-xl text-gray-600 text-justify mx-6 md:mx-4">
              You have found you way on{' '}
              <span className="font-bold">FoxInTheBox</span>! On this page, you
              can prove your skills by solving easy and tricky puzzles. Our
              motivation is education and sharing skills in ethical hacking and
              engineering. We hope that you will learn something! This project
              is a public playground to have fun and to expand your knowledge.
              Don’t get too frustrated if you are not able solve a box on your
              own. You can always ask for help on our{' '}
              <a
                href="https://discord.com/invite/kzvxgCWGNK"
                alt="FitB discord server"
                className="font-bold underline hover:text-indigo-400 cursor-pointer"
              >
                Discord
              </a>
              .
            </p>
            <div className="m-6 flex justify-center">
              <iframe
                role="discord-server"
                src="https://discordapp.com/widget?id=809901673014624266&theme=dark"
                width="350"
                height="500"
                allowtransparency="true"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto border-t border-gray-400 border-opacity-40 my-4" />
      <section id="team">
        <div className="max-w-5xl mx-auto px-6 py-4 lg:px-8">
          <div className="border-l-2 border-indigo-600 pl-4">
            <h3 className="mb-2 text-indigo-600 font-semibold tracking-widest uppercase">
              Behind the Boxes
            </h3>
            <h1 className="hidden sm:block mb-2 text-4xl lg:text-5xl font-extrabold text-gray-800">
              Meet our Team
            </h1>
            <h1 className="block sm:hidden mb-2 text-4xl font-extrabold text-gray-800">
              The Team{' '}
              <span role="img" aria-label="hands presenting">
                👐
              </span>
            </h1>
          </div>
        </div>
        {/* Cards for team members */}
        <div className="max-w-7xl mx-auto lg:my-6 flex flex-wrap justify-center">
          {team.map((m, i) => (
            <TeamCard key={i} {...m} />
          ))}
        </div>
      </section>
      <section id="honor" className="mb-8">
        <div className="max-w-5xl mx-auto px-6 py-4 lg:px-8">
          <div className="border-l-2 border-indigo-600 pl-4">
            <h3 className="mb-2 text-indigo-600 font-semibold tracking-widest uppercase">
              We helped make this possible
            </h3>
            <h1 className="hidden sm:block mb-2 text-4xl lg:text-5xl font-extrabold text-gray-800">
              Honorable mentions
            </h1>
            <h1 className="block sm:hidden mb-2 text-4xl font-extrabold text-gray-800">
              We helped{' '}
              <span role="img" aria-label="hands presenting">
                🤙
              </span>
            </h1>
          </div>
        </div>
        {/* Cards for team members */}
        <div className="max-w-5xl lg:my-6 mt-4 md:mt-0 flex flex-wrap gap-6 justify-center mx-auto">
          {contributors.map((m, i) => (
            <ContribCard key={i} {...m} />
          ))}
        </div>
      </section>
    </Layout>
  )
}

const TeamCard = ({ name, role, profilePic, socialLink }) => (
  <a
    className="flex-grow-1 w-full sm:w-1/3 xl:w-1/4 bg-gray-50 rounded-lg shadow-md hover:shadow-2xl transition-shadow overflow-hidden mx-12 mb-4 md:mb-8 cursor-pointer"
    href={socialLink || '#team'}
  >
    <img
      src={profilePic?.url || "/img/Blue.png"}
      alt={`${name} , ${role}`}
      className="h-32 w-32 lg:h-64 lg:w-64 mx-auto pt-4 px-4"
    />
    <div className="border-t border-gray-400 border-opacity-40 bg-indigo-100 p-2 text-center">
      <h2 className="sm:text-lg md:text-2xl font-bold text-gray-700">{name}</h2>
      <p className="md:text-base font-black tracking-wider uppercase text-indigo-600">
        {role}
      </p>
    </div>
  </a>
)

const ContribCard = ({ name, profilePic, role, socialLink }) => (
  <a href={socialLink || '#honor'}>
    <div className="hidden md:flex flex-col p-4 bg-white rounded-3xl overflow-hidden w-full max-w-xs md:flex-row hover:shadow-lg hover:bg-indigo-100 transition-shadow">
      <img
        className="h-20 w-20 rounded-full"
        src={profilePic?.url || "/img/Blue.png"}
        alt={name}
      ></img>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col items-center md:items-start md:ml-4">
          <h2 className="text-xl font-medium">{name}</h2>
          <p className="text-base font-medium text-gray-400">{role || ''}</p>
        </div>
      </div>
    </div>
    <div className="md:hidden flex flex-col justify-center sm:bg-gray-50 sm:rounded-xl sm:shadow-lg sm:text-center sm:p-2">
      <img
        className="h-16 w-16 rounded-full mx-auto sm:-mt-6 sm:shadow-md"
        src={profilePic?.url || "/img/Blue.png"}
        alt={name}
      />
      <h1 className="hidden sm:mt-2 sm:block truncate w-20 font-medium">{name}</h1>
    </div>
  </a>
);

export default AboutPage;
