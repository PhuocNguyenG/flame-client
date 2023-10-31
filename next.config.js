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
    deviceSizes: [450, 800, 1150, 1400, 1920],
  },
};

module.exports = nextConfig;
