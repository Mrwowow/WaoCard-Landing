/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['waocard.co','via.placeholder.com' ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'waocard.co',
        port: '',
        pathname: '/app/upload/**',
      },
    ],
  },
}

module.exports = nextConfig