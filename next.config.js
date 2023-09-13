/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
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
        source: "/vi/gio-hang/:path*",
        destination: "/vi/cart/:path*",
        locale: false,
      },
    ];
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
