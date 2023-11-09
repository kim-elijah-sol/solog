import { Feed } from 'feed'
import contents from './contents'

const baseUrl = 'https://solog.dev'

const master = {
  name: 'kim sol',
  email: 'kimelijahsol@gmail.com',
  link: baseUrl,
}

const feed = new Feed({
  title: 'Solog',
  description: 'Front-end Developer [kim sol] Blog',
  id: baseUrl,
  link: baseUrl,
  language: 'ko',
  favicon: `${baseUrl}/favicon/favicon.ico`,
  copyright: `All rights reserved since 2023, ${master.name}`,
  generator: 'generate-rss',
  feedLinks: {
    json: `${baseUrl}/json`,
    atom: `${baseUrl}/atom`,
  },
  author: master,
})

contents.forEach((post) => {
  feed.addItem({
    title: post.title,
    id: `${baseUrl}${post.url}`,
    link: `${baseUrl}${post.url}`,
    description: post.description,
    content: post.content,
    author: [master],
    contributor: [master],
    date: new Date(post.createdAt),
    image: `${baseUrl}${post.coverUrl}`,
    category: post.categorys.map((tag) => ({ name: tag })),
  })
})

feed.addCategory('Technologies')

export default feed
