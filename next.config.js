/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 2000,
  images: {
    domains: ['xs849487.xsrv.jp'],
  },
}

module.exports = nextConfig
