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
        source: "/spb/:path*",
        destination: "/:path*",
      },
      {
        // fallback
        source: '/site/:path*',
        destination: '/:path*',
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
