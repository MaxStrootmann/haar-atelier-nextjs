/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/winkel",
        destination: "/shop",
        permanent: true, // Set to true for a 301 redirect, false for a 302 redirect
      },
    ];
  },
};

module.exports = nextConfig;
