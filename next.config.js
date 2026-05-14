/** @type {import('next').NextConfig} */
const { withPayload } = require("@payloadcms/next/withPayload");
const { withPlausibleProxy } = require("next-plausible");

module.exports = withPayload(withPlausibleProxy()({
  // ...your next js config, if any
  reactStrictMode: true,
  output: "standalone",
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
}));
