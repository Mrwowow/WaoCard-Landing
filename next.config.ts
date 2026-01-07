/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['waocard.co','via.placeholder.com', 'maps.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'waocard.co',
        port: '',
        pathname: '/app/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig