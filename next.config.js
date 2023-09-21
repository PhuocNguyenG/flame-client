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
        hostname: "**.techcombank.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/vi/xuat-khau/:category*",
        destination: "/vi/export/:category*",
      },
      {
        source: "/vi/qua-tang-qua-bieu/:category*",
        destination: "/vi/gift/:category*",
      },
      {
        source: "/vi/gio-hang",
        destination: "/vi/cart",
      },
    ];
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
