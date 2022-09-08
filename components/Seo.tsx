import Head from 'next/head'

function Seo({ children }: { children?: React.ReactNode }) {
  return (
    <Head>
      <title>Solog</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta property='og:title' content='Solog' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='solog.io' />
      {children}
    </Head>
  )
}

export default Seo
