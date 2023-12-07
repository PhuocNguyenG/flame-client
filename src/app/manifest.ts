import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nông sản Flame",
    short_name: "Nông sản Flame",
    description: "Nông sản Flame - Cung cấp sản phẩm về nông sản",
    start_url: "/",
    display: "standalone",
    background_color: "#053729",
    theme_color: "#053729",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
  };
}
