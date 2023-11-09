import contents from '@shared/contents'
import SitemapBuilder from '@shared/SitemapBuilder'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { res } = ctx

  const sb = new SitemapBuilder()

  sb.setSitemaps(
    contents.map(({ url, createdAt, coverUrl }) => ({
      loc: `https://solog.dev${url}`,
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: createdAt,
      image: `https://solog.dev${coverUrl}`,
    }))
  )

  const content = sb.create()

  res.setHeader('Content-Type', 'text/xml')

  res.write(content)

  res.end()

  return {
    props: {},
  }
}

export default () => {
  return undefined
}
