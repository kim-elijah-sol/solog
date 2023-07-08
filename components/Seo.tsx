import Head from 'next/head'

function Seo({ children }: { children?: React.ReactNode }) {
  return (
    <Head>
      <title>Solog</title>
      <meta
        name='viewport'
        content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover'
      />
      <meta property='og:title' content='Solog' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='solog.io' />
      {children}
    </Head>
  )
}

export default Seo
