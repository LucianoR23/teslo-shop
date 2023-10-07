import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { CssBaseline, ThemeProvider } from '@mui/material'
import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { AuthProvider, CartProvider, UIProvider } from '@/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  )
}
