import Navbar from '../organisms/navbar.jsx'
import Footer from '../organisms/footer.jsx'
import Cookie from '../organisms/cookie.jsx'
import Banner from '../organisms/infobanner.jsx'

const WithNavbarLayout = ({ children }) => {

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-gray-900">
      <Navbar />
      <Banner />
      <div className="flex-grow flex flex-col">{children}</div>
      <Cookie />
      <Footer />
    </div>
  )
}

export default WithNavbarLayout
