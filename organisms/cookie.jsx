import { useState, useEffect, createRef } from 'react'
import Link from 'next/link'

const Foxes = ['/img/FoxCookieFen.png', '/img/fitb_cookie.png', '/img/fitb_cookie_fox.png'];

const Cookie = () => {
  // Component State
  const [isOpen, setIsOpen] = useState(false)
  const agreeBtnRef = createRef()
  // Component functions
  useEffect(() => {
    if (!localStorage.cookieConsent) {
      setIsOpen(true)
      agreeBtnRef.current.focus()
    }
  }, [agreeBtnRef, isOpen])
  const handleConsent = () => {
    localStorage.cookieConsent = true
    setIsOpen(false)
  }
  // Component UI
  return (
    <div
      className={`${isOpen ? '' : 'hidden'} fixed z-30 inset-0 overflow-y-auto`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="md:flex md:items-start md:flex-col">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-38 w-38 rounded-full sm:h-64 sm:w-64">
                {/* Foxes[Math.floor(Math.random() * Foxes.length)] */}
                <img
                  src={Foxes[Math.floor(Math.random() * Foxes.length)]} 
                  alt="Fox holding a cookie"
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                <h3
                  className="text-2xl lg:text-4xl leading-6 tracking-wide font-medium text-gray-900 dark:text-gray-200"
                  id="modal-title"
                >
                  Foxes love cookies!
                </h3>
                <div className="mt-4">
                  <p className="text-md text-justify text-gray-500 dark:text-gray-400">
                    We are using cookies to{' '}
                    <span className="font-bold">
                      authenticate you and protect ourselves from malicious
                      attacks
                    </span>
                    . If you want to know more about what cookies are and how
                    they work, our security provider Cloudflare has prepared{' '}
                    <a
                      className="font-bold underline hover:text-blue-400 dark:hover:text-blue-500"
                      href="https://www.cloudflare.com/learning/privacy/what-are-cookies/"
                    >
                      this article
                    </a>
                    , for you.
                  </p>
                  <p className="mt-2 text-md text-justify text-gray-500 dark:text-gray-400">
                    For now, you only need to know that we are not gathering any
                    personal data such as IP addresses. If you don’t consent to
                    this, you can’t participate in challenges where you have to
                    log in, but you can try the public challenges. Well… it’s up
                    to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 border-t border-gray-400 dark:border-gray-600 border-opacity-40 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:justify-center">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md cursor-pointer border shadow-sm px-4 py-2 bg-green-500 text-base text-white font-bold hover:bg-green-400 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleConsent}
              ref={agreeBtnRef}
            >
              Yes please{' '}
              <span role="img" aria-label="">
                ✌️
              </span>
            </button>
            <Link
              href="/info"
            >
              <a
                className="w-full inline-flex justify-center rounded-md cursor-pointer border border-transparent shadow-sm px-4 py-2 mt-2 sm:mt-0 border-gray-400 dark:border-gray-600 bg-gray-300 dark:bg-gray-800 text-base font-medium text-gray-800 dark:text-gray-400 hover:text-gray-200 hover:bg-red-300 dark:focus:bg-red-600 dark:focus:text-white hover:border-red-400 dark:hover:bg-red-600 dark:hover:border-red-700 focus:outline-none focus:ring-2 dark:focus:ring-2 ring-offset-2 focus:ring-red-500 dark:focus-red-600 dark:hover:text-white sm:ml-3 sm:w-auto sm:text-sm"
              >
                No cookies pls
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cookie
