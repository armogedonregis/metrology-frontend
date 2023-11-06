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
        destination: "https://spb.metrologiya.org/:path*",
        has: [{ type: "host", value: "spb.metrologiya.org" }],
      },
      {
        // fallback
        source: '/site/:path*',
        destination: 'https://metrologiya.org/:path*',
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
