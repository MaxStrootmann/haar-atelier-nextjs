/** @type {import('next').NextConfig} */
import { withPayload } from '@payloadcms/next/withPayload'
import { withPlausibleProxy } from 'next-plausible'

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  redirects() {
    return [
      {
        source: '/winkel',
        destination: '/shop',
        permanent: true,
      },
    ]
  },
}

export default withPayload(withPlausibleProxy()(nextConfig))
