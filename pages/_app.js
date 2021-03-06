import { ThemeProvider } from 'next-themes'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class" >
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp
