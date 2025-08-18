/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose'
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  eslint: {
    // Only run ESLint on these directories during build
    dirs: ['app', 'components', 'lib'],
    // Allow production builds to successfully complete even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to successfully complete even if there are type errors
    ignoreBuildErrors: true,
  },
  // Webpack configuration for external packages
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('mongoose', 'bcryptjs', 'jsonwebtoken', '@google/generative-ai');
    }
    return config;
  },
}

module.exports = nextConfig
