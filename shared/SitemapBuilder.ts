type Changefreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export type SitemapUrl = {
  loc: string
  priority: number
  lastmod?: string
  changefreq?: Changefreq
  image?: string
}

class SitemapBuilder {
  sitemaps: SitemapUrl[] = []

  head =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'

  tail = '</urlset>'

  setSitemaps(sitemaps: SitemapUrl[]) {
    this.sitemaps = sitemaps
  }

  create() {
    const sitemapsString = this.sitemaps
      .map(({ image, ...rest }) => {
        const entries = Object.entries(rest)

        const contents = entries.map(
          ([key, value]) => `<${key}>${value}</${key}>`
        )

        if (image) {
          contents.push(
            `<image:image>
              <image:loc>${image}</image:loc>
            </image:image>`
          )
        }

        return `<url>
                  ${contents.join('\n')}
                </url>`
      })
      .join('\n')

    return `${this.head}${sitemapsString}\n${this.tail}`
  }
}

export default SitemapBuilder
