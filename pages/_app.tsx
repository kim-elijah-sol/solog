import { reset } from '@styles/reset'
import { Global } from '@emotion/react'
import ThemeProvider from '@components/ThemeProvider'
import type { AppContext, AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  const { theme } = pageProps

  return (
    <RecoilRoot>
      <ThemeProvider defaultTheme={theme}>
        <Global styles={[reset]} />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp

MyApp.getInitialProps = async (appContext: AppContext) => {
  const request = appContext.ctx.req as any

  const pageProps: { [key: string]: any } = {}

  const theme = request?.cookies?.theme

  pageProps.theme = theme === 'dark' ? 'dark' : 'light'

  return { pageProps }
}
