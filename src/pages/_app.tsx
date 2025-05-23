// pages/_app.tsx
import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="WaoCard - The leading digital wallet platform in Africa" />
        <meta name="keywords" content="wallet, digital wallet, Africa, payments, financial inclusion" />
        <meta name="theme-color" content="#FF9500" />
        <link rel="icon" href="/favicon.ico" />
        <title>WaoCard - Wao Your World</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp