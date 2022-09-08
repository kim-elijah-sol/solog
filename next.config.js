const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    return Object.assign(config, {
      resolve: {
        alias: {
          '@styles': path.resolve(__dirname, 'styles'),
          '@components': path.resolve(__dirname, 'components'),
        },
        ...config.resolve,
      },
    })
  },
}

module.exports = nextConfig
