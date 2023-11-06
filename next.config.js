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
        source: "/:path*",
        destination: "/site/:path*",
      },
      {
        has: [
          {
            type: 'host',
            value: '(?<series>.+)\\.localhost',
          }
        ],
        source: '/:spb/spb/:path*',
        destination: '/:spb/spb/:path*',
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
