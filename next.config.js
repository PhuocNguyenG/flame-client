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
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: "/vi/gioi-thieu",
        destination: "/vi/introduce",
      },
      {
        source: "/vi/san-pham/:category*",
        destination: "/vi/product/:category*",
      },
      {
        source: "/vi/qua-tang-qua-bieu/:category*",
        destination: "/vi/gift/:category*",
      },
      {
        source: "/vi/xuat-khau/:category*",
        destination: "/vi/export/:category*",
      },
      {
        source: "/vi/lien-he",
        destination: "/vi/contact",
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
