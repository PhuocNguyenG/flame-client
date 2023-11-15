const baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL
  ? `${process.env.NEXT_PUBLIC_CLIENT_URL}`
  : "http://localhost:3000";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
