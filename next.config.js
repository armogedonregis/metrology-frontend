/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'metrologiya.org',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/site",
        destination: "https://metrologiya.org",
      },
      {
        // fallback
        source: '/spb',
        destination: 'https://spb.metrologiya.org',
      }
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },

      use: ['@svgr/webpack'],
    });

    return config;
  },
}

module.exports = nextConfig
