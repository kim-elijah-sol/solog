import ThemeProvider from '@components/ThemeProvider'
import type { AppContext, AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import GlobalStyle from '@components/GlobalStyle'
import Seo from '@components/Seo'

function MyApp({ Component, pageProps }: AppProps) {
  const { theme } = pageProps

  return (
    <RecoilRoot>
      <ThemeProvider defaultTheme={theme}>
        <Seo />
        <GlobalStyle />
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
