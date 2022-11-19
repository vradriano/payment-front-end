import type { AppProps } from 'next/app'
import { ToastyProvider } from '../src/contexts/Toasty'
import { AuthProvider } from '../src/contexts/AuthContext'
import '../src/styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ToastyProvider>
        <Component {...pageProps} />
      </ToastyProvider>
    </AuthProvider>
  )
}
