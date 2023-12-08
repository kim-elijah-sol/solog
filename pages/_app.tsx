import ThemeProvider from '@components/ThemeProvider'
import type { AppContext, AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import GlobalStyle from '@components/GlobalStyle'
import Seo from '@components/Seo'
import Header from '@components/layout/Header'
import ParentContainer from '@components/layout/ParentContaier'
import NotificationCenter from '@components/NotificationCenter'
import { ThemeType } from '@atoms/global/theme'
import useFirebaseInit from '@hooks/global/useFirebaseInit'
import { CodeFontFamilyType } from '@atoms/global/codeFontFamily'
import CodeFontFamilyProvider from '@components/CodeFontFamilyProvider'

interface Props {
  theme: ThemeType
  codeFontFamily: CodeFontFamilyType
}

function MyApp({ Component, pageProps }: AppProps<Props>) {
  const { theme, codeFontFamily } = pageProps

  useFirebaseInit()

  return (
    <RecoilRoot>
      <ThemeProvider defaultTheme={theme}>
        <CodeFontFamilyProvider defaultCodeFontFamily={codeFontFamily}>
          <GlobalStyle />
          <Header />
          <ParentContainer>
            <Component {...pageProps} />
          </ParentContainer>
          <NotificationCenter />
        </CodeFontFamilyProvider>
      </ThemeProvider>
    </RecoilRoot>
  )
}

export default MyApp

MyApp.getInitialProps = async (appContext: AppContext) => {
  const request = appContext.ctx.req as any

  const pageProps: { [key: string]: any } = {}

  const theme = request?.cookies?.theme

  const codeFontFamily = request?.cookies?.codeFontFamily

  pageProps.theme = theme === 'dark' ? 'dark' : 'light'

  pageProps.codeFontFamily =
    codeFontFamily === 'Fira Code' ? 'Fira Code' : 'IBM Plex Mono'

  return { pageProps }
}
