import Navbar from '../organisms/navbar'
import Footer from '../organisms/footer'

const InformationPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-200">
        <Navbar />
        <div className="flex-grow">
          <section id="introduction">
            <div className="max-w-5xl mx-auto flex items-center min-h-3/4-screen px-2 py-4 sm:px-6 lg:px-8">
              {/* About Text here */}
              <div className="mt-8 text-center">
                <h3 className="mb-2 text-indigo-600 font-semibold tracking-widest uppercase">
                  You have concerns
                </h3>
                <h1 className="hidden sm:block mb-6 text-4xl lg:text-6xl font-extrabold text-gray-800">
                  What is this? I have questions!
                </h1>
                <h1 className="block sm:hidden mb-6 text-4xl font-extrabold text-gray-800">
                  Why am I here?
                </h1>
                <p className="text-xl text-gray-600 text-justify mx-6 md:mx-4 my-2">
                  So you have <span className="font-bold">concerns</span> about
                  what we collect or you are just interested. We live in scary
                  times sometimes and we all know that we should never trust a
                  stranger. Especially websites are creepy, you can not even see
                  who youre talking with. Whatever youre concerns are, on this
                  page you learn all about:
                </p>
                <div className="flex flex-wrap justify-evenly items-center mx-2 my-12">
                  <ul className="text-left text-xl sm:text-2xl tracking-wide font-semibold text-gray-600">
                    <li>
                      <span className="text-indigo-600 font-black">?</span> what
                      exactly we collect
                    </li>
                    <li>
                      <span className="text-indigo-600 font-black">?</span> what
                      we store on your device
                    </li>
                    <li>
                      <span className="text-indigo-600 font-black">?</span> why
                      we do what we do
                    </li>
                  </ul>
                  <img
                    className="h-32 md:h-48 mt-6 sm:mt-0"
                    src="/img/PoliceFox.png"
                    alt="Police Fox"
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="max-w-7xl mx-auto border-t border-gray-400 border-opacity-40 my-4" />
          <section id="cookies">
            <div className="max-w-5xl mx-auto px-6 py-4 lg:px-8">
              <div className="border-l-2 border-indigo-600 pl-4">
                <h3 className="mb-2 text-indigo-600 font-semibold tracking-widest uppercase">
                  Are you hungry?
                </h3>
                <h1 className="block mb-2 text-4xl lg:text-5xl font-extrabold text-gray-800">
                  For cookies{' '}
                  <span role="img" aria-label="cookie emoji">
                    🍪
                  </span>
                </h1>
              </div>
            </div>
            <div className="max-w-5xl mx-auto px-2 py-4 sm:px-6 lg:px-8">
              <div className="text-xl text-gray-600 text-justify mx-6 md:mx-4 my-2">
                We use cookies for{' '}
                <span className="font-bold">authentication</span> and nothing
                else! Why cookies? In computer science we have the following
                goals for information exchange:{' '}
                <span className="font-bold text-indigo-600">authenticity</span>,{' '}
                <span className="font-bold text-indigo-600">
                  confidentiality
                </span>{' '}
                and <span className="font-bold text-indigo-600">integrity</span>
                .
              </div>

              <h3 className="uppercase font-bold text-xl ml-2 sm:ml-0 mt-6">
                <span className="font-bold text-indigo-600">#</span> integrity
              </h3>
              <div className="text-xl text-gray-600 text-justify mx-6 md:mx-4 my-2">
                ... is used to make sure that nobody in between site A and B
                (for example) changed some parts of the shared information.
                Therefore a <span className="font-bold">hash</span> is
                calculated and added to a packet (message). This can be achieved
                by using hashing algorithms like MD5, SHA(1,2) and so on. To
                really make sure that no one is even able to modify the hash{' '}
                <span className="font-bold">HMAC</span>s are used. This stands
                for <span className="font-bold">h</span>ashed{' '}
                <span className="font-bold">m</span>essage{' '}
                <span className="font-bold">a</span>uthentication{' '}
                <span className="font-bold">c</span>ode. The main difference
                between a hash and a hmac is that in addition to the value that
                should be hashed (checksum calculated) a secret passphrase that
                is common to both sites is added to the calculation process.
                E.g. [Value that should be hashed] + [secret passhrase] -&gt;
                Hashed value of this &quot;two&quot; inputs.
              </div>

              <h3 className="uppercase font-bold text-xl ml-2 sm:ml-0 mt-6">
                <span className="font-bold text-indigo-600">#</span>{' '}
                confidentiality
              </h3>
              <div className="text-xl text-gray-600 text-justify mx-6 md:mx-4 my-2">
                ... is used to make sure that nobody in between site A and B is
                able to read what data or information is sent between the to
                sites. To achieve this{' '}
                <span className="font-bold">encryption</span> algorithms are
                used. There are two kinds of encryption algorithms, symmetric
                and also asymmetric ones. Symmetric algorithms allow encryption
                and decryption with the same key. With asymmetric algorithms you
                have to kinds of keys: a public one and also a private one. The
                public key is often available to the public while the private
                key is just available for &quot;yourself&quot; (if the mentioned
                keypair is yours). Everything that you encrypt with the public
                key can only be decrypted with the private one and vice versa.
                When it comes to confidentiality you often just use symmetric
                algorithms like DES, 3DES (both outdated) or AES. Asymmetric
                encryption is used to transfer a symmetric key and also to make
                sure that the other site is really who it seems to be (when it
                comes to SSL/TLS).
              </div>
              <div className="max-w-lg mx-auto my-8 border border-gray-300 bg-gray-50 flex items-center font-mono text-gray-700 rounded-md shadow-xl overflow-hidden text-md sm:text-xl">
                <span className="rounded-l px-4 py-2 border-r border-gray-300 whitespace-no-wrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-green-500 font-extrabold">https</span>
                  ://
                </span>
                <p className="mx-auto py-2 inline-block align-middle">
                  foxesinboxes.org
                </p>
              </div>
              <div className="text-xl text-gray-600 text-justify mx-6 md:mx-4 my-2">
                FoxesInBoxes uses <span className="font-bold">https</span> by
                default. Dont believe me? Well try to type in our URL without
                the <span className="font-bold">s</span>. You will see that you
                will automatically get redirected to https. So you can not even
                visit this page unsecurely. You should never visit a page
                without encryption!
              </div>

              <h3 className="uppercase font-bold text-xl ml-2 sm:ml-0 mt-6">
                <span className="font-bold text-indigo-600">#</span> authenticity
              </h3>
              <div className="text-xl text-gray-600 text-justify mx-6 md:mx-4 my-2">
                ... is used to make sure that you really communicate with the
                partner you want to. To achieve these different kinds of
                techniques can be used, e.g. Pre-shared keys that are configured
                on both sites, Elliptic Curves or RSA as public/private key
                algorithms.
              </div>

              <div className="mt-8" />

              <h3 className="uppercase font-bold text-xl ml-2 sm:ml-0 mt-6">
                <span className="font-bold text-indigo-600">?</span> So what
                does all of this have to do with cookies?
              </h3>
              <div className="text-xl text-gray-600 text-justify mx-6 md:mx-4 my-2">
                Well we need to make sure that you are who you claim to be. The
                cookie is like a small passport. It encodes a token that is
                uniquely linked with your account and makes sure that you do not
                have to login for each page reload. It is standard procedure as
                we do not want to include any passwords in requests! Also there
                is some concerns about the securtity of JWTs. Cookies can not be
                accessed via javascript, unlike anything in the localstorage. So
                they are safer as long as your browser is not under attack. If
                you are more interested read{' '}
                <a
                  href="https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html"
                  className="font-bold underline hover:text-indigo-400 cursor-pointer"
                >
                  more here
                </a>
                .
              </div>
            </div>
          </section>
          <div className="max-w-7xl mx-auto border-t border-gray-400 border-opacity-40 my-4" />
          <section id="userdata">
            <div className="max-w-5xl mx-auto px-6 py-4 lg:px-8">
              <div className="border-l-2 border-indigo-600 pl-4">
                <h3 className="mb-2 text-indigo-600 font-semibold tracking-widest uppercase">
                  We have a file on you
                </h3>
                <h1 className="block mb-2 text-4xl lg:text-5xl font-extrabold text-gray-800">
                  What is stored about me?{' '}
                  <span role="img" aria-label="folder emoji">
                    📂
                  </span>
                </h1>
              </div>
            </div>
            <div className="max-w-5xl mx-auto px-2 py-4 sm:px-6 lg:px-8 md:mb-8">
              <p className="text-xl text-gray-600 text-justify mx-6 md:mx-4 my-2">
                First things first: We aren’t using passwords, since we are
                relying on third-party-services like Discord and Auth0 to
                authenticate you. The authentication process is handled by these
                services, we are just receiving your username for easy
                identification and your email address to contact you in case you
                have won something. We will never sell this data to third
                parties, nor do we analyze it. If you want to revoke our access
                on your data on Discord, go to User{' '}
                <span className="font-bold">Settings</span> -&gt;
                <span className="font-bold">Authorized Apps</span> -&gt;{' '}
                <span className="font-bold">FoxInTheBox</span> -&gt;{' '}
                <span className="font-bold">Deauthorize</span>
                {'. '}
                Additionally, we do not save any data that you are not actively
                entering, for example any tracking metrics such as IP addresses,
                locations or devices. Our user model just stores your name, and
                what you solve on this site. The model is public and you can see
                for yourself.
              </p>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default InformationPage
