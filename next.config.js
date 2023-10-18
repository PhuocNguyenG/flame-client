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
        source: "/:lang/gioi-thieu",
        destination: "/:lang/introduce",
      },
      {
        source: "/:lang/san-pham",
        destination: "/:lang/product",
      },
      {
        source: "/:lang/san-pham/:category*",
        destination: "/:lang/product/:category*",
      },
      {
        source: "/:lang/qua-tang-qua-bieu/:category*",
        destination: "/:lang/gift/:category*",
      },{
        source: "/:lang/xuat-khau",
        destination: "/:lang/export",
      },
      {
        source: "/:lang/xuat-khau/:category*",
        destination: "/:lang/export/:category*",
      },
      {
        source: "/:lang/lien-he",
        destination: "/:lang/contact",
      },
      {
        source: "/:lang/gio-hang",
        destination: "/:lang/cart",
      },
    ];
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
