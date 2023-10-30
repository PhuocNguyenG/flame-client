/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.flameagricultural.com",
      },
    ],
    minimumCacheTTL: 60,
    deviceSizes: [500, 640, 750, 828, 1080, 1200, 1920],
  },
};

module.exports = nextConfig;
