/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent-*.xx.fbcdn.net',
      },
    ],
  },
};

module.exports = nextConfig;
