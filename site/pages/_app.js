import 'tailwindcss/tailwind.css'
import { CartProvider } from '../lib/cartContext'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
