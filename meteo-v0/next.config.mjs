/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // Disable features that might be causing ServiceWorker issues
  experimental: {
    appDir: true,
    serverActions: true,
  },
}

export default nextConfig
