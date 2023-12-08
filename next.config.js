const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {},
  webpack(config) {
    const _config = Object.assign(config, {
      resolve: {
        alias: {
          '@styles': path.resolve(__dirname, 'styles'),
          '@components': path.resolve(__dirname, 'components'),
        },
        ...config.resolve,
      },
    })

    _config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return _config
  },
}

module.exports = nextConfig
