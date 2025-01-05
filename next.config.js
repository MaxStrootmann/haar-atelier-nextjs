/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require("next-plausible");

module.exports = withPlausibleProxy()({
  // ...your next js config, if any
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
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
});
