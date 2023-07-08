import Head from 'next/head'

function Seo({ children }: { children?: React.ReactNode }) {
  return (
    <Head>
      <title>Solog</title>
      <meta name='description' content='Front-end Developer [kim sol] Blog' />
      <meta property='og:title' content='Solog' />
      <meta
        property='og:description'
        content='Front-end Developer [kim sol] Blog'
      />

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content='Solog' />
      <meta
        name='twitter:description'
        content='Front-end Developer [kim sol] Blog'
      />
      {children}
    </Head>
  )
}

export default Seo
