/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: {
          subsets: ['vietnamese', 'latin'],
          weight: ['500', '700'],
          style: ['normal'],
          fallback: ['system-ui'],
        },
      },
    ],
  },
}

module.exports = nextConfig
