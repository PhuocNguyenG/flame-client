import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nông sản Flame",
    short_name: "Nông sản Flame",
    description: "Nông sản Flame - Nông sản từ người Việt",
    start_url: "/",
    display: "standalone",
    background_color: "#053729",
    theme_color: "#053729",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
