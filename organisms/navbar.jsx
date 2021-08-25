import Link from 'next/link'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from 'next-themes'

const Navbar = () => {
  // Component states
  const profileDropdownRef = useRef(null)
  const [mobileMenuState, setmobileMenuState] = useState(false)
  const [profileMenuState, setprofileMenuState] = useState(false)
  const { resolvedTheme, setTheme} = useTheme()
  // Functions
  const toggleProfile = () => setprofileMenuState(false) // !profileMenuState
  const getAvatarImage = (user) => {
    switch (user?.avatar) {
      case "GREEN":
        return "/img/green.jpg";
      case "BLUE":
        return "/img/blue.jpg";
      case "PINK":
        return "/img/pink.jpg";
      default:
        return "https://via.placeholder.com/48";
    }
  }
  // Effects
  useEffect(() => {
    const pageClick = () => {
      setprofileMenuState(false)
    }
    if (profileMenuState) {
      window.addEventListener('click', pageClick)
    }
    return () => {
      window.removeEventListener('click', pageClick)
    }
  }, [profileMenuState])
  // Component UI
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setmobileMenuState(!mobileMenuState)}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Logo here */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link href="/">
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                <Image
                  className="block lg:mr-2 h-8 w-8"
                  width="32px"
                  height="32px"
                  src='/img/FoxInTheBox.png'
                  aria-label="FoxesInBoxes Logo"
                />
                <div className="hidden lg:block h-8 w-auto">
                  <h1 className="font-title text-xl pt-1 font-extrabold text-gray-200">
                    FoxesInBoxes
                  </h1>
                </div>
              </div>
            </Link>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Navitem href="/boxes" >Boxes</Navitem>
                <Navitem href="/blog" >Blog</Navitem>
                <Navitem href="/about" >About</Navitem>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="bg-gray-800 p1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Switching color mode</span>

              {resolvedTheme === "light" && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>}
              {resolvedTheme === "dark" && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>}
            </button>

            {/* Profile Dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={toggleProfile}
                >
                  <span className="sr-only">Open user menu</span>
                  {/* TODO: add user logo img stuff here */}
                  <Image
                    alt="Profile"
                    width="32px"
                    height="32px"
                    className="h-8 w-8 rounded-full object-cover"
                    src={getAvatarImage({ avatar: "BLUE" })}
                  />
                </button>
              </div>

              <div
                className={`${profileMenuState ? '' : 'hidden'
                  } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                ref={profileDropdownRef}
                aria-orientation="horizontal"
                aria-labelledby="user-menu"
              >
                <Link
                  href="/profile"
                >
                  <div role="menuitem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 align-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-2 inline">Your Profile</p>
                  </div>
                </Link>
                <Link
                  href="/profile/settings"
                >
                  <div role="menuitem" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 align-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-2 inline">Settings</p></div>
                </Link>
                {/* TODO: AUTH sign out button */}
                <div className="my-2 border-t border-1 border-gray-300"></div>
                <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-2 inline">Sign out</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${mobileMenuState ? '' : 'hidden'} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Navitem href="/boxes" cssprops="block">Boxes</Navitem>
          <Navitem href="/blog" cssprops="block">Blog</Navitem>
          <Navitem href="/about" cssprops="block">About</Navitem>
        </div>
      </div>
    </nav>
  )
}

const Navitem = ({href, children, cssprops}) => {
  const { asPath } = useRouter();

  return (
    <Link href={href}>
      <a className={(asPath === href ? "bg-gray-900 dark:bg-gray-800 text-indigo-400" : "text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white") + " px-3 py-2 rounded-md text-sm font-medium " + cssprops}>
        {children}
      </a>
    </Link>
  );
}

export default Navbar
