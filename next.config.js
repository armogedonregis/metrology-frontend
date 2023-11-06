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
        has: [
          {
            type: "host",
            value: "metrologiya.org",
          },
        ],
        source: "/",
        destination: "/site/:site",
      },
      {
        has: [
          {
            type: "host",
            value: "spb.metrologiya.org",
          },
        ],
        source: "/spb",
        destination: "/spb/:spb",
      },
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
