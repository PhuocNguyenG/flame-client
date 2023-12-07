/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.flameagricultural.com",
      },
    ],
    minimumCacheTTL: 60,
    deviceSizes: [450, 670, 800, 1024, 1280, 1400, 1600, 1920],
  },
  // reactStrictMode: false,
};
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
// module.exports = withBundleAnalyzer({
//   nextConfig
// })
module.exports = nextConfig;
