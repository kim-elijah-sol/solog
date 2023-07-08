import feed from '@shared/feed'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { res } = ctx

  res.setHeader('Content-Type', 'application/rss+xml;charset=UTF-8')
  res.write(feed.json1())
  res.end()
}

export default () => {
  return undefined
}
