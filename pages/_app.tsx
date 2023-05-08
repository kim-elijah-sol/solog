import ThemeProvider from '@components/ThemeProvider'
import type { AppContext, AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import GlobalStyle from '@components/GlobalStyle'
import Seo from '@components/Seo'
import Header from '@components/layout/Header'
import ParentContainer from '@components/layout/ParentContaier'
import NotificationCenter from '@components/NotificationCenter'
import { ThemeType } from '@atoms/global/theme'

interface Props {
  theme: ThemeType
}

function MyApp({ Component, pageProps }: AppProps<Props>) {
  const { theme } = pageProps

  return (
    <RecoilRoot>
      <ThemeProvider defaultTheme={theme}>
        <Seo />
        <GlobalStyle />
        <Header />
        <ParentContainer>
          <Component {...pageProps} />
        </ParentContainer>
        <NotificationCenter />
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
