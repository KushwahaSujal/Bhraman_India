/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose'
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  eslint: {
    // Only run ESLint on these directories during build
    dirs: ['app', 'components', 'lib'],
  },
  // Webpack configuration for external packages
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('mongoose', 'bcryptjs', '@google/generative-ai');
    }
    return config;
  },
}

module.exports = nextConfig
