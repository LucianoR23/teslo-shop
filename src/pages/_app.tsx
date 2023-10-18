import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { CssBaseline, ThemeProvider } from '@mui/material'
import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { AuthProvider, CartProvider, UIProvider } from '@/context'
import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENTID || '' }}>
        <SWRConfig 
          value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }} >
          <AuthProvider>
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={ lightTheme }>
                  <CssBaseline enableColorScheme />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}
